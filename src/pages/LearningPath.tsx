import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Book, Clock, Award } from 'lucide-react';

const LearningPath = () => {
  const learningPaths = [
    {
      id: 1,
      title: 'Foundations of Computer Science',
      description: 'Build a strong foundation in computer science concepts',
      progress: 100,
      totalCourses: 5,
      completedCourses: 5,
      estimatedTime: '40 hours',
      difficulty: 'Beginner',
    },
    {
      id: 2,
      title: 'Data Structures and Algorithms',
      description: 'Master essential data structures and algorithms',
      progress: 75,
      totalCourses: 4,
      completedCourses: 3,
      estimatedTime: '50 hours',
      difficulty: 'Intermediate',
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      description: 'Learn the basics of machine learning and AI',
      progress: 30,
      totalCourses: 5,
      completedCourses: 1,
      estimatedTime: '60 hours',
      difficulty: 'Advanced',
    },
    {
      id: 4,
      title: 'Web Development Bootcamp',
      description: 'Become a full-stack web developer',
      progress: 0,
      totalCourses: 6,
      completedCourses: 0,
      estimatedTime: '80 hours',
      difficulty: 'Beginner to Intermediate',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Learning Path</h1>

      <div className="space-y-8">
        {learningPaths.map((path) => (
          <div key={path.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{path.title}</h2>
              <p className="text-gray-600 mb-4">{path.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center text-sm text-gray-500">
                    <Book className="w-4 h-4 mr-1" />
                    {path.completedCourses}/{path.totalCourses} courses
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {path.estimatedTime}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Award className="w-4 h-4 mr-1" />
                    {path.difficulty}
                  </span>
                </div>
                <Link
                  to={`/learning-path/${path.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  View details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      {path.progress}% Complete
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${path.progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;