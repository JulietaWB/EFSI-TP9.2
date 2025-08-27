import { useWeatherContext } from '../context/WeatherContext.jsx'
import { formatDateTime } from '../utils/temperatureConverter.js'
import { WiStrongWind, WiThermometerExterior } from 'react-icons/wi'
import { FadeIn, HoverScale } from './MotionWrappers.jsx'

export default function CurrentWeatherCard() {
  const { currentWeather, selectedCity, unit } = useWeatherContext()

  if (!currentWeather) {
    return (
      <div className="col-span-6">
        <div className="card card-hover p-8 flex items-center justify-center h-[200px]">Loading…</div>
      </div>
    )
  }

  const unitLabel = unit === 'imperial' ? '°F' : unit === 'metric' ? '°C' : 'K'

  return (
    <FadeIn className="col-span-6">
      <HoverScale>
        <div className="card p-8">
          <div className="flex items-start justify-between">
            <div className="text-7xl font-bold tracking-tight">{Math.round(currentWeather.main.temp)}{unitLabel}</div>
            <div className="text-right">
              <div className="text-xl font-semibold">{selectedCity}</div>
              <div className="text-sm text-gray-400">{formatDateTime(currentWeather.dt)}</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 text-sm">
            <div className="flex items-center gap-2 text-gray-200">{currentWeather.weather?.[0]?.main}</div>
            <div className="flex items-center gap-2 justify-center text-gray-200"><WiStrongWind className="text-accent" />{Math.round(currentWeather.wind?.speed ?? 0)} {unit === 'imperial' ? 'mph' : 'm/s'}</div>
            <div className="flex items-center gap-2 justify-end text-gray-200"><WiThermometerExterior className="text-accent" />Feels like {Math.round(currentWeather.main.feels_like)}{unitLabel}</div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
            <div>Min: {Math.round(currentWeather.main.temp_min)}{unitLabel}</div>
            <div>Max: {Math.round(currentWeather.main.temp_max)}{unitLabel}</div>
          </div>
        </div>
      </HoverScale>
    </FadeIn>
  )
}
