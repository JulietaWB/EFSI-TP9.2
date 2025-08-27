import TemperatureToggle from './TemperatureToggle.jsx'
import SearchBar from './SearchBar.jsx'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen px-10 py-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="flex items-center justify-between mb-6">
          <SearchBar />
          <TemperatureToggle />
        </header>
        <main className="grid grid-cols-12 gap-6">{children}</main>
      </div>
    </div>
  )
}
