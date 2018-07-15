import * as React from 'react'
import * as Ant from 'antd'

const { Menu } = Ant

import ntc from '../../services/ntc'

const List = ({ colors, setColor, removeItem }) => {
  const data = colors.map(x => ({
    ...x, name: ntc.name(x.color)[1],
  }))

  return (
    <Ant.List
      dataSource={data}
      renderItem={item => (
        <Ant.List.Item actions={[
          <Ant.Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault()
                      removeItem(item)
                    }}
                  >
                    Delete
                  </a>
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
            placement="bottomRight"
          >
            <a>more</a>
          </Ant.Dropdown>
        ]}>
          <Ant.List.Item.Meta
            title={
              <a
                href="#"
                onClick={
                  (event) => {
                    event.preventDefault()
                    setColor(item)
                  }
                }
              >
                {item.name}
              </a>
            }
            avatar={
              <div style={{ marginLeft: '10px' }}>
                <Ant.Avatar style={{ backgroundColor: item.color }} />
              </div>
            }
          />
        </Ant.List.Item>
      )}
    />
  )
}

export default List
