interface BadgeCardProps {
  badgeName: string;
  imageUrl: string;
  earned: boolean;
}

export default function BadgeCard({ badgeName, imageUrl, earned }: BadgeCardProps) {
  return (
    <div className={`
      bg-white rounded-xl shadow p-3 min-w-[120px] flex-shrink-0
      transition-all duration-200 hover:scale-105 cursor-pointer
      ${earned ? 'opacity-100' : 'opacity-50 grayscale'}
    `}>
      <div className="flex flex-col items-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img 
            src={imageUrl} 
            alt={badgeName}
            className="w-10 h-10 object-cover"
          />
        </div>
        <p className="text-xs font-medium text-gray-700 text-center leading-tight">
          {badgeName}
        </p>
        {earned && (
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        )}
      </div>
    </div>
  );
}