// components
import PageHeader from '@layout/PageHeader';
import EventsCalendar from '@widgets/EventsCalendar';
import AffichageCrud from '@widgets/Admin/AffichageCrud';

const Organizer = () => {
    return (
        <>
            <PageHeader title="List of Organizer" />
            <AffichageCrud/>
        </>
    )
}

export default Organizer