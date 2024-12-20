import React from 'react';
import RootLayout from '../layouts/layout';
import MainDashboard from '../shared/mainDashboard';
import Breadcrumb from '../shared/breadcrumbs';
import MainNextDashboard from './dashboard/nexDashboard';
import AccessRequestPage from './requests/confirmation';
import AccessRequestForm from './requests/confirmation';


const Dashboard: React.FC = () => {
  
  return (
    <RootLayout>
      <Breadcrumb/>
      <MainNextDashboard />
    </RootLayout>
  );
};

export default Dashboard;