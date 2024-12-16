import React from 'react';

const MainDashboard: React.FC = () => {
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
     
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
        {/* Contenu des statistiques */}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Projets Récents</h2>
        {/* Liste des projets */}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        {/* Liste des notifications */}
      </div>
      
    </div>
  );
};

export default MainDashboard;