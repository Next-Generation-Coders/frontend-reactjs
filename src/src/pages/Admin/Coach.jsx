// components
import PageHeader from '@layout/PageHeader';
import EventsCalendar from '@widgets/EventsCalendar';
import AffichageCrud from '@widgets/Admin/AffichageCrud';

const Coach = () => {
    return (
        <>
            <PageHeader title="List of Coach" />
            <AffichageCrud/>
        </>
    )
}

export default Coach