import * as React from 'react'
import { Layout, Menu, Spin } from 'antd'
import { compose } from 'recompose'
import { Switch, withRouter } from 'react-router'
import { Route } from 'react-router-dom'
import { graphql } from "react-apollo"

const { Header, Content } = Layout

import List from './scenes/List'
import Add from './scenes/Add'
import getColors from './services/getColors'
import setColor from './services/setColor'
import removeColor from './services/removeColor'
import addColor from './services/addColor'

const App = ({ loading, data, setColor, removeColor, addColor, history, location }) => {
  if (data.loading) {
    return (
      <div style={{ width: '100%', textAlign: 'center', marginTop: '30px' }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
          onClick={({ key }) => history.push(key)}
          selectedKeys={[ location.pathname ]}
        >
          <Menu.Item key="/">List</Menu.Item>
          <Menu.Item key="/add">Add</Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Switch>
          <Route
            exact
            path='/'
            render={
              () => (
                <List
                  colors={data.colors}
                  setColor={
                    (item) => setColor({ variables: { color: item.color }})
                  }
                  removeItem={
                    (item) => {
                      removeColor({
                        variables: { color: item.color },
                        refetchQueries: [{ query: getColors }]
                      })
                    }
                  }
                />
              )
            }
          />
          <Route
            path='/add'
            render={
              () => (
                <Add
                  onPreview={(color) => setColor({ variables: { color } })}
                  onSave={
                    (color) => {
                      addColor({
                        variables: { color },
                      })
                      history.push('/')
                    }
                  }
                />
              )}
          />
        </Switch>
      </Content>
    </Layout>
  )
}

export default compose(
  withRouter,
  graphql(getColors),
  graphql(setColor, { name: 'setColor' }),
  graphql(removeColor, { name: 'removeColor' }),
  graphql(addColor, { name: 'addColor' }),
)(App)
