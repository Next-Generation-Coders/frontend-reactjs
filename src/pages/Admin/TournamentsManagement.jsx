import AppGrid from '@layout/AppGrid';
import PageHeader from '@layout/PageHeader'
import TournamentAdminDisplay from '@widgets/TournamentWidgets/AdminTournamentDisplay/TournamentAdminDisplay'
import TournamentsTypes from '@widgets/TournamentWidgets/AdminTournamentDisplay/TournamentsTypesCounter';
import React, { useEffect, useState } from 'react'

const TournamentList = () => {
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
      const fetchTournamentDetails = async () => {
          try {
              const response = await fetch(`http://localhost:3000/Tournament/getbyid/65fd1d5fa662c44a0912a23c`);
              if (!response.ok) {
                  throw new Error('Failed to fetch tournament details');
              }
              const data = await response.json();
              setTournament(data);
          } catch (error) {
              console.error(error);
          }
      };

      fetchTournamentDetails();
  }, []);

  const widgets = {
   // segment_chart:<TournamentsTypes />,
    live_matches: <TournamentAdminDisplay/>,

}

  return (
    <>
            <PageHeader title="List of Tournaments" />
            <AppGrid id="championships" widgets={widgets} />
        </>
            
        
  )
}

export default TournamentList