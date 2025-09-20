import React, { useContext } from 'react';
import { Star, Trophy, Users } from 'lucide-react';
import { AppContext } from '../../context/ReportsContext';

export default function Gamification() {
  const { currentUser, users } = useContext(AppContext);
  const user = users[currentUser];
  
  if (user.role !== 'citizen') return null;
  
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <Star className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{user.points}</div>
          <div className="text-sm opacity-90">Points Earned</div>
        </div>
        
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <Trophy className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{user.badges.length}</div>
          <div className="text-sm opacity-90">Badges</div>
        </div>
        
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <Users className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">#3</div>
          <div className="text-sm opacity-90">Leaderboard</div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Your Badges</h3>
        <div className="flex flex-wrap gap-2">
          {user.badges.map(badge => (
            <span key={badge} className="bg-white/30 px-3 py-1 rounded-full text-sm">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}