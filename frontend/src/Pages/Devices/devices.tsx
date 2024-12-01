import  { useState, useEffect } from "react";
import "./devices.css";
import { useNavigate } from 'react-router-dom';
import { DeviceAPI } from '../../APIs/Devices';
import { GroupAPI } from '../../APIs/Group';
import {Devices} from '../../Types/Devices'
import PowerUsage from "../../components/PowerUsage/powerUsage";
import Accordion from 'react-bootstrap/Accordion';
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
          <div className="groupsContainer">
            {groups.length > 0 ? (
              <Accordion>
                {groups.map((group, index) => (
                  <Accordion.Item key={group._id} eventKey={group._id}>
                    <Accordion.Header>
                      {group.name} ({group.devices?.length || 0} devices)
                    </Accordion.Header>
                    <Accordion.Body>
                      {group.devices && group.devices.length > 0 ? (
                        group.devices.map((device, deviceIndex) => (
                          <div key={deviceIndex}>
                            <div className="item-header">
                              <h4>{device.name}</h4>
                            </div>
                            <p>Battery: {device.batteryPercentage}%</p>
                            <p>Estimated Life: {device.estimatedLife}</p>
                            <p>Condition: {device.condition}</p>
                          </div>
                        ))
                      ) : (
                        <p>No devices available in this group.</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              <p>No groups available.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;


