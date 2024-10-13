import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Book, Clock, Award, TrendingUp, Calendar, Bell, ArrowRight, Users, Star, Play } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { state } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setEnrolledCourses([
      {
        id: 1,
        title: 'Introduction to React',
        category: 'Computer Science',
        progress: 75,
        nextLesson: 'React Hooks',
        image: 'https://example.com/react.jpg',
      },
      {
        id: 2,
        title: 'Data Structures and Algorithms',
        category: 'Computer Science',
        progress: 40,
        nextLesson: 'Binary Trees',
        image: 'https://example.com/dsa.jpg',
      },
      {
        id: 3,
        title: 'Digital Marketing Fundamentals',
        category: 'Marketing',
        progress: 90,
        nextLesson: 'Social Media Strategies',
        image: 'https://example.com/marketing.jpg',
      },
      {
        id: 4,
        title: 'Introduction to Machine Learning',
        category: 'Data Science',
        progress: 20,
        nextLesson: 'Supervised Learning',
        image: 'https://example.com/ml.jpg',
      },
    ]);
  }, []);

  const categories = ['All', ...new Set(enrolledCourses.map(course => course.category))];

  const filteredCourses = enrolledCourses.filter(course =>
    (selectedCategory === 'All' || course.category === selectedCategory) &&
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome back, {state.user?.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Book />} value={enrolledCourses.length} label="Enrolled Courses" />
        <StatCard icon={<Clock />} value="47 hours" label="Total Learning Time" />
        <StatCard icon={<Award />} value="12" label="Certificates Earned" />
        <StatCard icon={<TrendingUp />} value="85%" label="Average Score" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <ul className="space-y-4">
              <EventItem
                date="June 15"
                title="Web Development Workshop"
                time="2:00 PM - 4:00 PM"
              />
              <EventItem
                date="June 18"
                title="Data Science Webinar"
                time="11:00 AM - 12:30 PM"
              />
              <EventItem
                date="June 22"
                title="AI Ethics Panel Discussion"
                time="3:00 PM - 5:00 PM"
              />
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          {/* Search bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search for an enrolled course"
              className="w-full p-3 pl-10 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Learning Path Progress */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Learning Path</h2>
            <div className="space-y-4">
              <LearningPathItem
                title="Foundations of Computer Science"
                progress={100}
                totalCourses={5}
                completedCourses={5}
              />
              <LearningPathItem
                title="Data Structures and Algorithms"
                progress={75}
                totalCourses={4}
                completedCourses={3}
              />
              <LearningPathItem
                title="Machine Learning Fundamentals"
                progress={30}
                totalCourses={5}
                completedCourses={1}
              />
            </div>
            <Link to="/learning-path" className="text-blue-600 hover:text-blue-800 font-medium flex items-center mt-4">
              View full learning path
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Enrolled courses */}
          <h2 className="text-2xl font-semibold mb-4">Your Enrolled Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Recommendations */}
          <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <RecommendationCard
              title="Advanced JavaScript Concepts"
              category="Computer Science"
              image="https://example.com/js.jpg"
            />
            <RecommendationCard
              title="UX/UI Design Principles"
              category="Design"
              image="https://example.com/uxui.jpg"
            />
            <RecommendationCard
              title="Introduction to Blockchain"
              category="Technology"
              image="https://example.com/blockchain.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center">
    <div className="mr-4 text-blue-500">{icon}</div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  </div>
);

const CourseCard = ({ course }) => (
  <Link
    to={`/courses/${course.id}`}
    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-150 ease-in-out"
  >
    <img
      src={course.image}
      alt={course.title}
      className="w-full h-40 object-cover"
    />
    <div className="p-4">
      <h3 className="font-semibold mb-1">{course.title}</h3>
      <p className="text-sm text-gray-500 mb-2">{course.category}</p>
      <div className="mb-2">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                {course.progress}% Complete
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${course.progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">Next: {course.nextLesson}</p>
    </div>
  </Link>
);

const RecommendationCard = ({ title, category, image }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-150 ease-in-out">
    <img src={image} alt={title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{category}</p>
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors duration-200">
        Enroll Now
      </button>
    </div>
  </div>
);

const EventItem = ({ date, title, time }) => (
  <li className="flex items-center">
    <div className="bg-blue-100 text-blue-700 rounded-full p-2 mr-3">
      <Calendar className="w-5 h-5" />
    </div>
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-500">{date} • {time}</p>
    </div>
  </li>
);

const LearningPathItem = ({ title, progress, totalCourses, completedCourses }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold">{title}</h3>
      <span className="text-sm font-medium text-gray-500">
        {completedCourses}/{totalCourses} courses
      </span>
    </div>
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
            {progress}% Complete
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
        ></div>
      </div>
    </div>
  </div>
);

export default Dashboard;