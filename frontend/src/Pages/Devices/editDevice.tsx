import React, { useState, useEffect } from 'react';
import './editDevice.css';
import { GroupAPI } from '../../APIs/Group';
import { DeviceAPI } from '../../APIs/Devices';

const EditDevice: React.FC = () => {
    const [device, setDevice] = useState({
        name: '',
        group: '',
        type: 'Type 1',
        serialNumber: 'SN123456789',
        cycles: '150',
        condition: 'Good',
        notes: 'This is a sample description.',
    });

    const [devices, setDevices] = useState<{ name: string; _id: string }[]>([]);
    const [groups, setGroups] = useState<{ name: string; _id: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const user = JSON.parse(localStorage.getItem('user') as string);

            if (user) {
                try {
                    // Fetch groups for the logged-in user
                    const groupResponse = await GroupAPI.getAllGroups(user.id);
                    console.log('Group response:', groupResponse);
                    setGroups(groupResponse.data || []);

                    // Get devices associated with the fetched groups
                    if (groupResponse.data && groupResponse.data.length > 0) {
                        const groupIds = groupResponse.data.map((group: { _id: string }) => group._id);
                        console.log('Fetching devices for group IDs:', groupIds);
                        const deviceResponse = await DeviceAPI.getDevicesByGroupIds(groupIds);
                        console.log('Device response:', deviceResponse);
                        setDevices(deviceResponse.data || []);  // Adjust based on the response structure
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDevice((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSave = () => {
        if (!device.name || !device.group || !device.condition) {
            alert('Please fill all the required fields.');
            return;
        }

        console.log('Device updated:', device);
        alert('Device updated successfully!');
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
                    <select
                        name="name"
                        value={device.name}
                        onChange={handleChange}
                        required
                    >
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

                <div className="group-type">
                    <label>
                        Group
                        <select
                            name="group"
                            value={device.group}
                            onChange={handleChange}
                            required
                        >
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
