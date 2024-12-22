import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

export const BarPie: React.FC = ({ }) => {
    return (
        <div className="bg-white rounded-2xl p-4 w-full">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Répartition des Accès</h2>
            <div className="flex justify-center items-center w-full">
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['GEMOJ', 'TIMONI', 'KISSAIE', 'DOCKER', 'TOMCARD'] }]}
                    series={[{ data: [102, 35, 10, 5, 50] }]}
                    width={650}
                    height={300}
                />
            </div>
        </div>
    );
}

// Types pour les données de localisation



export const BasicPie: React.FC = ({ }) => {
    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: 10, label: 'series A' },
                        { id: 1, value: 15, label: 'series B' },
                        { id: 2, value: 20, label: 'series C' },
                    ],
                },
            ]}
            width={400}
            height={200}
        />
    );
}