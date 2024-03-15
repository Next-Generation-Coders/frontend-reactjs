import React, { useState } from 'react';

import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import AccountSettings from '@widgets/Complaint';


const AboutUs = () => {
    const widgets = {
        settings: <AccountSettings/>,
      };
    


  return (
    <>
      <PageHeader title="About us" />
      <br />
      <br /><br />
   
      <AppGrid id="settings" widgets={widgets} />
    </>
  );
};
export default AboutUs;
