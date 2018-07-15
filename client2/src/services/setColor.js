import gql from 'graphql-tag'

const setColor = gql`
    mutation ($color: String!) {
        setColor (color: $color) { color }
    }
`

export default setColor
