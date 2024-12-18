import React, { useState,useEffect } from 'react';
import { useQuery } from "react-query";
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { GroupAPI } from '../../APIs/Group';
import { DeviceAPI } from '../../APIs/Devices';
import {User} from '../../Types/User'
import {Devices} from '../../Types/Devices'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { startDeviceSimulation } from '../../Simulation/simulation';

let counter = 0;

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState({} as User); // to store the user data from local storage
  const [devicesData, setDevicesData] = useState<Devices[]>([]); // to store the devices from local storage
  const {
    data,
  } = useQuery("postsData", getData);
  const navigate = useNavigate();
  const biggestEaters = [...devicesData]
  .sort((a, b) => b.wattage - a.wattage)
  .slice(0, 5);

  // this will be for daily consumption
  const totalConsumption = devicesData.reduce((sum, device) => sum + device.wattage, 0);

  const getBatteryClass = (battery: number) => {
    return battery < 25 ? 'low-battery' : 'high-battery';
  };

  const lowBatteryCount = devicesData.filter(device => device.batteryPercentage < 25).length;

  // Calculate the estimated cost by add all estimated cost of devices
  const estimatedCost = devicesData.reduce((sum, device) => sum + device.estimatedCost, 0);

  async function getData() {
    const groups = (await GroupAPI.getAllGroups(JSON.parse(localStorage.getItem("user") as string)._id || JSON.parse(localStorage.getItem("user") as string).id)).data //update groups from db
    const devices = (await DeviceAPI.getDevicesByGroupIds(JSON.parse(localStorage.getItem("groups") as string))).data //update devices from db

    return { groups, devices }
  }
  const getUserInfo = () => {
    const storedData = localStorage.getItem('user');
    return storedData ? JSON.parse(storedData) : null;
  };

  const getDevicesData = () => { 
    const storedData = localStorage.getItem('devices');
    return storedData ? JSON.parse(storedData) : null;
  };

  //this will run when the component mounts
  useEffect(() => {
    async function getAllData() {
      getUserInfo() && setUserData(getUserInfo()); //pass the user data
      getDevicesData() && setDevicesData(getDevicesData());//pass devices data
      getData()
    }

    if(devicesData.length === 0 && counter === 0) {
      getAllData()
      counter = 1
    }
  }, [devicesData])

  useEffect(() => {
    startDeviceSimulation()
  }, [])

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
  };

  return (
    
    <div className="dashboard-container">
      <Container className="content">
        <header className="header">
          <div className="header-title">
            <h1>Welcome, {userData.firstName} {userData.lastName}</h1>
            <p> {(new Date).toLocaleDateString()}</p>
          </div>
          <div className="icons-container">
            <img className='notification-icon'
              src={require("../../assets/notification-bell.png")}
              alt="Notification icon"          
            />
            <img className='profile-icon'
              src={require("../../assets/profile.png")}
              alt="Profile settings"    
              onClick={handleProfileClick}
            />
          </div>
        </header>

        <div className="main-content">
          <div className="left-section">
              <div className="combined-summary-card">
                <Row className='summaryCardHeader'>
                  <Col>Power Consumption</Col>
                  <Col>Low Devices</Col>
                  <Col>Estimated Cost</Col>
                </Row>
                <Row className='summaryCardSubHeader'>
                  <Col>{totalConsumption.toFixed(2)} kWh</Col>
                  <Col>{lowBatteryCount}</Col>
                  <Col>${estimatedCost.toFixed(2)}</Col>
                </Row>
              </div>

              <div className="biggestEaters">
                <div className='biggestEatersHeader'>
                  <h3>Biggest Eaters</h3>
                </div>
                <div className='biggestEaterItems'>
                {biggestEaters.map((device: Devices, i) => {
                  return (
                    <div className='BiggestEaterItem' key={i}> 
                      <div className='icon-container'>
                        <div className='icon'>
                          <i className="bi bi-lightning-charge"></i>
                        </div>
                        <div>{device.name}</div>
                      </div>
                      
                      <div className='wattage'>{device.wattage.toFixed(2)} kWh</div>
                    </div>
                  )
                })}
                </div>
              </div>  
          </div>

          <div className="right-section">
            <div className='devicesSection'>
                <div className='devicesSectionHeader'>
                  <Row className='mainHeader'>Devices</Row>
                  <Row>
                    <Col>Device Name</Col>
                    <Col>Group</Col>
                    <Col>Percentage</Col>
                    <Col>Consumption</Col>
                  </Row>
                </div>

                <div className='devicesSectionItems'>
                  {data && data.devices.map((device: any, index: any) => (
                    <Row className='deviceItem' key={index}>
                      <Col>{device.name}</Col>
                      <Col>{device.groupName}</Col>
                      <Col className={`battery ${getBatteryClass(device.batteryPercentage)}`}>
                        {device.batteryPercentage.toString()}%
                      </Col>
                      <Col>{device.wattage.toFixed(2)} kWh</Col>
                    </Row>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;