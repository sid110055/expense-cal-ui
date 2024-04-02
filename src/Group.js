import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem, List, ListItem, ListItemText, IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    fetch('/data/groups.json')
      .then(response => response.json())
      .then(data => setGroups(data.Groups))
      .catch(error => console.error('Error fetching groups:', error));

    fetch('/data/persons.json')
      .then(response => response.json())
      .then(data => setPersons(data))
      .catch(error => console.error('Error fetching persons:', error));
  }, []);

  const handleAddGroup = (event) => {
    event.preventDefault();
    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      persons: []
    };
    setGroups([...groups, newGroup]);
    setNewGroupName('');
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleNewGroupNameChange = (event) => {
    setNewGroupName(event.target.value);
  };

  const addPersonToGroup = (personId) => {
    const newGroups = groups.map(group => {
      if (group.id === Number(selectedGroup)) {
        return { ...group, persons: [...group.persons, personId] };
      }
      return group;
    });
    setGroups(newGroups);
  };

  const removePersonFromGroup = (personId) => {
    const newGroups = groups.map(group => {
      if (group.id === Number(selectedGroup)) {
        return { ...group, persons: group.persons.filter(id => id !== personId) };
      }
      return group;
    });
    setGroups(newGroups);
  };

  const findPersonNameById = (id) => {
    const person = persons.find(person => person.id === id);
    return person ? person.name : 'Unknown';
  };

  const selectedGroupDetails = groups.find(group => group.id === Number(selectedGroup));

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h2" align="center" style={{ marginBottom: '100px' }}>Group Form</Typography>

      <Typography variant="h4" align="center">Add New Group</Typography>
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

      {selectedGroup && (
        <>
          <Typography variant="h4" align="center" style={{ marginTop: '50px', marginBottom: '10px' }}>
            Selected Group: {selectedGroupDetails?.name} (ID: {selectedGroupDetails?.id})
          </Typography>

          <List>
            {selectedGroupDetails?.persons.map(personId => (
              <ListItem key={personId} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => removePersonFromGroup(personId)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              }>
                <ListItemText primary={findPersonNameById(personId)} />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" align="center" style={{ margin: '20px 0' }}>Add Person to Group:</Typography>
          <Select fullWidth value="" onChange={(e) => addPersonToGroup(Number(e.target.value))}>
            <MenuItem value="">Select Person...</MenuItem>
            {persons.filter(person => !selectedGroupDetails.persons.includes(person.id)).map(person => (
              <MenuItem key={person.id} value={person.id}>{person.name}</MenuItem>
            ))}
          </Select>
        </>
      )}
    </Container>
  );
};

export default Group;
