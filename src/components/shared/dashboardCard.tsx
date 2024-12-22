interface CardProps {
    icon: React.ElementType;
    label: string;
    value: string | number;
    color?: string;
    bottomColor?: string;
    description?: string;
}
export const DashboardCard: React.FC<CardProps> = ({
    icon: Icon,
    label,
    value,
    description = "",
    color = 'bg-blue-50',
    bottomColor = 'bg-blue-500'
}) => {
    return (

        <div className={`relative w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl ${color}`}>
            <div className="p-6 h-full flex items-center justify-between">
                <div className="flex flex-col space-y-2">
                    <div className="text-3xl font-bold text-gray-800 tracking-tight">{value}</div>
                    <div className="text-sm text-gray-600 font-semibold uppercase tracking-wider">{label}</div>
                    {description && (
                        <div className="text-xs text-gray-500 mt-1">{description}</div>
                    )}
                </div>

                <div className="bg-blue-500 bg-opacity-20 rounded-full p-3 shadow-md">
                    <Icon className="w-10 h-10 text-blue-600" strokeWidth={2} />
                </div>
            </div>

            <div className={`absolute bottom-0 left-0 right-0 h-1 ${bottomColor}`}></div>
        </div>


    );
};