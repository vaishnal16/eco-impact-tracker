interface ActivityLogItemProps {
  habitName: string;
  date: string;
  note?: string;
  points?: number;
}

const ActivityLogItem = ({ habitName, date, note = '', points = 0 }: ActivityLogItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      className="border-l-4 border-green-400 bg-green-50 p-4 rounded-r-lg shadow-sm hover:shadow-md transition-transform hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-green-800">{habitName}</h3>
        <span className="text-sm text-green-600">{formatDate(date)}</span>
      </div>
      {note && <p className="text-green-700 text-sm mb-1">{note}</p>}
      {points > 0 && (
        <span className="inline-block text-xs font-medium bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
          +{points} pts
        </span>
      )}
    </div>
  );
};

export default ActivityLogItem;