// Imports
const Koa = require('koa')
const Router = require('koa-router')
const GraphQL = require('koa-graphql')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const SerialPort = require('serialport')
const argv = require('yargs').argv
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
} = require('graphql')

const { isColorValid, htmlColorToChannels } = require('./utils')

if (!argv.port) {
  throw new Error("Missing Arduino serial port --port (hint: `ls /dev/cu.*`)")
}

// Globals
const app = new Koa()
const router = new Router()
const adapter = new FileSync('db.json')
const serialport = new SerialPort(argv.port)
const db = low(adapter);
const colorTable = db.get('colors')

function checkColor(color) {
  if (!isColorValid(color)) {
    throw new Error(`Invalid color "${color}"`)
  }
}

// GraphQL scheme
const ColorType = new GraphQLObjectType({
	name: 'Color',
	fields: {
		color: { type: GraphQLString },
	}
})

const rootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		colors: {
			type: new GraphQLList(ColorType),
			resolve () {
				return colorTable.value()
			}
		},
	}
})

const mutation = new GraphQLObjectType({
	name: 'Mutations',
	fields: {
		addColor: {
			type: new GraphQLList(ColorType),
			args: {
			  color: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve (parentValue, args) {
        checkColor(args.color)

			  const color = { color: args.color }

			  if (!colorTable.find(color).value()) {
          colorTable.push(color).write()
        }

				return colorTable.value()
			}
		},

		removeColor: {
			type: new GraphQLList(ColorType),
			args: {
				color: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve (parentValue, args) {
        checkColor(args.color)

        colorTable.remove({ color: args.color }).write()

        return colorTable.value()
			}
		},

    // unused
		editColor: {
		  type: new GraphQLList(ColorType),
      args: {
		    source: { type: new GraphQLNonNull(GraphQLString) },
		    destination: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        checkColor(args.source)
        checkColor(args.destination)

		    const destColor = { color: args.destination }
        if (!colorTable.find(destColor).value()) {
          colorTable.find({ color: args.source }).assign(destColor).write()
        }

        return colorTable.value()
      },
    },

		setColor: {
			type: ColorType,
			args: {
        color: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve (parentValue, args) {
        checkColor(args.color)

        const { r, g, b } = htmlColorToChannels(args.color)
				const message = `r${r};g${g};b${b};`

        console.log("setting", message)

				serialport.write(message, function(err) {
					if (err) {
						return console.log('Error on write: ', err.message);
					}
				})

				return args;
			}
		}
	}
})

const schema = new GraphQLSchema({
	query: rootQuery,
	mutation,
})

// Main
const graphql = GraphQL({
	schema,
	graphiql: true
})

router.all('/graphql', graphql)

app.use(async function (ctx, next) {
	ctx.set('Access-Control-Allow-Origin', '*')
	ctx.set('Access-Control-Allow-Headers', 'Content-Type')
	ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

	if (ctx.request.method === 'OPTIONS') {
		ctx.status = 200
	} else {
		return next()
	}
})

app.use(router.routes())

serialport
	.on('open', function() {
		app.listen(4000, '0.0.0.0')
		console.log('server ready')
	})
	.on('error', function(err) {
		console.error('Serialport:', err.message)
	})
