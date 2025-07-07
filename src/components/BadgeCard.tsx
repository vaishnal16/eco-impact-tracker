interface BadgeCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

const BadgeCard = ({ name, description, imageUrl }: BadgeCardProps) => {
  return (
    <div className="flex flex-col items-center p-4 rounded-lg min-w-[120px] bg-green-100 border-2 border-green-300">
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-green-200">
        <img 
          src={imageUrl || '/badge-placeholder.svg'} 
          alt={name}
          className="w-8 h-8 rounded-full"
        />
      </div>
      <span className="text-sm font-medium text-center text-green-800">
        {name}
      </span>
      {description && (
        <span className="text-xs text-green-600 mt-1 text-center">
          {description}
        </span>
      )}
    </div>
  );
};

export default BadgeCard;