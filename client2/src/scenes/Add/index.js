import * as React from 'react'
import { Button } from 'antd'
import { compose, withState } from 'recompose'
import { withRouter } from 'react-router'

import ColorPicker from '../../components/ColorPicker'

const Add = ({ history, onColorChange, onPreview, onSave, color }) => {
  return (
    <div style={{ padding: '10px' }}>
      <ColorPicker onChange={onColorChange} />
      <Button.Group size="large" style={{ marginTop: '20px' }}>
        <Button type="primary" onClick={() => history.push('/')}>Back</Button>
        <Button type="primary" onClick={() => onPreview(color)}>Preview</Button>
        <Button type="primary" onClick={() => onSave(color)}>Save</Button>
      </Button.Group>
    </div>
  )
}

export default compose(
  withRouter,
  withState('color', 'onColorChange', '#808080')
)(Add)
