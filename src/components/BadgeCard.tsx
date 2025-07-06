interface BadgeCardProps {
  badgeName: string;
  imageUrl: string;
  earned: boolean;
}

const BadgeCard = ({ badgeName, imageUrl, earned }: BadgeCardProps) => {
  return (
    <div className={`flex flex-col items-center p-4 rounded-lg min-w-[120px] ${
      earned ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-100 border-2 border-gray-200'
    }`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
        earned ? 'bg-green-200' : 'bg-gray-300'
      }`}>
        <img 
          src={imageUrl} 
          alt={badgeName}
          className={`w-8 h-8 rounded-full ${earned ? 'opacity-100' : 'opacity-50'}`}
        />
      </div>
      <span className={`text-sm font-medium text-center ${
        earned ? 'text-green-800' : 'text-gray-500'
      }`}>
        {badgeName}
      </span>
      {earned && (
        <span className="text-xs text-green-600 mt-1">✓ Earned</span>
      )}
    </div>
  );
};

export default BadgeCard;