// components
import PageHeader from '@layout/PageHeader';
import EventsCalendar from '@widgets/EventsCalendar';
import AffichageCrud from '@widgets/Admin/AffichageCrud';

const Team = () => {
    return (
        <>
            <PageHeader title="List of Team" />
            <AffichageCrud/>
        </>
    )
}

export default Team