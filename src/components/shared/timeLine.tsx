import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';


// Type definition for timeline item
export interface TimelineItemProps {
    label: string;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    variant?: 'filled' | 'outlined';
    description?: string;
}

// Type definition for timeline component props
interface DynamicTimelineProps {
    items: TimelineItemProps[];
    position?: 'left' | 'right';
    className?: string;
    dotClassName?: string;
    contentClassName?: string;
}

export const DynamicTimeline: React.FC<DynamicTimelineProps> = ({
    items,
    position = 'right',
    className = '',
    dotClassName = '',
    contentClassName = ''
}) => {
    return (
        <div className="bg-white rounded-2xl p-4 w-full">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Dernières activités</h2>

            <Timeline
                className={`w-full ${className}`}
                sx={{
                    [`& .MuiTimelineItem-root:before`]: {
                        flex: 0,
                        padding: 0,
                    },
                }}
            >
                {items.map((item, index) => (
                    <TimelineItem
                        key={index}
                        className={`${position === 'left' ? 'flex-row-reverse' : ''}`}
                    >
                        <TimelineSeparator>
                            <TimelineDot
                                color={item.color || 'primary'}
                                variant={item.variant || 'filled'}
                                className={dotClassName}
                            />
                            {index < items.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent
                            className={`py-4 px-4 ${position === 'right' ? 'text-right' : 'text-right'} ${contentClassName}`}
                        >
                            <div className="flex justify-between">
                                <div className="font-bold text-lg">{item.label}</div>
                                <div className="text-gray-500 mt-2 text-sm">15H00</div>
                            </div>
                            {item.description && (
                                <div className="text-gray-600">{item.description}</div>
                            )}

                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    );
};
