import React, { useState, useEffect } from 'react';
import './addDevice.css';
import { GroupAPI } from '../../APIs/Group';
import { DeviceAPI } from '../../APIs/Devices';

const AddDevice: React.FC = () => {
    const [device, setDevice] = useState({
        name: '',
        group: '',
        type: 'Type 1', // Default type
        serialNumber: '',
        cycles: '',
        condition: 'Good', // Default condition
        notes: '',
        batteryPercentage: 100,
        wattage: 0,
        estimatedLife: 0,
        estimatedCost: 0,
        location: {
            longitude: 0,
            latitude: 0
        }
    });

    const [groups, setGroups] = useState<{ name: string; _id: string }[]>([]);
    const [loading, setLoading] = useState(true);

    const availableTypes = ['Powerbank', 'Phone', 'Vehicle', 'Tablet,','iPhone', 'iPad','Flashlight', 'Misc']; // Available device types

    useEffect(() => {
        async function fetchGroups() {
            const user = JSON.parse(localStorage.getItem('user') as string);

            if (user) {
                try {
                    const response = await GroupAPI.getAllGroups(user._id || user.id);
                    setGroups(response.data || []);
                } catch (error) {
                    console.error('Error fetching groups:', error);
                    setGroups([]);
                } finally {
                    setLoading(false);
                }
            }
        }

        fetchGroups();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDevice((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSave = async () => {
        if (!device.name || !device.group || !device.type || !device.serialNumber) {
            alert('Please fill all the required fields.');
            return;
        }

        try {
            const selectedGroup = groups.find(group => group.name === device.group);
            if (!selectedGroup) {
                alert('Selected group not found.');
                return;
            }

            const newDevice = {
                name: device.name,
                groupID: selectedGroup._id,
                groupName: selectedGroup.name,
                type: device.type,
                serialNumber: device.serialNumber,
                cycles: Number(device.cycles) || 0,
                condition: device.condition,
                notes: device.notes,
                batteryPercentage: device.batteryPercentage,
                wattage: device.wattage,
                estimatedLife: device.estimatedLife,
                estimatedCost: device.estimatedCost,
                location: {
                    longitude: device.location.longitude,
                    latitude: device.location.latitude
                }
            };

            const response = await DeviceAPI.createDevice(newDevice);

            if (response.isError) {
                alert('Error adding device: ' + response.message);
            } else {
                alert('Device added successfully!');
                setDevice({
                    name: '',
                    group: '',
                    type: 'Type 1',
                    serialNumber: '',
                    cycles: '',
                    condition: 'Good',
                    notes: '',
                    batteryPercentage: 100,
                    wattage: 0,
                    estimatedLife: 0,
                    estimatedCost: 0,
                    location: {
                        longitude: 0,
                        latitude: 0
                    }
                });
            }
        } catch (error) {
            console.error('Error adding device:', error);
            alert('Error adding device.');
        }
    };

    return (
        <div className="add-device-container">
            <div className="header">
                <h1>Add Device</h1>
                <button className="back-button" onClick={() => window.history.back()}>&#x27A4;</button>
            </div>

            <form className="add-device-form">
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={device.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </label>

                <div className="group-type">
                    <label>
                        Group
                        <select
                            name="group"
                            value={device.group}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select group</option>
                            {loading ? (
                                <option>Loading groups...</option>
                            ) : groups.length > 0 ? (
                                groups.map((group) => (
                                    <option key={group._id} value={group.name}>
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
                        <select
                            name="type"
                            value={device.type}
                            onChange={handleChange}
                            required
                        >
                            {availableTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <label>
                    Serial Number
                    <input
                        type="text"
                        name="serialNumber"
                        value={device.serialNumber}
                        onChange={handleChange}
                        placeholder="Serial number"
                        required
                    />
                </label>

                <div className="cycles-condition">
                    <label>
                        Cycles
                        <input
                            type="number"
                            name="cycles"
                            value={device.cycles}
                            onChange={handleChange}
                            placeholder="Cycles"
                        />
                    </label>

                    <label>
                        Condition
                        <select
                            name="condition"
                            value={device.condition}
                            onChange={handleChange}
                        >
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

export default AddDevice;
