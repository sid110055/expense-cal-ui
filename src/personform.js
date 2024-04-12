import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Select, MenuItem, TextField } from '@mui/material';

function PersonForm() {
    const [personData, setPersonData] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState([]);
    const [showAddPersonForm, setShowAddPersonForm] = useState(false);
    const [nextId, setNextId] = useState(1);

    useEffect(() => {
        fetch('./data/persons.json')
            .then(response => response.json())
            .then(data => {
                setPersonData(data);
                const maxId = data.reduce((max, p) => p.id > max ? p.id : max, 0);
                setNextId(maxId + 1);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSelectPerson = (event) => {
        const selectedId = event.target.value;
        if (selectedId === "all") {
            setSelectedPerson(personData);
        } else {
            const person = personData.find(person => person.id === parseInt(selectedId, 10));
            setSelectedPerson([person]); // Ensure it's an array for consistency
        }
    };

    const handleAddPersonClick = () => {
        setShowAddPersonForm(true);
    };

    const handleAddPerson = (newPersonDetails) => {
        const newPerson = { ...newPersonDetails, id: nextId };
        const updatedPersons = [...personData, newPerson];
        setPersonData(updatedPersons);
        setNextId(nextId + 1);
        setSelectedPerson([newPerson]); // Ensure it's an array for consistency
        setShowAddPersonForm(false);
    };

    return (
        <>
            {showAddPersonForm ? (
                <AddPersonForm onAddPerson={handleAddPerson} onCancel={() => setShowAddPersonForm(false)} />
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                    <Button variant="contained" color="primary" onClick={handleAddPersonClick}>Add a New Person</Button>
                </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>
                <Typography variant="h5" gutterBottom>Select a Person:</Typography>
                <Select
                    value={selectedPerson.length > 1 ? "all" : selectedPerson.map(p => p.id).toString()}
                    onChange={handleSelectPerson}
                    variant="outlined"
                    margin="normal"
                    style={{ width: '200px', marginBottom: '20px' }}
                >
                    <MenuItem key="all" value="all">All</MenuItem>
                    {personData.map(person => (
                        <MenuItem key={person.id} value={person.id}>{person.name}</MenuItem>
                    ))}
                </Select>
                {selectedPerson && selectedPerson.length > 0 && <PersonDetails persons={selectedPerson} />}
            </Box>
        </>
    );
}

function AddPersonForm({ onAddPerson, onCancel }) {
    const [newPersonDetails, setNewPersonDetails] = useState({ name: '', user_name: '', pwd: '', expenses: [] });

    const handleChange = (prop) => (event) => {
        setNewPersonDetails({ ...newPersonDetails, [prop]: event.target.value });
    };

    const handleAddClick = () => {
        onAddPerson(newPersonDetails);
        setNewPersonDetails({ name: '', user_name: '', pwd: '', expenses: [] }); // Reset the form
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>
            <Typography variant="h5" gutterBottom>Add a New Person:</Typography>
            <TextField label="Name" variant="outlined" value={newPersonDetails.name} onChange={handleChange('name')} margin="normal" />
            <TextField label="User Name" variant="outlined" value={newPersonDetails.user_name} onChange={handleChange('user_name')} margin="normal" />
            <TextField label="Password" type="password" variant="outlined" value={newPersonDetails.pwd} onChange={handleChange('pwd')} margin="normal" />
            <Button variant="contained" color="primary" onClick={handleAddClick}>Add Person</Button>
            <Button variant="contained" onClick={onCancel} style={{ marginLeft: '10px' }}>Cancel</Button>
        </Box>
    );
}

function PersonDetails({ persons }) {
    return (
        <div>
            {persons.map(person => (
                <Box key={person.id} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', '& > *': { margin: '8px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' } }}>
                    <Typography variant="h6">ID: {person.id}</Typography>
                    <Typography variant="h6">Name: {person.name}</Typography>
                    <Typography variant="h6">User Name: {person.user_name}</Typography>
                    <Typography variant="h6">Password: {person.pwd}</Typography>
                    <Typography variant="h6">Expenses: {/* Here you could map over the expenses if you want to display them */}</Typography>
                </Box>
            ))}
        </div>
    );
}

export default PersonForm;
