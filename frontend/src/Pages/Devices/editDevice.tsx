import React, { useState } from 'react';
import "./editDevice.css";

const EditDevice = () => {
    const [device, setDevice] = useState({
        name: 'Example Device',
        group: 'Group 1',
        type: 'Type 1', // Dummy data, non-editable
        serialNumber: 'SN123456789', // Dummy data, non-editable
        cycles: '150', // Dummy data, non-editable
        condition: 'Good',
        notes: 'This is a sample description.'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDevice(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = () => {
        // Validate the input fields
        if (!device.name || !device.group || !device.condition) {
            alert('Please fill all the required fields.');
            return;
        }

        // Add the save logic here (e.g., send data to an API or save it locally)
        console.log('Device updated:', device);
        alert('Device updated successfully!');
    };

    return (
        <div className="edit-device-container">
            <div className="header">
                <h1>Edit Device</h1>
                <button className="back-button" onClick={() => window.history.back()}>&#x27A4;</button>
            </div>

            <form className="edit-device-form">
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
                            <option value="Group 1">Group 1</option>
                            <option value="Group 2">Group 2</option>
                        </select>
                    </label>

                    <label>
                        Device Type
                        <input
                            type="text"
                            name="type"
                            value={device.type}
                            readOnly
                        />
                    </label>
                </div>

                <label>
                    Serial Number
                    <input
                        type="text"
                        name="serialNumber"
                        value={device.serialNumber}
                        readOnly
                    />
                </label>

                <div className="cycles-condition">
                    <label>
                        Cycles
                        <input
                            type="text"
                            name="cycles"
                            value={device.cycles}
                            readOnly
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

export default EditDevice;
