import React from 'react'
import PageHeader from '@layout/PageHeader';
import AddTeamsWidget from '../../widgets/TournamentWidgets/AddingTeams/AddTeamsWidget'; 


const AddTeams = () => {
  return (<>    
  
  <PageHeader title="Add teams to your tournament" />
    <AddTeamsWidget/>
</>

  )
}

export default AddTeams