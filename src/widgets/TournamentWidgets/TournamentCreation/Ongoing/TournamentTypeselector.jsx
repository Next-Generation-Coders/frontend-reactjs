import React, { useState } from 'react';

const TournamentStatusSelector = ({ onSelectTournamentType }) => {
    const [selectedStatus, setSelectedStatus] = useState(null);


    const handleSelectStatus = (status) => {
      setSelectedStatus(status);
      onSelectTournamentType(status); // Pass the selected value to the parent component
  };
  return (<div><label>Tournament Type</label>
    <div style={{paddingLeft:"30%"}}>

        
      <label style={{ marginRight: '10px', borderRadius: '15px', marginTop :'5px' }} className={`btn ${selectedStatus === 'Knockout' ? 'active' : ''}`}>
        <input
          type="checkbox"
          checked={selectedStatus === 'Knockout'}
          onChange={() => handleSelectStatus('Knockout')}
          style={{ display: 'none' }} // Hide the checkbox
        />
        Knockout
      </label>
      <label style={{ marginRight: '10px', borderRadius: '15px', marginTop :'5px' }} className={`btn ${selectedStatus === 'League' ? 'active' : ''}`}>
        <input
          type="checkbox"
          checked={selectedStatus === 'League'}
          onChange={() => handleSelectStatus('League')}
          style={{ display: 'none' }} // Hide the checkbox
        />
        League
      </label>
      <label style={{ marginRight: '10px', borderRadius: '15px', marginTop :'5px' }} className={`btn ${selectedStatus === 'Championship' ? 'active' : ''}`}>
        <input
          type="checkbox"
          checked={selectedStatus === 'Championship'}
          onChange={() => handleSelectStatus('Championship')}
          style={{ display: 'none' }} // Hide the checkbox
        />
        Championship
      </label>
    </div>
    </div>
  );
};

export default TournamentStatusSelector;
