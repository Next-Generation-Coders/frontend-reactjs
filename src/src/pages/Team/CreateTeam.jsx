// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';

import TeamSettings from '@widgets/Team/TeamSettings';


const widgets = {
    
   // description: <ProfileDescription/>,
    settings: <TeamSettings/>,
   
}

const CreateTeam = () => {
    return (
        <>
            <PageHeader title="Create Team" />
            <AppGrid id="settings" widgets={widgets}/>
        </>
    )
}

export default CreateTeam