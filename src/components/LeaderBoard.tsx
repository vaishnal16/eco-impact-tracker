interface LeaderboardCardProps {
  rank: number;
  name: string;
  points: number;
  isCurrentUser: boolean;
}

export default function LeaderboardCard({ rank, name, points, isCurrentUser }: LeaderboardCardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <div className={`
      rounded-xl p-4 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg
      ${isCurrentUser 
        ? 'bg-green-100 border-2 border-green-400 font-bold' 
        : 'bg-white border border-gray-200'
      }
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`
            flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold
            ${isCurrentUser ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-600'}
          `}>
            {getRankIcon(rank)}
          </div>
          <div>
            <h3 className={`text-lg ${isCurrentUser ? 'text-green-800' : 'text-gray-800'}`}>
              {name}
              {isCurrentUser && (
                <span className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded-full">
                  You
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${isCurrentUser ? 'text-green-600' : 'text-gray-800'}`}>
            {points.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">points</div>
        </div>
      </div>
    </div>
  );
}