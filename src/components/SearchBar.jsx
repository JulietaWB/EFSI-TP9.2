import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useWeatherContext } from '../context/WeatherContext.jsx'

export default function SearchBar() {
  const { setSelectedCity } = useWeatherContext()
  const [value, setValue] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    const v = value.trim()
    if (v) setSelectedCity(v)
  }

  return (
    <form onSubmit={onSubmit} className="w-[420px]">
      <div className="pill flex items-center gap-3 px-4">
        <FaSearch className="text-gray-400" />
        <input
          className="pill-input"
          placeholder="Buscar ciudad..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </form>
  )
}
