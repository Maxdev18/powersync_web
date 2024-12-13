import { useState, useEffect } from "react";
import "./devices.css";
import { useNavigate } from 'react-router-dom';
import { DeviceAPI } from '../../APIs/Devices';
import { GroupAPI } from '../../APIs/Group';
import { Devices } from '../../Types/Devices';
import PowerUsage from "../../components/PowerUsage/powerUsage";
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
  const [groups, setGroups] = useState<Group[]>([]);
  const [devicesData, setDevicesData] = useState<Devices[]>([]); // to store the devices from local storage
  const navigate = useNavigate();

  const getBatteryColorClass = (battery: number): string =>{
    if (battery > 50) return "green";
    if (battery > 25) return "yellow";
    return "red";
  }
  const getConditionColorClass = (condition: string): string => {
    if (condition === "Good" || condition === "Great") return "green";
    if (condition === "OK" || condition === "Average") return "yellow";
    return "red";
  };
  
  useEffect(() => {
    async function fetchData() {
      try {
        const user = JSON.parse(localStorage.getItem("user") as string);
        if (user) {
          const groupsResponse = await GroupAPI.getAllGroups(user.id);
          const groups = groupsResponse.data || [];
          localStorage.setItem("groups", JSON.stringify(groups));
          setGroups(groups);

          if (groups.length > 0) {
            const devicesResponse = await DeviceAPI.getDevicesByGroupIds(groups);
            const devices = devicesResponse.data || [];

            const updatedGroups = groups.map((group: Group) => {
              const groupDevices = devices.filter((device: Device) => device.groupID === group._id);
              console.log("Group Devices for", group.name, groupDevices);
              return {
                ...group,
                devices: groupDevices
              };
            });

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

  useEffect(() => {
    getDevicesData() && setDevicesData(getDevicesData());//pass devices data
  }, [])

 
  const handleProfileClick = () => {
    navigate("/dashboard/profile");
  };

  const handleAddDeviceClick = (groupId: string) => {
    // Implement the logic to add a new device to the specified group
    console.log(`Add device to group ${groupId}`);
  };
  
  const handleEditClick = (device: Device) => {
    navigate(`/editDevice?deviceName=${device.name}`);
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
              <p> MAP WILL GO HERE</p>
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
                  {groups.map((group) => (
                    <Accordion.Item key={group._id} eventKey={group._id}>
                      <Accordion.Header>
                        {group.name} ({group.devices?.length || 0} devices)
                      </Accordion.Header>
                      <Accordion.Body>
                        {group.devices && group.devices.length > 0 ? (
                          group.devices.map((device, deviceIndex) => (
                            <Container className="deviceContainer" key={deviceIndex}>
                              <Row className="firstRow">
                                <Col className="bolderFont" sm={8}>{device.name}</Col>
                                <Col style={{fontWeight:"600",color:"light blue"}}>Estimated Life: {Math.ceil(parseFloat(device.estimatedLife))} days</Col>
                              </Row>
                              <Row className="secondRow">
                                <Col className={getBatteryColorClass(device.batteryPercentage)} sm={8}>{device.batteryPercentage}%</Col>
                                <Col className ={getConditionColorClass(device.condition)}>Condition: {device.condition}</Col>
                                <Col className="deviceButton" sm={1}>
                                  <button className="deviceButton"><i className="bi bi-three-dots-vertical"></i></button>
                                </Col>
                              </Row>
                            </Container>
                          ))
                        ) : (
                          <p>No devices available in this group.</p>
                        )}
                        <button className="addDeviceButton" onClick={() => handleAddDeviceClick(group._id)}>
                          Add Device
                        </button>
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
