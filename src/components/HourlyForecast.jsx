import { useWeatherContext } from '../context/WeatherContext.jsx'
import { formatHourLabel } from '../utils/temperatureConverter.js'

export default function HourlyForecast() {
  const { hourlyForecast, unit } = useWeatherContext()
  if (!hourlyForecast || !hourlyForecast.list) return (
    <div className="card col-span-12 p-4">Loading…</div>
  )

  const next24 = hourlyForecast.list.slice(0, 8)
  const unitLabel = unit === 'imperial' ? '°F' : unit === 'metric' ? '°C' : 'K'

  return (
    <section className="col-span-12">
      <div className="flex gap-4 overflow-x-auto pb-1">
        {next24.map((item) => (
          <div key={item.dt} className="card card-hover min-w-[88px] px-3 py-4 text-center">
            <div className="text-[11px] text-gray-400">{formatHourLabel(item.dt_txt)}</div>
            <div className="text-lg font-semibold">{Math.round(item.main.temp)}{unitLabel}</div>
            <div className="text-[11px] text-gray-300">{item.weather?.[0]?.main}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
