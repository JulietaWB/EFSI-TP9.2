export function kelvinToCelsius(kelvin) {
  if (kelvin == null) return null
  return kelvin - 273.15
}

export function kelvinToFahrenheit(kelvin) {
  if (kelvin == null) return null
  return (kelvin - 273.15) * (9 / 5) + 32
}

export function formatTemperature(value, digits = 0) {
  if (value == null || Number.isNaN(value)) return '-'
  return `${value.toFixed(digits)}°`
}

export function formatDateTime(dt) {
  const date = typeof dt === 'number' ? new Date(dt * 1000) : new Date(dt)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
}

export function formatHourLabel(dtTxt) {
  const date = new Date(dtTxt)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
