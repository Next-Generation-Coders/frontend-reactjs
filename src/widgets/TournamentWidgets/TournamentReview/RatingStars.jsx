
import  React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
export default function BasicRating({selectedTournamentId}) {
  
  const [value, setValue] = useState(2);

  const handleRatingChange = async (event, newValue) => {
    setValue(newValue);
    
    try {
      const response = await fetch(`http://localhost:3000/Tournament/addRate/${selectedTournamentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rate: newValue }),
      });
      if (!response.ok) {
        throw new Error('Failed to add rate');
      }
      console.log('Rate added successfully');
    } catch (error) {
      console.error('Error adding rate:', error);
    }
  };

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={handleRatingChange}
        
      />
     
    </Box>
  );
}