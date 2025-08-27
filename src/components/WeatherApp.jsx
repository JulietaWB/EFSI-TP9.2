import { useEffect, useMemo, useState } from 'react'
import { useWeatherContext } from '../context/WeatherContext.jsx'
import { useWeatherApi } from '../hooks/useWeatherApi.js'
import CurrentWeatherCard from './CurrentWeatherCard.jsx'
import HourlyForecast from './HourlyForecast.jsx'
import DailyForecast from './DailyForecast.jsx'
import CityWeatherList from './CityWeatherList.jsx'
import Layout from './Layout.jsx'

export default function WeatherApp() {
  const {
    selectedCity,
    unit,
    setCurrentWeather,
    setHourlyForecast,
    setDailyForecast,
    setLastFetchedAt,
  } = useWeatherContext()
  const { getCurrentWeather, getHourlyForecast, getDailyForecast } = useWeatherApi()

  const [_, setTick] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    async function fetchAll(city, unitLocal) {
      try {
        const [curr, hourly, daily] = await Promise.all([
          getCurrentWeather(city, unitLocal),
          getHourlyForecast(city, unitLocal),
          getDailyForecast(city, unitLocal),
        ])
        if (controller.signal.aborted) return
        setCurrentWeather(curr)
        setHourlyForecast(hourly)
        setDailyForecast(daily)
        setLastFetchedAt(Date.now())
      } catch (_) {
        // ignore for now
      } finally {
        setTick((t) => t + 1)
      }
    }
    // Always refetch on city or unit change
    fetchAll(selectedCity, unit)
    return () => controller.abort()
  }, [selectedCity, unit])

  return (
    <Layout>
      {/* Left column: main card and hourly row */}
      <div className="col-span-12">
        <div className="grid grid-cols-12 gap-6">
          <CurrentWeatherCard />
          <HourlyForecast />
        </div>
      </div>

      {/* Bottom split: other cities and 5-day */}
      <CityWeatherList />
      <DailyForecast />
    </Layout>
  )
}
