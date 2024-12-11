import { Link } from "react-router-dom"
import "./navigation.css"
import { useEffect, useState } from "react"
import { UserAPI } from "../../APIs/User"

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
        <Link to="/dashboard/devices" className={`nav-link ${currentPath === "devices" ? "active-link" : null}`}>Devices</Link>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_"className={`nav-link ${currentPath === "store" ? "active-link" : null}`}>Store</a>
        <h2 className="logout-btn" onClick={() => UserAPI.logoutUser()}>Logout</h2>
      </nav>
    </div>
  )
}