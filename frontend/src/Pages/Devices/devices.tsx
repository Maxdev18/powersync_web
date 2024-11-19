// Dashboard.js
import React, { useState } from "react";
import "./devices.css";

function Dashboard() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const handleExpandClick = (groupName: string) => {
    setExpandedGroup(expandedGroup === groupName ? null : groupName);
  };

  const groups = [
    {
      name: "Tanner Devices",
      devices: [
        { name: "Max Light", battery: 76, life: "1 year 27 days", condition: "Good" },
        { name: "Max Battery", battery: 10, life: "0 years 289 days", condition: "Poor" },
        { name: "Max Car", battery: 39, life: "11 years 2 days", condition: "Ok" },
      ],
    },
    {
      name: "Smith Devices",
      devices: [
        { name: "Smith Lamp", battery: 84, life: "2 years 3 days", condition: "Good" },
        { name: "Smith Speaker", battery: 50, life: "1 year 100 days", condition: "Moderate" },
        { name: "Smith Phone", battery: 15, life: "0 years 190 days", condition: "Poor" },
      ],
    },
    // Add more groups as needed
  ];

  return (
    <div className="dashboard">
      <div className="location">
        <h2>Location</h2>
        <div className="map-placeholder">[Map will go here]</div>
      </div>

      <div className="consumption">
        <h2>Consumption</h2>
        <p>Current Power Usage: 12.34 kWh</p>
        <div className="graph-placeholder">[Graph will go here]</div>
      </div>

      <div className="groups">
        <h2>Groups</h2>
        <div className="groups-scroll">
          {groups.map((group, index) => (
            <div key={index} className={`group ${expandedGroup === group.name ? "expanded" : "collapsed"}`}>
              <h3 onClick={() => handleExpandClick(group.name)}>
                {group.name} ({group.devices.length} devices) (Click to {expandedGroup === group.name ? "collapse" : "expand"})
              </h3>
              {expandedGroup !== group.name && (
                <div className="collapsed-info">
                  <p>{group.devices.length} devices available</p>
                </div>
              )}
              {expandedGroup === group.name && (
                <ul>
                  {group.devices.map((device, deviceIndex) => (
                    <li key={deviceIndex}>
                      <div className="item-header">
                        <h4>{device.name}</h4>
                        <div className={`battery-indicator ${getBatteryColorClass(device.battery)}`}></div>
                      </div>
                      <p>Battery: {device.battery}%</p>
                      <p>Estimated Life: {device.life}</p>
                      <p>Condition: {device.condition}</p>
                    </li>
                  ))}
                </ul>
              )}
              {index < groups.length - 1 && <hr />} {/* Add separator line between groups */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getBatteryColorClass(battery: number): string {
  if (battery > 50) return "green";
  if (battery > 25) return "yellow";
  return "red";
}

export default Dashboard;
