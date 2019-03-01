function formatNumber(num) {
  return num > 999 ? `${(num / 1000).toFixed(1)}k` : num
}

function toCamelCase(text) {
  if (text == null) {
    return text
  }
  return (
    text
      .split(/[\s_]+/)
      .map(w => w.charAt(0)
        .toUpperCase()
        + w.substr(1, w.length)
          .toLowerCase())
      .join(' ')
  )
}

export const convertToPaiseString = amount => (Math.floor(amount * 100)).toString(10)

export { formatNumber, toCamelCase }
