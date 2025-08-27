import { useWeatherContext } from '../context/WeatherContext.jsx'

export default function DailyForecast() {
  const { dailyForecast, unit } = useWeatherContext()
  if (!dailyForecast || dailyForecast.length === 0) return (
    <div className="card col-span-6 p-4">Loading…</div>
  )

  const unitLabel = unit === 'imperial' ? '°F' : unit === 'metric' ? '°C' : 'K'
  const nextFive = dailyForecast.slice(0, 5)

  return (
    <section className="card card-hover col-span-6 p-4">
      <h3 className="mb-3 font-semibold">5-day forecast</h3>
      <div className="flex flex-col gap-2">
        {nextFive.map((d) => (
          <div key={d.date} className="grid grid-cols-12 items-center gap-3">
            <div className="col-span-3 text-sm text-gray-300">
              {new Date(d.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
            <div className="col-span-2 text-xs text-gray-300">{d.weather}</div>
            <div className="col-span-5 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7c91ff] to-[#b38cff]"
                style={{ width: `${Math.max(6, Math.min(100, (d.max - d.min) * 10))}%` }}
              />
            </div>
            <div className="col-span-2 text-right text-sm">
              {Math.round(d.min)}{unitLabel} · {Math.round(d.max)}{unitLabel}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
