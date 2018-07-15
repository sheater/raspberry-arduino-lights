import * as React from 'react'
import { Slider, Button } from 'antd'
import { compose, withState, pure } from 'recompose'

function rgbToHex(r, g, b) {
  const hex = [r, g, b]
    .map(x => Math.ceil(x * 2.55))
    .map(x => x.toString(16))
    .map(x => x.length >= 2 ? x.substring(0, 2) : `0${x}`).join('')

  return `#${hex}`
}

const ColorPicker = ({ r, g, b, setR, setG, setB, onChange }) => {
  return (
    <div>
      <div style={{ backgroundColor: rgbToHex(r, g, b), width: '100%', height: '64px', marginBottom: '20px' }} />
      <label>Red</label>
      <Slider defaultValue={r} onChange={(x) => {setR(x); onChange(rgbToHex(x, g, b))}} />
      <label>Green</label>
      <Slider defaultValue={g} onChange={(x) => {setG(x); onChange(rgbToHex(r, x, b))}} />
      <label>Blue</label>
      <Slider defaultValue={b} onChange={(x) => {setB(x); onChange(rgbToHex(r, g, x))}} />
    </div>
  )
}

export default compose(
  withState('r', 'setR', 50),
  withState('g', 'setG', 50),
  withState('b', 'setB', 50),
  pure,
)(ColorPicker)
