import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Select, MenuItem } from '@mui/material';

function PersonForm() {
  const [personData, setPersonData] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetch('./data/persons.json')
      .then(response => response.json())
      .then(data => setPersonData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
  const handleSelectPerson = (event) => {
    const selectedId = event.target.value;
    const person = personData.find(person => person.id === selectedId);
    setSelectedPerson(person);
  };

  return (
    <>
        <Header />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Select a Person:
      </Typography>
      <Select
        value={selectedPerson ? selectedPerson.id : ''}
        onChange={handleSelectPerson}
        variant="outlined"
        margin="normal"
        style={{ width: '200px', marginBottom: '20px' }}
      >
        {personData.map(person => (
          <MenuItem key={person.id} value={person.id}>
            {person.name}
          </MenuItem>
        ))}
      </Select>
      {selectedPerson && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              margin: '10px',
              maxWidth: '200px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              ID: {selectedPerson.id}
            </Typography>
          </Box>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              margin: '10px',
              maxWidth: '200px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Name: {selectedPerson.name}
            </Typography>
          </Box>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              margin: '10px',
              maxWidth: '200px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              User Name: {selectedPerson.user_name}
            </Typography>
          </Box>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              margin: '10px',
              maxWidth: '200px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Password: {selectedPerson.pwd}
            </Typography>
          </Box>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              margin: '10px',
              maxWidth: '200px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Expenses:
            </Typography>
            {selectedPerson.expenses.map((expense, index) => (
              <Typography key={index} variant="body1">
                {/* Render individual expense details here */}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Box>
    <Footer />
    </>
  );
}

export default PersonForm;
