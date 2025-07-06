interface ActivityLogItemProps {
  habitName: string;
  date: string;
  note: string;
}

const ActivityLogItem = ({ habitName, date, note }: ActivityLogItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded-r-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-green-800">{habitName}</h3>
        <span className="text-sm text-green-600">{formatDate(date)}</span>
      </div>
      <p className="text-green-700 text-sm">{note}</p>
    </div>
  );
};

export default ActivityLogItem;