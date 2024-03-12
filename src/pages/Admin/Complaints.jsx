// components
import PageHeader from '@layout/PageHeader';
import EventsCalendar from '@widgets/EventsCalendar';
import AffichageCrud from '@widgets/Admin/AffichageComplaint';

const Complaints = () => {
    return (
        <>
            <PageHeader title="List of Complaints" />
            <AffichageCrud/>
        </>
    )
}

export default Complaints