import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (saved === 'light' || saved === 'dark') return saved
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme, toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')) }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
