import React from 'react';
import { useState } from 'react';
import { User, Calendar, Printer, Mail, Globe, MapPin, Building, Users } from 'lucide-react';
import RootLayout from '@/components/layouts/layout';

// Exemple de données pour la démonstration
const mockData = {
  ticketNumber: "TK-2024-001",
  requestType: "Création d'accès",
  userInfo: {
    firstName: "Prénom",
    lastName: "Nom",
    function: "Développeur",
    matricule: "EMP001",
    grade: "Senior",
    site: "Paris",
    department: "IT",
    agency: "Siège Social",
    manager: "Marie Martin",
    contractType: "CDI",
    profileImage: "/api/placeholder/150/150"
  },
  company: "GEMOJ",
  mobility: {
    region: "Oui",
    missionType: "Récurrente"
  },
  history: [
    {
      name: "Nom",
      function: "Manager IT",
      service: "IT",
      date: "2024-03-19",
      comment: "Validé - Profile conforme"
    },
    {
      name: "Nom",
      function: "RH",
      service: "Ressources Humaines",
      date: "2024-03-18",
      comment: "Documents vérifiés"
    }
  ]
};

const AccessRequestForm = () => {
  const [formData, setFormData] = useState(mockData);
  
  return (
    <RootLayout>
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
        {/* Header */}
        <div className="text-center py-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">Demande D'Accès</h1>
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-center space-x-6 p-6 border-b">
          <div className="relative">
            <img
              src={formData.userInfo.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">{formData.company}</h2>
          </div>
        </div>

        {/* Main Form */}
        <div className="p-6 space-y-8">
          {/* Identification Section */}
          <section className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Identification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Numéro du ticket</label>
                <div className="flex items-center p-2 bg-gray-50 rounded border">
                  {formData.ticketNumber}
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Type de demande</label>
                <div className="flex items-center p-2 bg-gray-50 rounded border">
                  {formData.requestType}
                </div>
              </div>
              {/* Autres champs d'identification */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Nom et Prénom</label>
                <div className="flex items-center p-2 bg-gray-50 rounded border">
                  {`${formData.userInfo.firstName} ${formData.userInfo.lastName}`}
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Fonction</label>
                <div className="flex items-center p-2 bg-gray-50 rounded border">
                  {formData.userInfo.function}
                </div>
              </div>
            </div>
          </section>

          {/* Mobilité Section */}
          <section className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Mobilité
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Région</label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      name="region"
                      checked={formData.mobility.region === "Oui"}
                      readOnly
                    />
                    <span className="ml-2">Oui</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      name="region"
                      checked={formData.mobility.region === "Non"}
                      readOnly
                    />
                    <span className="ml-2">Non</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Services Bureautique et Téléphonique
            </h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox text-blue-600" />
                  <span className="ml-2">Impressions</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox text-blue-600" />
                  <span className="ml-2">Photocopie</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox text-blue-600" />
                  <span className="ml-2">Scan réseau</span>
                </label>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Nom de l'imprimante</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Nom de l'imprimante"
                />
              </div>
            </div>
          </section>

          {/* Historique Section */}
          <section className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Historique des validations
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fonction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commentaire</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.history.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.function}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-gray-50 flex justify-between items-center rounded-b-lg">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Rejeter
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
    </RootLayout>
  );
};

export default AccessRequestForm;