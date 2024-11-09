import './dashboard.css'

export const DashboardPage: React.FC = () => {
  const handleNotificationClick = () => {
    alert("Notifications clicked!");
  };
  
  return (
    <main className="dashboard-container">
        <header className="header">
          <div className="header-title">
            <h1>Welcome, Kevin</h1>
            <p>{(new Date()).toLocaleDateString()}</p>
          </div>
          <div className="icons-container">
            <img src={require("../../assets/notification-bell.png")} alt="Notification icon" onClick={handleNotificationClick}/>
            <a href="/dashboard/profile">
              <img src={require("../../assets/profile.png")} alt="Profile settings" />
            </a>
          </div>
        </header>

        <div className="main-content">
          {/* Left section for summaries, weekly consumption, and biggest eaters */}
          <div className="left-section">
            <div className="combined-summary-section">
              <div className="combined-summary-card">
                <div className="summary-card">
                  <p>Power Consumption</p>
                  <p>10.43<span>kWh</span></p>
                </div>
                <div className="summary-card">
                  <p>Low Devices</p>
                  <p>1</p>
                </div>
                <div className="summary-card">
                  <p>Estimated Cost</p>
                  <p>$1.89</p>
                </div>
              </div>
            </div>

            <div className="this-weeks-consumption">
              <p>This week's consumption</p>
              <p>43.82<span>kWh</span></p>
            </div>

            <section className="biggest-eaters">
              <h2>Biggest Eaters</h2>
              <div className="biggest-eater-item">
                <span>Carl's Tablet</span>
                <span>12.40 kWh</span>
              </div>
            </section>
          </div>

          {/* Right section for devices list */}
          <div className="right-section">
            <section className="devices-section">
              <h3>Devices</h3>
              <table className="devices-table">
                <thead>
                  <tr>
                    <th>Device name</th>
                    <th>Group</th>
                    <th>Percentage</th>
                    <th>Consumption</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Carl's Tablet</td>
                    <td>Carl's Devices</td>
                    <td className="percentage">80%</td>
                    <td>12.40 kWh</td>
                  </tr>
                  <tr>
                    <td>Kevin's Spoon</td>
                    <td>Kevin's Thing</td>
                    <td className="percentage">95%</td>
                    <td>60.90 kWh</td>
                  </tr>
                  <tr>
                    <td>Kevin's Pant</td>
                    <td>Kevin's Thing</td>
                    <td className="percentage">52%</td>
                    <td>3.5 kWh</td>
                  </tr>
                  <tr>
                    <td>Kevin's Blouse</td>
                    <td>Kevin's Salad Dressing</td>
                    <td className="percentage">42%</td>
                    <td>8.1 kWh</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </main>
  )
}