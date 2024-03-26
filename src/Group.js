import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem } from '@mui/material';

const Group = () => {
const Header = () => {
    return (
        <header className="header" >
            <Typography variant="h4" align="center">Expense Tracker</Typography>
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="footer">
            <Typography variant="body2" align="center">&copy; 2024 Expense Tracker. All rights reserved.</Typography>
        </footer>
    );
};
// State to hold the groups
const [groups, setGroups] = useState([]);

// State to hold the selected group
const [selectedGroup, setSelectedGroup] = useState('');

// State to hold the input value for new group name
const [newGroupName, setNewGroupName] = useState('');

// Fetch data from groups.json when the component mounts
useEffect(() => {
    fetch('/data/groups.json')
        .then(response => response.json())
        .then(data => setGroups(data.Groups))
        .catch(error => console.error('Error fetching data:', error));
}, []);

// Function to handle form submission for adding a new group
const handleAddGroup = (event) => {
    event.preventDefault();
    const newGroup = {
        id: groups.length + 1, // Generate a new ID for the group
        name: newGroupName,
        person: [] // Initialize persons array for the new group
    };
    setGroups([...groups, newGroup]);
    setNewGroupName(''); // Clear the input field after adding the group
};

// Event handler for selecting a group from the dropdown list
const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
};

// Event handler for input change in the new group form
const handleNewGroupNameChange = (event) => {
    setNewGroupName(event.target.value);
};

return (
    <>
        <Header />
        <Container maxWidth="sm" className="container">
            <Typography variant="h2" align="center"style={{ marginBottom: '100px' }}>Group Form</Typography>

            <Typography variant="h4" align="center">Add New Group </Typography>
            <form onSubmit={handleAddGroup}>
                <TextField
                    label="Add New Group Name"
                    fullWidth
                    value={newGroupName}
                    onChange={handleNewGroupNameChange}
                />
                <div className="submitButtonContainer">
                    <Button variant="contained" color="primary" type="submit">Add Group</Button>
                </div>
            </form>


            <Typography variant="h4" align="center" className="styling">Select a Group:</Typography>
            <Select value={selectedGroup} onChange={handleGroupChange} fullWidth>
                <MenuItem value="">Select...</MenuItem>
                {groups.map(group => (
                    <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                ))}
            </Select>

            <Typography variant="h4" align="center" style={{ marginTop: '50px',marginBottom: '10px' }}>Selected Group:</Typography>
            <Typography align="center"style={{ marginBottom: '100px' }}>{selectedGroup ? `Selected Group ID: ${selectedGroup}` : 'No group selected'}</Typography>
        </Container>
        <Footer />
    </>
);
};
export default Group;