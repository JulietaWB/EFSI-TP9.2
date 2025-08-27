import { useWeatherContext } from '../context/WeatherContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function TemperatureToggle() {
  const { unit, setUnit } = useWeatherContext()
  const { theme, toggleTheme } = useTheme()
  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={toggleTheme} className="pill px-3 py-2 text-sm">
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
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
    </div>
  )
}
