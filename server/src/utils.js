function isColorValid(color) {
  return color && /^#(?:[0-9a-f]{3}){2}$/.test(color)
}

function htmlColorToChannels(color) {
  if (!isColorValid(color)) {
    throw new Error('Invalid color')
  }

  const r = parseInt(color.substring(1, 3), 16)
  const g = parseInt(color.substring(3, 5), 16)
  const b = parseInt(color.substring(5, 7), 16)

  return { r, g, b }
}

module.exports = {
  isColorValid,
  htmlColorToChannels,
};
