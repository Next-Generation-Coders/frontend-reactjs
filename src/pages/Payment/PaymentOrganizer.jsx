import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import AccountSettings from '@widgets/Admin/PaymentSettings';

const PaymentOrganizer = () => {
 
  const widgets = {
    settings: <AccountSettings/>,
  };

  return (
    <>
      <PageHeader title="Payment" />
      <br />
      <br /><br />
        <br />
   
      <AppGrid id="settings" widgets={widgets} />
    </>
  );
};

export default PaymentOrganizer;
