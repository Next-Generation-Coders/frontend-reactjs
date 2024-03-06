import React, { useState } from 'react';

const TournamentFORCSelector = ({ onSelecttournamentType }) => {
    const [selectedStatus, setSelectedStatus] = useState(null);


    const handleSelectStatus = (status) => {
      setSelectedStatus(status);
      onSelecttournamentType(status); // Pass the selected value to the parent component
  };

  return (<div><label>Tournament Match Type</label>
    <div className="justify-center space-x-4 ">

        
      <label style={{ marginRight: '10px', borderRadius: '15px' }} className={`btn ${selectedStatus === 'Friendly' ? 'active' : ''}`}>
        <input
          type="checkbox"
          checked={selectedStatus === 'Friendly'}
          onChange={() => handleSelectStatus('Friendly')}
          style={{ display: 'none' }} // Hide the checkbox
        />
        Friendly
      </label>
      <label style={{ marginRight: '10px', borderRadius: '15px' }} className={`btn ${selectedStatus === 'Competitive' ? 'active' : ''}`}>
        <input
          type="checkbox"
          checked={selectedStatus === 'Competitive'}
          onChange={() => handleSelectStatus('Competitive')}
          style={{ display: 'none' }} // Hide the checkbox
        />
        Competitive
      </label>
      
    </div>
    </div>
  );
};

export default TournamentFORCSelector;
