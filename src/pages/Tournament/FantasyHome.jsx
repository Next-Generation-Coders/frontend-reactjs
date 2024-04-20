
import PageHeader from '@layout/PageHeader'
import FantasyTeam from '@widgets/FantasyWidgets/FantasyTeam'
import React from 'react'
import "../../widgets/FantasyWidgets/styles/index.css";
import "../../widgets/FantasyWidgets/styles/search.css";
import "../../widgets/FantasyWidgets/styles/scrollbar.css";
import "../../widgets/FantasyWidgets/styles/progressbar.css";
const FantasyHome = () => {
 
   return (<>    
  
  <PageHeader title="Fantasy Home" />
   <FantasyTeam/>
</>
  )
}

export default FantasyHome