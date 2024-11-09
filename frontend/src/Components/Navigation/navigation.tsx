import { Link } from "react-router-dom"
import "./navigation.css"
import { useEffect, useState } from "react"

export const Navigation: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>()

  useEffect(() => {
    setCurrentPath(window.location.pathname.substring(1))
  }, [])

  return (
    <div className="sidebar-container">
      <h2 className="brand-name">Powersync</h2>
      <nav className="nav-link-container">
        <Link to="/dashboard" className={`nav-link ${currentPath === "dashboard" ? "active-link" : null}`}>Dashboard</Link>
        <Link to="/devices" className={`nav-link ${currentPath === "devices" ? "active-link" : null}`}>Devices</Link>
        <Link to="/store" className={`nav-link ${currentPath === "store" ? "active-link" : null}`}>Store</Link>
      </nav>
    </div>
  )
}