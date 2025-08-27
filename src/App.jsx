import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/icono.svg'
import WeatherApp from './components/WeatherApp.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { WeatherProvider } from './context/WeatherContext.jsx'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <WeatherApp />
      </WeatherProvider>
    </ThemeProvider>
  )
}

export default App
