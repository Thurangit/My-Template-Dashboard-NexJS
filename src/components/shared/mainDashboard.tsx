import React from 'react';
import ChartsOverviewDemo from '../chart/statiticUser';
import StatisticProject from '../chart/statisticProject';
import StatisticCompany from '../chart/statisticCompany';

const MainDashboard: React.FC = () => {
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
     
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
        <ChartsOverviewDemo/>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Utilisateurs par projet</h2>
        <br/><br/>
        <StatisticProject/>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Utilisateurs par société</h2>
       <StatisticCompany/>
      </div>
      
    </div>
  );
};

export default MainDashboard;