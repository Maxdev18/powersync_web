import  { useState, useEffect } from "react";
import "./devices.css";
import { useNavigate } from 'react-router-dom';
import { DeviceAPI } from '../../APIs/Devices';
import { GroupAPI } from '../../APIs/Group';
import {Devices} from '../../Types/Devices'
import PowerUsage from "../../components/PowerUsage/powerUsage";
interface Device {
  name: string;
  batteryPercentage: number;
  estimatedLife: string;
  condition: string;
  groupID: string;
}

interface Group {
  _id: string;
  name: string;
  devices: Device[];
}

function Dashboard() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [devicesData, setDevicesData] = useState<Devices[]>([]); // to store the devices from local storage
  const navigate = useNavigate();
  function getBatteryColorClass(battery: number): string {
    if (battery > 50) return "green";
    if (battery > 25) return "yellow";
    return "red";
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const user = JSON.parse(localStorage.getItem("user") as string);
        if (user) {
          const groupsResponse = await GroupAPI.getAllGroups(user.id);
          const groups = groupsResponse.data || [];
          console.log("Fetched Groups:", groups);
          localStorage.setItem("groups", JSON.stringify(groups));
          setGroups(groups);

          if (groups.length > 0) {
            const devicesResponse = await DeviceAPI.getDevicesByGroupIds(groups);
            const devices = devicesResponse.data || [];
            console.log("Fetched Devices:", devices);

            const updatedGroups = groups.map((group: Group) => {
              const groupDevices = devices.filter((device: Device) => device.groupID === group._id);
              console.log("Group Devices for", group.name, groupDevices);
              return {
                ...group,
                devices: groupDevices
              };
            });

            console.log("Updated Groups with Devices:", updatedGroups);
            setGroups(updatedGroups);
          }
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, []);

  const getDevicesData = () => { 
    const storedData = localStorage.getItem('devices');
    return storedData ? JSON.parse(storedData) : null;
  };

  //this will run when the component mounts
  useEffect(() => {
    getDevicesData() && setDevicesData(getDevicesData());//pass devices data
  }, [])

  const handleExpandClick = (groupName: string) => {
    setExpandedGroup(expandedGroup === groupName ? null : groupName);
  };

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
  };

  const handleEditClick = (device: Device) => {
    navigate(`/editDevice?deviceName=${device.name}`);
  };
  const handleProfileClick = () => {
    navigate("/dashboard/profile");
  };

  return (
    <div className="devicesPageContainer">

        <div className="devicesHeader">
          <p className="bolderFont">Location</p>
          <div className="iconsContainer">
            <i className="bi bi-bell-fill"></i>
            <i onClick={handleProfileClick} className="bi bi-person-circle"></i>
          </div>
        </div>

        <div className="mainContainer">

          <div className="locationConsumptionContainer">
            <div className="locationContainer">
              <p> MAP WILL GO HERE DUHHH</p>
            </div>

            <div className="consumptionContainer">
              <p className="bolderFont">Consumption</p>
              <PowerUsage devices={devicesData}/>
            </div>
          </div>

          <div className="devicesContainer">
            <div className="groupsHeader">
              <h1>Groups</h1>
              <div className="iconsContainer">
              <i style={{color:"#12B8FF"}} className="bi bi-plus-square"></i>
              <i style={{color:'#FFAC12'}} className="bi bi-pencil"></i>
              </div>
            </div>
          </div>

        </div>
        
    </div>

  );
}


export default Dashboard;



//return (
  //   <div className="dashboard">
  //     <div className="location">
  //       <h2>Location</h2>
  //       <div className="map-placeholder">[Map will go here]</div>
  //     </div>

  //     <div className="consumption">
  //       <h2>Consumption</h2>
  //       {selectedDevice ? (
  //         <div className="device-details">
  //           <h3>{selectedDevice.name} Details</h3>
  //           <p>Battery: {selectedDevice.batteryPercentage}%</p>
  //           <p>Estimated Life: {selectedDevice.estimatedLife}</p>
  //           <p>Condition: {selectedDevice.condition}</p>
  //           {/* Add more details as needed */}
  //         </div>
  //       ) : (
  //         <p>Select a device to see its details here.</p>
  //       )}
  //       <div className="graph-placeholder">[Graph will go here]</div>
  //     </div>

  //     <div className="groups">
  //       <h2>Groups</h2>
  //       <div className="groups-scroll">
  //         {groups.length > 0 ? (
  //           groups.map((group, index) => (
  //             <div key={index} className={`group ${expandedGroup === group.name ? "expanded" : "collapsed"}`}>
  //               <h3 onClick={() => handleExpandClick(group.name)}>
  //                 {group.name} ({group.devices?.length || 0} devices) (Click to {expandedGroup === group.name ? "collapse" : "expand"})
  //               </h3>
  //               {expandedGroup !== group.name && (
  //                 <div className="collapsed-info">
  //                   <p>{group.devices?.length || 0} devices available</p>
  //                 </div>
  //               )}
  //               {expandedGroup === group.name && (
  //                 <ul>
  //                   {group.devices.map((device: Device, deviceIndex: number) => (
  //                     <li key={deviceIndex} className={`battery-indicator ${getBatteryColorClass(device.batteryPercentage)}`}>
  //                       <div className="item-header">
  //                         <h4 onClick={() => handleDeviceClick(device)}>{device.name}</h4>
  //                       </div>
  //                       <p>Battery: {device.batteryPercentage}%</p>
  //                       <p>Estimated Life: {device.estimatedLife}</p>
  //                       <p>Condition: {device.condition}</p>
  //                       <button onClick={() => handleEditClick(device)}>Edit</button>
  //                     </li>
  //                   ))}
  //                 </ul>
  //               )}
  //               {index < groups.length - 1 && <hr />}
  //             </div>
  //           ))
  //         ) : (
  //           <p>No groups available.</p>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );