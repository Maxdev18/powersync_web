import React, { useState, useEffect } from 'react';
import './editDevice.css';
import { GroupAPI } from '../../APIs/Group';
import { DeviceAPI } from '../../APIs/Devices';
import { useLocation } from 'react-router-dom';

const EditDevice: React.FC = () => {
    const [device, setDevice] = useState({
        name: '',
        newName: '',
        group: '',
        type: '',
        serialNumber: '',
        cycles: '',
        condition: 'Good',
        notes: '',
        batteryPercentage: 0,
        wattage: 0,
        estimatedLife: 0,
        estimatedCost: 0,
        location: {
            longitude: 0,
            latitude: 0,
        },
    });

    const [devices, setDevices] = useState<{ name: string; _id: string; groupID: string; [key: string]: any }[]>([]);
    const [groups, setGroups] = useState<{ name: string; _id: string }[]>([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        async function getData() {
            const user = JSON.parse(localStorage.getItem('user') as string);

            if (user) {
                try {
                    const groupResponse = await GroupAPI.getAllGroups(user.id);
                    setGroups(groupResponse.data || []);

                    if (groupResponse.data && groupResponse.data.length > 0) {
                        const groupIds = groupResponse.data.map((group: { _id: string }) => group._id);
                        const deviceResponse = await DeviceAPI.getDevicesByGroupIds(groupIds);
                        setDevices(deviceResponse.data || []);
                    } else {
                        setDevices([]);
                    }
                } catch (error) {
                    console.error('Error fetching groups or devices:', error);
                    setDevices([]);
                    setGroups([]);
                } finally {
                    setLoading(false);
                }
            }
        }

        getData();
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const deviceName = urlParams.get('deviceName');

        if (deviceName) {
            const selectedDevice = devices.find((dev) => dev.name === deviceName);
            if (selectedDevice) {
                setDevice({
                    name: selectedDevice.name,
                    newName: '', // Reset the newName field when switching devices
                    group: groups.find((g) => g._id === selectedDevice.groupID)?.name || '',
                    type: selectedDevice.type || '',
                    serialNumber: selectedDevice.serialNumber || '',
                    cycles: String(selectedDevice.cycles || ''),
                    condition: selectedDevice.condition || 'Good',
                    notes: selectedDevice.notes || '',
                    batteryPercentage: selectedDevice.batteryPercentage || 0,
                    wattage: selectedDevice.wattage || 0,
                    estimatedLife: selectedDevice.estimatedLife || 0,
                    estimatedCost: selectedDevice.estimatedCost || 0,
                    location: {
                        longitude: selectedDevice.location?.longitude || 0,
                        latitude: selectedDevice.location?.latitude || 0,
                    },
                });
            }
        }
    }, [location.search, devices, groups]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Update device selection
        if (name === 'name') {
            const selectedDevice = devices.find((dev) => dev.name === value);
            if (selectedDevice) {
                setDevice({
                    name: selectedDevice.name,
                    newName: '', // Reset the newName field when switching devices
                    group: groups.find((g) => g._id === selectedDevice.groupID)?.name || '',
                    type: selectedDevice.type || '',
                    serialNumber: selectedDevice.serialNumber || '',
                    cycles: String(selectedDevice.cycles || ''),
                    condition: selectedDevice.condition || 'Good',
                    notes: selectedDevice.notes || '',
                    batteryPercentage: selectedDevice.batteryPercentage || 0,
                    wattage: selectedDevice.wattage || 0,
                    estimatedLife: selectedDevice.estimatedLife || 0,
                    estimatedCost: selectedDevice.estimatedCost || 0,
                    location: {
                        longitude: selectedDevice.location?.longitude || 0,
                        latitude: selectedDevice.location?.latitude || 0,
                    },
                });
            }
        } else {
            setDevice((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleSave = async () => {
        if (!device.name || !device.group || !device.condition) {
            alert('Please fill all the required fields.');
            return;
        }

        try {
            const selectedDevice = devices.find((dev) => dev.name === device.name);
            if (!selectedDevice) {
                alert('Device not found.');
                return;
            }

            const selectedGroup = groups.find((group) => group.name === device.group);
            if (!selectedGroup) {
                alert('Selected group not found.');
                return;
            }

            const updatedDevice = {
                deviceID: selectedDevice._id,
                groupName: selectedGroup.name,
                groupID: selectedGroup._id,
                name: device.newName || device.name,
                type: device.type,
                serialNumber: device.serialNumber,
                cycles: Number(device.cycles),
                condition: device.condition,
                notes: device.notes,
                batteryPercentage: Number(device.batteryPercentage),
                wattage: Number(device.wattage),
                estimatedLife: Number(device.estimatedLife),
                estimatedCost: Number(device.estimatedCost),
                location: {
                    longitude: Number(device.location.longitude),
                    latitude: Number(device.location.latitude),
                },
            };

            const response = await DeviceAPI.updateDevice(updatedDevice);
            if (response.isError) {
                alert('Error updating device: ' + response.message);
            } else {
                alert('Device updated successfully!');
            }
        } catch (error) {
            console.error('Error updating device:', error);
            alert('Error updating device.');
        }
    };

    return (
        <div className="edit-device-container">
            <div className="header">
                <h1>Edit Device</h1>
                <button className="back-button" onClick={() => window.history.back()}>
                    &#x27A4;
                </button>
            </div>

            <form className="edit-device-form">
                <label>
                    Name
                    <select name="name" value={device.name} onChange={handleChange} required>
                        <option value="">Select Device</option>
                        {loading ? (
                            <option>Loading devices...</option>
                        ) : devices.length > 0 ? (
                            devices.map((deviceItem, index) => (
                                <option key={index} value={deviceItem.name}>
                                    {deviceItem.name}
                                </option>
                            ))
                        ) : (
                            <option>No devices available</option>
                        )}
                    </select>
                </label>

                <label>
                    New Name (optional)
                    <input
                        type="text"
                        name="newName"
                        value={device.newName}
                        onChange={handleChange}
                        placeholder="Enter a new name for the device"
                    />
                </label>

                <div className="group-type">
                    <label>
                        Group
                        <select name="group" value={device.group} onChange={handleChange} required>
                            <option value="">Select Group</option>
                            {groups.length > 0 ? (
                                groups.map((group, index) => (
                                    <option key={index} value={group.name}>
                                        {group.name}
                                    </option>
                                ))
                            ) : (
                                <option>No groups available</option>
                            )}
                        </select>
                    </label>

                    <label>
                        Device Type
                        <input type="text" name="type" value={device.type} readOnly />
                    </label>
                </div>

                <label>
                    Serial Number
                    <input type="text" name="serialNumber" value={device.serialNumber} readOnly />
                </label>

                <div className="cycles-condition">
                    <label>
                        Cycles
                        <input type="text" name="cycles" value={device.cycles} readOnly />
                    </label>

                    <label>
                        Condition
                        <select name="condition" value={device.condition} onChange={handleChange}>
                            <option value="Good">Good</option>
                            <option value="Average">Average</option>
                            <option value="Bad">Bad</option>
                        </select>
                    </label>
                </div>

                <label>
                    Notes
                    <textarea
                        name="notes"
                        value={device.notes}
                        onChange={handleChange}
                        placeholder="Add a description..."
                    ></textarea>
                </label>

                <button type="button" className="save-button" onClick={handleSave}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditDevice;
