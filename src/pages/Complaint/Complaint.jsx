// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';

import ComplaintSettings from '@widgets/Refree/ComplaintSettings';


const widgets = {
    
   // description: <ProfileDescription/>,
    settings: <ComplaintSettings/>,
   
}

const Complaint = () => {
    return (
        <>
            <PageHeader title="Complaint" />
            <AppGrid id="settings" widgets={widgets}/>
        </>
    )
}

export default Complaint