import { useEffect, useState } from 'react'
import { useWeatherApi } from '../hooks/useWeatherApi.js'

export default function CityWeather({ city, unit }) {
  const { getCurrentWeather } = useWeatherApi()
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const res = await getCurrentWeather(city, unit)
        if (active) setData(res)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to load city weather', city, e)
      }
    })()
    return () => {
      active = false
    }
  }, [city, unit])

  if (!data) return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: 12 }}>
      <div style={{ fontWeight: 600 }}>{city}</div>
      <div>Loading...</div>
    </div>
  )

  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: 12 }}>
      <div style={{ fontWeight: 600 }}>{city}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{Math.round(data.main.temp)}{unit === 'imperial' ? '°F' : unit === 'metric' ? '°C' : 'K'}</div>
      <div style={{ color: '#666' }}>{data.weather?.[0]?.main}</div>
    </div>
  )
}
