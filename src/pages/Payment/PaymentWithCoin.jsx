import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import AccountSettings from '@widgets/Admin/PaymentCoin';

const PaymentWithCoin = () => {

    const widgets = {
        settings: <AccountSettings/>,
    };

    return (
        <>
            <PageHeader title="Payment with Coin" />
            <br />

            <AppGrid id="settings" widgets={widgets} />
        </>
    );
};

export default PaymentWithCoin;
