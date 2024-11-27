import React, { useState, useEffect } from "react";
import "./devices.css";
import { useNavigate } from 'react-router-dom';
import { DeviceAPI } from '../../APIs/Devices';
import { GroupAPI } from '../../APIs/Group';

interface Device {
  name: string;
  battery: number;
  life: string;
  condition: string;
  groupId: string;
}

interface Group {
  id: string;
  name: string;
  devices: Device[];
}

function Dashboard() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        // Get user ID from localStorage
        const user = JSON.parse(localStorage.getItem("user") as string);
        if (user) {
          // Fetch groups by user ID
          const groupsResponse = await GroupAPI.getAllGroups(user.id);
          const groups = groupsResponse.data || []; // Ensure groups is an array
          console.log("Fetched Groups:", groups); // Debugging log
          localStorage.setItem("groups", JSON.stringify(groups));
          setGroups(groups);

          // Fetch devices by group IDs
          if (groups.length > 0) {
            const devicesResponse = await DeviceAPI.getDevicesByGroupIds(groups);
            const devices = devicesResponse.data || []; // Ensure devices is an array
            console.log("Fetched Devices:", devices); // Debugging log
            const updatedGroups = groups.map((group: Group) => {
              group.devices = devices.filter((device: Device) => device.groupId === group.id) || [];
              return group;
            });
            console.log("Updated Groups with Devices:", updatedGroups); // Debugging log
            setGroups(updatedGroups);
          }
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  const handleExpandClick = (groupName: string) => {
    setExpandedGroup(expandedGroup === groupName ? null : groupName);
  };

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
  };

  const handleEditClick = (device: Device) => {
    navigate(`/editDevice?deviceName=${device.name}`);
  };

  return (
    <div className="dashboard">
      <div className="location">
        <h2>Location</h2>
        <div className="map-placeholder">[Map will go here]</div>
      </div>

      <div className="consumption">
        <h2>Consumption</h2>
        {selectedDevice ? (
          <div className="device-details">
            <h3>{selectedDevice.name} Details</h3>
            <p>Battery: {selectedDevice.battery}%</p>
            <p>Estimated Life: {selectedDevice.life}</p>
            <p>Condition: {selectedDevice.condition}</p>
            {/* Add more details as needed */}
          </div>
        ) : (
          <p>Select a device to see its details here.</p>
        )}
        <div className="graph-placeholder">[Graph will go here]</div>
      </div>

      <div className="groups">
        <h2>Groups</h2>
        <div className="groups-scroll">
          {groups.length > 0 ? (
            groups.map((group, index) => (
              <div key={index} className={`group ${expandedGroup === group.name ? "expanded" : "collapsed"}`}>
                <h3 onClick={() => handleExpandClick(group.name)}>
                  {group.name} ({group.devices?.length || 0} devices) (Click to {expandedGroup === group.name ? "collapse" : "expand"})
                </h3>
                {expandedGroup !== group.name && (
                  <div className="collapsed-info">
                    <p>{group.devices?.length || 0} devices available</p>
                  </div>
                )}
                {expandedGroup === group.name && (
                  <ul>
                    {group.devices.map((device: Device, deviceIndex: number) => (
                      <li key={deviceIndex}>
                        <div className="item-header">
                          <h4 onClick={() => handleDeviceClick(device)}>{device.name}</h4>
                          <div className={`battery-indicator ${getBatteryColorClass(device.battery)}`}></div>
                        </div>
                        <p>Battery: {device.battery}%</p>
                        <p>Estimated Life: {device.life}</p>
                        <p>Condition: {device.condition}</p>
                        <button onClick={() => handleEditClick(device)}>Edit</button>
                      </li>
                    ))}
                  </ul>
                )}
                {index < groups.length - 1 && <hr />} {/* Add separator line between groups */}
              </div>
            ))
          ) : (
            <p>No groups available.</p>
          )}
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