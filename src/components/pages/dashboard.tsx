import React from 'react';
import RootLayout from '../layouts/layout';
import MainDashboard from '../shared/mainDashboard';
const Dashboard: React.FC = () => {
  return (
    <RootLayout>
      <MainDashboard />
    </RootLayout>
  );
};

export default Dashboard;