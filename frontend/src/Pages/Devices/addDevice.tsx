import React, { useState } from 'react';
import "./addDevice.css";

const AddDevice = () => {
    const [device, setDevice] = useState({
        name: '',
        group: '',
        type: '',
        serialNumber: '',
        cycles: '',
        condition: '',
        notes: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDevice(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = () => {
        // Validate the input fields
        if (!device.name || !device.group || !device.type || !device.serialNumber) {
            alert('Please fill all the required fields.');
            return;
        }

        // Add the save logic here (e.g., send data to an API or save it locally)
        console.log('Device saved:', device);
        alert('Device added successfully!');
        // Reset the form
        setDevice({
            name: '',
            group: '',
            type: '',
            serialNumber: '',
            cycles: '',
            condition: '',
            notes: ''
        });
    };

    return (
        <div className="add-device-container">
            <div className="header">
                <h1>Add Device</h1>
                <button className="back-button" onClick={() => window.history.back()}>➜</button>
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
                            <option value="Group 1">Group 1</option>
                            <option value="Group 2">Group 2</option>
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
                            <option value="">Select type</option>
                            <option value="Type 1">Type 1</option>
                            <option value="Type 2">Type 2</option>
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
                            <option value="">Select condition</option>
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
