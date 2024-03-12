import React, { useState } from 'react';

const TournamentAccessSelector = ({ onSelectAccess }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);


  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
    onSelectAccess(status); // Pass the selected value to the parent component
};

  return (
    
  <div><label style={{ marginRight: '10px' }}>Tournament Match Type</label>
    <div className=" justify-center space-x-4">

        
      <label style={{ marginRight: '10px', borderRadius: '15px' }} className={`btn ${selectedStatus === 'Private' ? 'active' : ''}`}>
        <input
          type="checkbox"
          checked={selectedStatus === 'Private'}
          onChange={() => handleSelectStatus('Private')}
          style={{ display: 'none' }} // Hide the checkbox
        />
        Private
      </label>
      <label style={{ marginRight: '10px', borderRadius: '15px' }} className={`btn ${selectedStatus === 'Public' ? 'active' : ''}`}>
        <input
          type="checkbox"
          checked={selectedStatus === 'Public'}
          onChange={() => handleSelectStatus('Public')}
          style={{ display: 'none' }} // Hide the checkbox
        />
        Public
      </label>
      
    </div>
    </div>
 
  );
};

export default TournamentAccessSelector;
