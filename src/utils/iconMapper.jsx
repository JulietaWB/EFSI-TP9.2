import { WiDaySunny, WiCloud, WiCloudy, WiShowers, WiRain, WiThunderstorm, WiSnow, WiFog } from 'react-icons/wi'

export function getWeatherIcon(main) {
  const key = String(main || '').toLowerCase()
  switch (key) {
    case 'clear':
      return WiDaySunny
    case 'clouds':
      return WiCloudy
    case 'drizzle':
      return WiShowers
    case 'rain':
      return WiRain
    case 'thunderstorm':
      return WiThunderstorm
    case 'snow':
      return WiSnow
    case 'mist':
    case 'fog':
    case 'haze':
      return WiFog
    default:
      return WiCloud
  }
}

export function WeatherIcon({ main, className }) {
  const Icon = getWeatherIcon(main)
  return <Icon className={className} />
}
