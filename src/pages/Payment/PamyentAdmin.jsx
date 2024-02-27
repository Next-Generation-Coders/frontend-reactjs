// components
import PageHeader from '@layout/PageHeader';
import EventsCalendar from '@widgets/EventsCalendar';
import AffichagePayment from '@widgets/Admin/AffichagePayment';

const PaymentAdmin = () => {
    return (
        <>
            <PageHeader title="List of Payment" />
            <AffichagePayment/>
        </>
    )
}

export default PaymentAdmin