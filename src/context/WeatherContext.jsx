import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const DEFAULT_CITY = import.meta.env.VITE_DEFAULT_CITY || 'California'

const WeatherContext = createContext(null)

export function WeatherProvider({ children }) {
  const [selectedCity, setSelectedCity] = useState(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('selectedCity') : null
    return saved || DEFAULT_CITY
  })
  const [unit, setUnit] = useState(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('unit') : null
    return saved === 'imperial' || saved === 'metric' ? saved : 'metric'
  })
  const [currentWeather, setCurrentWeather] = useState(null)
  const [hourlyForecast, setHourlyForecast] = useState([])
  const [dailyForecast, setDailyForecast] = useState([])
  const [lastFetchedAt, setLastFetchedAt] = useState(null)

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('selectedCity', selectedCity)
    }
  }, [selectedCity])

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('unit', unit)
    }
  }, [unit])

  const value = useMemo(
    () => ({
      selectedCity,
      setSelectedCity,
      unit,
      setUnit,
      currentWeather,
      setCurrentWeather,
      hourlyForecast,
      setHourlyForecast,
      dailyForecast,
      setDailyForecast,
      lastFetchedAt,
      setLastFetchedAt,
    }),
    [selectedCity, unit, currentWeather, hourlyForecast, dailyForecast, lastFetchedAt]
  )

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}

export function useWeatherContext() {
  const ctx = useContext(WeatherContext)
  if (!ctx) throw new Error('useWeatherContext must be used within WeatherProvider')
  return ctx
}
