import React from 'react';
import './dashboard.css';

const Dashboard: React.FC = () => {
  const devices = [
    { name: "Carl's Tablet", consumption: 14.4, battery: 25 },
    { name: "Kevin's Spoon", consumption: 60.9, battery: 19 },
    { name: "Kevin's Pant", consumption: 3.5, battery: 7 },
    { name: "Logan's iPhone", consumption: 8.1, battery: 85 },
  ];

  
  const totalConsumption = devices.reduce((sum, device) => sum + device.consumption, 0);

  //top 3 biggest eaters decending
  const biggestEaters = [...devices]
    .sort((a, b) => b.consumption - a.consumption)
    .slice(0, 3);

  const getBatteryClass = (battery: number) => {
    if (battery < 20) {
      return 'low-battery'; //red for below 20%
    } else {
      return 'high-battery'; //green for above 20
    }
  };

  const lowBatteryCount = devices.filter(device => device.battery < 20).length;

  // calpuate the estimated cost 10 cents per kw
  const estimatedCost = (totalConsumption / 10) * 0.10;

  const handleNotificationClick = () => {
    alert("Notifications clicked!");
  };

  const handleProfileClick = () => {
    alert("Profile clicked!");
  };

  return (
    <div className="dashboard-container">
      <main className="content">
        <header className="header">
          <div className="header-title">
            <h1>Welcome, Kevin</h1>
            <p>Monday, November 4, 2024</p>
          </div>
          <div className="icons-container">
            <span className="notification-icon" onClick={handleNotificationClick}>🔔</span>
            <span className="profile-icon" onClick={handleProfileClick}>👤</span>
          </div>
        </header>

        <div className="main-content">
          <div className="left-section">
            <div className="combined-summary-section">
              <div className="combined-summary-card">
                <div className="summary-card">
                  <h3>Power Consumption</h3>
                  <p>{totalConsumption.toFixed(2)} kWh</p> {/* displaying the total consumption */}
                </div>
                <div className="summary-card">
                  <h3>Low Devices</h3>
                  <p>{lowBatteryCount}</p> {/*displaying the count of low devices */}
                </div>
                <div className="summary-card">
                  <h3>Estimated Cost</h3>
                  <p>${estimatedCost.toFixed(2)}</p> {/*showing the estimated cost */}
                </div>
              </div>
            </div>

            <div className="this-weeks-consumption">
              <h4>This week's consumption</h4>
              <p>{totalConsumption.toFixed(2)} kWh</p> {/*displaying calculated consumption */}
            </div>

            <section className="biggest-eaters">
              <h3>Biggest Eaters</h3>
              {biggestEaters.map((device, index) => (
                <div key={index} className="biggest-eater-item">
                  <span>{device.name}</span>
                  <span>{device.consumption.toFixed(2)} kWh</span>
                </div>
              ))}
            </section>
          </div>

          <div className="right-section">
            <section className="devices-section">
              <h3>Devices</h3>
              <table className="devices-table">
                <thead>
                  <tr>
                    <th>Device name</th>
                    <th>Group</th>
                    <th>Battery</th>
                    <th>Consumption</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device, index) => {
                    return (
                      <tr key={index}>
                        <td>{device.name}</td>
                        <td>{device.name.split("'")[0]}'s Devices</td>
                        <td className={`battery ${getBatteryClass(device.battery)}`}>
                          {device.battery}%
                        </td>
                        <td>{device.consumption.toFixed(2)} kWh</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
