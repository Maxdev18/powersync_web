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
import { Modal, Button, Form } from 'react-bootstrap'; // Import modal components

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
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [groupName, setGroupName] = useState(''); // State to store the new group name
  const navigate = useNavigate();

  const getBatteryColorClass = (battery: number): string => {
    if (battery > 50) return "green";
    if (battery > 25) return "yellow";
    return "red";
  };
  
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
          console.log("Fetched Groups:", groups);
          localStorage.setItem("groups", JSON.stringify(groups));
          setGroups(groups);

          if (groups.length > 0) {
            const devicesResponse = await DeviceAPI.getDevicesByGroupIds(groups);
            const devices = devicesResponse.data || [];
            console.log("Fetched Devices:", devices);

            const updatedGroups = groups.map((group: Group) => {
              const groupDevices = devices.filter((device: Device) => device.groupID === group._id);
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

  useEffect(() => {
    getDevicesData() && setDevicesData(getDevicesData()); //pass devices data
  }, []);

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
  };

  const handleAddDeviceClick = (groupId: string) => {
    navigate("/addDevice");
    console.log(`Add device to group ${groupId}`);
  };

  const handleDeviceOptionsClick = (deviceId: string) => {
    navigate("/editDevice");
    console.log(`Options clicked for device ${deviceId}`);
  };

  // Handle the opening and closing of the modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  // Handle the form submission to create a new group
  const handleCreateGroup = async () => {
    try {
      if (!groupName) {
        alert("Please enter a valid group name.");
        return;
      }

      // Send request to create a new group in the backend
      const user = JSON.parse(localStorage.getItem("user") as string);
      if (user) {
        const response = await GroupAPI.createGroup({
          name: groupName,
          userID: user.id,
          numberOfDevices: 0
        });

        const newGroup = response.data;
        setGroups([...groups, newGroup]); // Add the new group to the local state
        localStorage.setItem("groups", JSON.stringify([...groups, newGroup])); // Update localStorage
        handleCloseModal(); // Close the modal after creation
      }
    } catch (error) {
      console.error("Error creating group", error);
    }
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
              <PowerUsage devices={devicesData} />
            </div>
          </div>

          <div className="devicesContainer">
            <div className="groupsHeader">
              <h1>Groups</h1>
              <div className="iconsContainer">
                <i
                  style={{ color: "#12B8FF" }}
                  className="bi bi-plus-square"
                  onClick={handleShowModal} // Open modal when the button is clicked
                ></i>
                <i style={{ color: '#FFAC12' }} className="bi bi-pencil"></i>
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
                                <Col className="bolderFont" sm={6}>
                                  {device.name}
                                </Col>
                                <Col style={{ fontWeight: "600", color: "light blue" }}>
                                  Estimated Life: {Math.ceil(parseFloat(device.estimatedLife))} days
                                </Col>
                              </Row>
                              <Row className="secondRow">
                                <Col className={getBatteryColorClass(device.batteryPercentage)} sm={6}>
                                  {device.batteryPercentage}%
                                </Col>
                                <Col className={getConditionColorClass(device.condition)}>
                                  Condition: {device.condition}
                                </Col>
                                <Col className="deviceButton" sm={1}>
                                  <button className="deviceButton" onClick={() => handleDeviceOptionsClick(device.name)}><i className="bi bi-three-dots-vertical"></i></button>
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

        {/* Modal for adding new group */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create a New Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>Group Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={handleGroupNameChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreateGroup}>
              Create Group
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
  );
}

export default Dashboard;