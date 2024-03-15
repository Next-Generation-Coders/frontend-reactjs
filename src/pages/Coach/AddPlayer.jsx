// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';

import AddPlayerOverview from '@widgets/Coach/Player/AddPlayer';


const widgets = {
    
   // description: <ProfileDescription/>,
    settings: <AddPlayerOverview/>,
   
}

const AddPlayer = () => {
    return (
        <>
            <PageHeader title="Add/Modify Team" />
            <AppGrid id="Test" widgets={widgets}/>
        </>
    )
}

export default AddPlayer