import { useWeatherContext } from '../context/WeatherContext.jsx'

export default function TemperatureToggle() {
  const { unit, setUnit } = useWeatherContext()
  return (
    <div className="pill-toggle">
      <button
        type="button"
        onClick={() => setUnit('metric')}
        className={`pill-option ${unit === 'metric' ? 'pill-option-active' : ''}`}
      >
        °C
      </button>
      <button
        type="button"
        onClick={() => setUnit('imperial')}
        className={`pill-option ${unit === 'imperial' ? 'pill-option-active' : ''}`}
      >
        °F
      </button>
    </div>
  )
}
