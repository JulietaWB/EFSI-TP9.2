const API_BASE = 'https://api.openweathermap.org/data/2.5'

function buildParams(unit) {
  const units = unit === 'imperial' ? 'imperial' : unit === 'metric' ? 'metric' : 'standard'
  return `&units=${units}`
}

export function useWeatherApi() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.warn('VITE_OPENWEATHER_API_KEY is not set. Add it to your .env file.')
  }

  async function getCurrentWeather(city, unit = 'metric') {
    const res = await fetch(`${API_BASE}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}${buildParams(unit)}`)
    if (!res.ok) throw new Error('Failed to fetch current weather')
    return res.json()
  }

  async function getHourlyForecast(city, unit = 'metric') {
    const res = await fetch(`${API_BASE}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}${buildParams(unit)}`)
    if (!res.ok) throw new Error('Failed to fetch hourly forecast')
    const data = await res.json()
    // 3-hour intervals already
    return data
  }

  async function getDailyForecast(city, unit = 'metric') {
    const res = await fetch(`${API_BASE}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}${buildParams(unit)}`)
    if (!res.ok) throw new Error('Failed to fetch daily forecast')
    const data = await res.json()
    // Group by day to derive min/max and main status
    const byDate = new Map()
    for (const item of data.list) {
      const date = item.dt_txt.split(' ')[0]
      const entry = byDate.get(date) || { temps: [], icons: [], weathers: [] }
      entry.temps.push(item.main.temp)
      entry.icons.push(item.weather?.[0]?.icon)
      entry.weathers.push(item.weather?.[0]?.main)
      byDate.set(date, entry)
    }
    const daily = Array.from(byDate.entries()).map(([date, v]) => ({
      date,
      min: Math.min(...v.temps),
      max: Math.max(...v.temps),
      icon: v.icons[Math.floor(v.icons.length / 2)] || v.icons[0],
      weather: v.weathers[Math.floor(v.weathers.length / 2)] || v.weathers[0],
    }))
    return daily
  }

  return { getCurrentWeather, getHourlyForecast, getDailyForecast }
}
