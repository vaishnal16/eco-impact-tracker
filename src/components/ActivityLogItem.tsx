interface ActivityLogItemProps {
  habitName: string;
  date: string;
  note: string;
}

export default function ActivityLogItem({ habitName, date, note }: ActivityLogItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-800 text-sm">{habitName}</h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {date}
        </span>
      </div>
      {note && (
        <p className="text-gray-600 text-sm leading-relaxed">{note}</p>
      )}
    </div>
  );
}