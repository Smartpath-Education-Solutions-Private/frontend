import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, ChevronUp, ChevronDown } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  points: number;
  rank: number;
  avatar: string;
  badges: string[];
  streak: number;
}

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState('weekly');
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockStudents: Student[] = [
      { id: 1, name: 'Alice Johnson', points: 1250, rank: 1, avatar: 'https://i.pravatar.cc/150?img=1', badges: ['python', 'javascript', 'react'], streak: 15 },
      { id: 2, name: 'Bob Smith', points: 1100, rank: 2, avatar: 'https://i.pravatar.cc/150?img=2', badges: ['java', 'spring', 'sql'], streak: 10 },
      { id: 3, name: 'Charlie Brown', points: 950, rank: 3, avatar: 'https://i.pravatar.cc/150?img=3', badges: ['c++', 'algorithms'], streak: 7 },
      { id: 4, name: 'Diana Prince', points: 900, rank: 4, avatar: 'https://i.pravatar.cc/150?img=4', badges: ['web-security', 'networking'], streak: 12 },
      { id: 5, name: 'Ethan Hunt', points: 850, rank: 5, avatar: 'https://i.pravatar.cc/150?img=5', badges: ['machine-learning', 'python'], streak: 8 },
    ];
    setStudents(mockStudents);
  }, [timeFrame]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-yellow-600" />;
      default:
        return <span className="w-6 h-6 inline-flex items-center justify-center bg-gray-200 rounded-full">{rank}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      
      <div className="mb-6">
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="block w-full md:w-auto px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="allTime">All Time</option>
        </select>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {students.map((student) => (
            <li key={student.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    {getRankIcon(student.rank)}
                  </div>
                  <img className="h-12 w-12 rounded-full" src={student.avatar} alt={student.name} />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">
                      {student.badges.map((badge) => (
                        <span key={badge} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm text-gray-900 mr-4">
                    <span className="font-semibold">{student.points}</span> points
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Award className="w-4 h-4 mr-1" />
                    {student.streak} day streak
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button className="flex items-center text-indigo-600 hover:text-indigo-900">
          <ChevronUp className="w-5 h-5 mr-1" />
          Previous
        </button>
        <span className="text-sm text-gray-700">Page 1 of 10</span>
        <button className="flex items-center text-indigo-600 hover:text-indigo-900">
          Next
          <ChevronDown className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
