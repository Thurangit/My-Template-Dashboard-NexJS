import React from 'react';
import RootLayout from '../layouts/layout';
import MainDashboard from '../components/mainDashboard';
const Index: React.FC = () => {
  return (
    <RootLayout>
      <MainDashboard />
    </RootLayout>
  );
};

export default Index;