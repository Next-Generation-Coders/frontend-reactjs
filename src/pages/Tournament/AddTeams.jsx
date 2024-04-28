import React from 'react'
import PageHeader from '@layout/PageHeader';
import AddTeamsWidget from '../../widgets/TournamentWidgets/AddingTeams/AddTeamsWidget'; 
import { useLocation } from 'react-router-dom';

const AddTeams = () => {
  const { state } = useLocation();
  const tournamentId = state.responseData.tournamentId;
  
  return (<>    
  
  <PageHeader title="Add Teams" />
    <AddTeamsWidget   tournamentId={tournamentId} />
   
</>

  )
}

export default AddTeams