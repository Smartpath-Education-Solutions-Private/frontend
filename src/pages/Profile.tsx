import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Award, Book, Clock, TrendingUp, Users, Star, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Profile = () => {

  const { state } = useAppContext();
  const { user, preferences } = state;
  const [activeTab, setActiveTab] = useState('overview');

  const mockData = {
    enrolledCourses: 5,
    completedCourses: 3,
    totalLearningTime: 47, // hours
    averageScore: 85,
    streak: 15, // days
    nextMilestone: 20, // days
    badges: ['Quick Learner', 'Consistent', 'Team Player'],
    recentAchievements: [
      { id: 1, title: 'Completed "Introduction to AI" course', date: '2023-06-15' },
      { id: 2, title: 'Earned "Data Visualization Expert" badge', date: '2023-06-10' },
      { id: 3, title: 'Reached 30-day learning streak', date: '2023-06-01' },
    ],
    upcomingAssessments: [
      { id: 1, courseId: 101, title: 'Final Project: Machine Learning Basics', dueDate: '2023-06-30' },
      { id: 2, courseId: 102, title: 'Quiz: Advanced Data Structures', dueDate: '2023-07-05' },
    ],
    learningPath: [
      { id: 1, title: 'Foundations of Computer Science', progress: 100, totalCourses: 5, completedCourses: 5 },
      { id: 2, title: 'Data Structures and Algorithms', progress: 75, totalCourses: 4, completedCourses: 3 },
      { id: 3, title: 'Machine Learning Fundamentals', progress: 30, totalCourses: 5, completedCourses: 1 },
      { id: 4, title: 'Advanced AI Concepts', progress: 0, totalCourses: 3, completedCourses: 0 },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {/* User info section */}
          <div className="flex flex-col md:flex-row items-center mb-6">
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6 object-cover border-4 border-blue-100"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-2 flex flex-wrap justify-center md:justify-start items-center">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  Level {preferences.level || 1}
                </span>
                <span className="text-gray-500 text-sm">
                  {mockData.totalLearningTime} hours of learning
                </span>
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={<Book className="w-6 h-6" />} value={mockData.enrolledCourses} label="Enrolled Courses" />
            <StatCard icon={<Award className="w-6 h-6" />} value={mockData.completedCourses} label="Completed Courses" />
            <StatCard icon={<Clock className="w-6 h-6" />} value={`${mockData.streak} days`} label="Learning Streak" />
            <StatCard icon={<TrendingUp className="w-6 h-6" />} value={`${mockData.averageScore}%`} label="Average Score" />
          </div>

          {/* Learning Path Progress section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Learning Path Progress</h2>
            <div className="space-y-4">
              {mockData.learningPath.map((path) => (
                <div key={path.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{path.title}</h3>
                    <span className="text-sm font-medium text-gray-500">
                      {path.completedCourses}/{path.totalCourses} courses
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
                          {path.progress}% Complete
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                      <div
                        style={{ width: `${path.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                      ></div>
                    </div>
                  </div>
                  <Link
                    to={`/learning-path/${path.id}`}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
                  >
                    View details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs section */}
          <div className="flex flex-wrap space-x-4 mb-4">
            <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
              Overview
            </TabButton>
            <TabButton active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')}>
              Achievements
            </TabButton>
            <TabButton active={activeTab === 'assessments'} onClick={() => setActiveTab('assessments')}>
              Upcoming Assessments
            </TabButton>
          </div>

          {/* Tab content */}
                 {/* Tab content */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <ActivityItem
                  icon={<Play className="w-5 h-5 text-green-500" />}
                  title="Resumed 'Machine Learning Basics'"
                  timestamp="2 hours ago"
                />
                <ActivityItem
                  icon={<Users className="w-5 h-5 text-blue-500" />}
                  title="Joined 'AI Ethics' discussion group"
                  timestamp="1 day ago"
                />
                <ActivityItem
                  icon={<Star className="w-5 h-5 text-yellow-500" />}
                  title="Completed 'Data Visualization' course"
                  timestamp="3 days ago"
                />
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Achievements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {mockData.badges.map((badge, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg flex items-center">
                    <Award className="w-8 h-8 text-yellow-500 mr-3" />
                    <span className="font-medium">{badge}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-semibold mb-2">Recent Achievements</h3>
              <ul className="space-y-2">
                {mockData.recentAchievements.map((achievement) => (
                  <li key={achievement.id} className="flex justify-between items-center">
                    <span>{achievement.title}</span>
                    <span className="text-sm text-gray-500">{achievement.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'assessments' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Upcoming Assessments</h2>
              <div className="space-y-4">
                {mockData.upcomingAssessments.map((assessment) => (
                  <div key={assessment.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <h3 className="font-semibold">{assessment.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">Due: {assessment.dueDate}</p>
                    <Link
                      to={`/take-assessment/${assessment.courseId}`}
                      className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors duration-200"
                    >
                      Start Assessment
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/edit-profile"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};


const StatCard = ({ icon, value, label }) => (
  <div className="bg-gray-50 rounded-lg p-4 flex items-center">
    <div className="mr-4 text-blue-500">{icon}</div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  </div>
);

const TabButton = ({ active, onClick, children }) => (
  <button
    className={`px-4 py-2 rounded-md ${
      active
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const ActivityItem = ({ icon, title, timestamp }) => (
  <div className="flex items-center">
    <div className="mr-3">{icon}</div>
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-500">{timestamp}</p>
    </div>
  </div>
);


export default Profile;