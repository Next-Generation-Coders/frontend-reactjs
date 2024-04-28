import React from 'react'
import PageHeader from '@layout/PageHeader';
import ListTournament from '@widgets/TournamentWidgets/TournamentList';



const TournamentList = () => {
    return (<>

            <PageHeader title="Tournament List" />
            <ListTournament   />
        </>

    )
}

export default TournamentList