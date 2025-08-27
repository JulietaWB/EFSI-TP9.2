import { useWeatherContext } from '../context/WeatherContext.jsx'
import { formatDateTime } from '../utils/temperatureConverter.js'

export default function CurrentWeather() {
  const { currentWeather, selectedCity, unit, setUnit } = useWeatherContext()

  if (!currentWeather) {
    return (
      <section>
        <header>
          <h2>Current Weather</h2>
        </header>
        <p>Loading...</p>
      </section>
    )
  }

  const tempUnitLabel = unit === 'imperial' ? '°F' : unit === 'metric' ? '°C' : 'K'

  return (
    <section>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <h2 style={{ margin: 0 }}>{selectedCity}</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setUnit('metric')} aria-pressed={unit === 'metric'}>°C</button>
          <button onClick={() => setUnit('imperial')} aria-pressed={unit === 'imperial'}>°F</button>
        </div>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 48, fontWeight: 700 }}>
            {Math.round(currentWeather.main.temp)}{tempUnitLabel}
          </div>
          <div style={{ color: '#888' }}>{formatDateTime(currentWeather.dt)}</div>
          <div style={{ marginTop: 4 }}>{currentWeather.weather?.[0]?.main} · wind {Math.round(currentWeather.wind?.speed ?? 0)} {unit === 'imperial' ? 'mph' : 'm/s'}</div>
        </div>
        <div>
          <div>Min: {Math.round(currentWeather.main.temp_min)}{tempUnitLabel}</div>
          <div>Max: {Math.round(currentWeather.main.temp_max)}{tempUnitLabel}</div>
          <div>Humidity: {currentWeather.main.humidity}%</div>
        </div>
      </div>
    </section>
  )
}
