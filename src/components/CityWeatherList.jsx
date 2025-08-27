import CityWeather from './CityWeather.jsx'
import { useWeatherContext } from '../context/WeatherContext.jsx'

export default function CityWeatherList() {
  const { unit } = useWeatherContext()
  const cities = ['New York', 'Copenhagen', 'Ho Chi Minh City']
  return (
    <section className="col-span-6">
      <h3 className="mb-3 font-semibold">Other large cities</h3>
      <div className="flex flex-col gap-3">
        {cities.map((city) => (
          <div key={city} className="card card-hover p-4">
            <CityWeather city={city} unit={unit} />
          </div>
        ))}
      </div>
    </section>
  )
}
