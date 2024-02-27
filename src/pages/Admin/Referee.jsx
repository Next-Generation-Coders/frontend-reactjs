// components
import PageHeader from '@layout/PageHeader';
import EventsCalendar from '@widgets/EventsCalendar';
import AffichageCrud from '@widgets/Admin/AffichageCrud';

const Referee = () => {
    return (
        <>
            <PageHeader title="List of Referee" />
            <AffichageCrud/>
        </>
    )
}

export default Referee