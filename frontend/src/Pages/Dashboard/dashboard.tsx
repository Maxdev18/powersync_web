import React, { useEffect } from 'react';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { GroupAPI } from '../../APIs/Group';
import { DeviceAPI } from '../../APIs/Devices';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const devices = [
    { name: "Carl's Tablet", consumption: 14.4, battery: 25 },
    { name: "Kevin's Spoon", consumption: 60.9, battery: 19 },
    { name: "Kevin's Pant", consumption: 3.5, battery: 7 },
    { name: "Logan's iPhone", consumption: 8.1, battery: 85 },
  ];

  const totalConsumption = devices.reduce((sum, device) => sum + device.consumption, 0);

  // Top 3 biggest eaters in descending order
  const biggestEaters = [...devices]
    .sort((a, b) => b.consumption - a.consumption)
    .slice(0, 3);

  const getBatteryClass = (battery: number) => {
    return battery < 20 ? 'low-battery' : 'high-battery';
  };

  const lowBatteryCount = devices.filter(device => device.battery < 20).length;

  // Calculate the estimated cost (10 cents per kWh)
  const estimatedCost = (totalConsumption / 10) * 0.10;

  useEffect(() => {
    async function getData() {
      await GroupAPI.getAllGroups(JSON.parse(localStorage.getItem("user") as string).id)
      await DeviceAPI.getDevicesByGroupIds(JSON.parse(localStorage.getItem("groups") as string))
    }
    getData()
  }, [])

  const handleNotificationClick = () => {
    alert("Notifications clicked!");
  };

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
  };

  return (
    <div className="dashboard-container">
      <main className="content">
        <header className="header">
          <div className="header-title">
            <h1>Welcome, {(JSON.parse(localStorage.getItem("user") as string)).firstName} {(JSON.parse(localStorage.getItem("user") as string)).lastName}</h1>
            <p>{new Date().getMonth()}/{new Date().getDate()}/{new Date().getFullYear()}</p>
          </div>
          <div className="icons-container">
            <img
              src={require("../../assets/notification-bell.png")}
              alt="Notification icon"
              onClick={handleNotificationClick}
            />
            <img
              src={require("../../assets/profile.png")}
              alt="Profile settings"
              onClick={handleProfileClick}
            />
          </div>
        </header>

        <div className="main-content">
          <div className="left-section">
            <div className="combined-summary-section">
              <div className="combined-summary-card">
                <div className="summary-card">
                  <h3>Power Consumption</h3>
                  <p>{totalConsumption.toFixed(2)} kWh</p>
                </div>
                <div className="summary-card">
                  <h3>Low Devices</h3>
                  <p>{lowBatteryCount}</p>
                </div>
                <div className="summary-card">
                  <h3>Estimated Cost</h3>
                  <p>${estimatedCost.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="this-weeks-consumption">
              <h4>This week's consumption</h4>
              <p>{totalConsumption.toFixed(2)} kWh</p>
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
                  {devices.map((device, index) => (
                    <tr key={index}>
                      <td>{device.name}</td>
                      <td>{device.name.split("'")[0]}'s Devices</td>
                      <td className={`battery ${getBatteryClass(device.battery)}`}>
                        {device.battery}%
                      </td>
                      <td>{device.consumption.toFixed(2)} kWh</td>
                    </tr>
                  ))}
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
