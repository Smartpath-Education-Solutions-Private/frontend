import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Book, Clock, Star, Filter, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Courses = () => {
  const { state } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setCourses([
      {
        id: 1,
        title: 'Introduction to Python Programming',
        category: 'Computer Science',
        difficulty: 'Beginner',
        instructor: 'Dr. Jane Smith',
        rating: 4.8,
        studentsEnrolled: 12500,
        duration: '40 hours',
        image: 'https://example.com/python-course.jpg',
      },
      {
        id: 2,
        title: 'Advanced Machine Learning Techniques',
        category: 'Data Science',
        difficulty: 'Advanced',
        instructor: 'Prof. John Doe',
        rating: 4.9,
        studentsEnrolled: 8900,
        duration: '60 hours',
        image: 'https://example.com/ml-course.jpg',
      },
      {
        id: 3,
        title: 'Web Development Bootcamp',
        category: 'Web Development',
        difficulty: 'Intermediate',
        instructor: 'Sarah Johnson',
        rating: 4.7,
        studentsEnrolled: 15600,
        duration: '80 hours',
        image: 'https://example.com/webdev-course.jpg',
      },
      {
        id: 4,
        title: 'Digital Marketing Fundamentals',
        category: 'Marketing',
        difficulty: 'Beginner',
        instructor: 'Michael Brown',
        rating: 4.6,
        studentsEnrolled: 10200,
        duration: '30 hours',
        image: 'https://example.com/marketing-course.jpg',
      },
      {
        id: 5,
        title: 'Data Visualization with D3.js',
        category: 'Data Science',
        difficulty: 'Intermediate',
        instructor: 'Emily Chen',
        rating: 4.8,
        studentsEnrolled: 7800,
        duration: '45 hours',
        image: 'https://example.com/datavis-course.jpg',
      },
      // Add more courses as needed
    ]);
  }, []);

  const categories = ['All', ...new Set(courses.map(course => course.category))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course =>
    (selectedCategory === 'All' || course.category === selectedCategory) &&
    (selectedDifficulty === 'All' || course.difficulty === selectedDifficulty) &&
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCourses = filteredCourses.sort((a, b) => {
    if (sortBy === 'popularity') return b.studentsEnrolled - a.studentsEnrolled;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Courses</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {difficulties.map((difficulty, index) => (
                    <option key={index} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          {/* Search bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search for a course"
              className="w-full p-3 pl-10 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Course grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => (
  <Link
    to={`/courses/${course.id}`}
    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-150 ease-in-out"
  >
    <img
      src={course.image}
      alt={course.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="font-semibold mb-1 text-lg">{course.title}</h3>
      <p className="text-sm text-gray-500 mb-2">{course.instructor}</p>
      <div className="flex items-center mb-2">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="ml-1 text-sm font-medium">{course.rating.toFixed(1)}</span>
        <span className="ml-1 text-xs text-gray-500">({course.studentsEnrolled.toLocaleString()} students)</span>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {course.duration}
        </span>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
          {course.difficulty}
        </span>
      </div>
    </div>
  </Link>
);

export default Courses;