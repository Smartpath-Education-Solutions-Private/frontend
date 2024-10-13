import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const YourCourses = () => {
  const [activeTab, setActiveTab] = useState('published');
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Add mock data if courses are empty
    if (state.courses.length === 0) {
      const mockCourses = [
        {
          id: 1,
          title: 'Exploring the Power of Data Visualization',
          description: 'Learn how to create impactful visualizations with various tools and techniques.',
          category: 'Data Science',
          status: 'published',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          publishedDate: '2023-11-19',
          enrolledStudents: 120,
          rating: 4.7,
          totalLessons: 12,
          completedLessons: 8,
        },
        // ... (other mock courses)
      ];
      dispatch({ type: 'ADD_COURSES', payload: mockCourses });
    }
  }, [dispatch, state.courses.length]);

  const publishedCourses = state.courses.filter(course => course.status === 'published');
  const draftCourses = state.courses.filter(course => course.status === 'draft');

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      dispatch({ type: 'DELETE_COURSE', payload: courseId });
    }
  };

  const handleEditCourse = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  };

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handleAddNewCourse = () => {
    navigate('/create-course');
  };

  const renderCourseCard = (course, index) => (
    <div
      key={`course-${course.id}-${index}`}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold mb-1 text-sm">{course.title}</h3>
        <p className="text-xs text-gray-500 mb-2">
          {course.status === 'published' ? 'Published on ' : 'Last edited '} 
          {course.publishedDate || course.lastEdited}
        </p>
        {course.status === 'published' && (
          <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
            <span>{course.enrolledStudents} students</span>
            <span className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
              {course.rating.toFixed(1)}
            </span>
          </div>
        )}
        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {course.completedLessons}/{course.totalLessons} lessons completed
          </p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={() => handleViewCourse(course.id)}
            className="text-blue-500 hover:text-blue-600"
            title="View Course"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleEditCourse(course.id)}
            className="text-green-500 hover:text-green-600"
            title="Edit Course"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDeleteCourse(course.id)}
            className="text-red-500 hover:text-red-600"
            title="Delete Course"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your courses</h1>

      <div className="mb-8">
        <div className="flex space-x-4 mb-4 border-b">
          <button
            className={`px-4 py-2 ${
              activeTab === 'published'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('published')}
          >
            Published ({publishedCourses.length})
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'drafts'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('drafts')}
          >
            Drafts ({draftCourses.length})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(activeTab === 'published' ? publishedCourses : draftCourses).map((course, index) => renderCourseCard(course, index))}
        </div>
      </div>

      <button
        onClick={handleAddNewCourse}
        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add new course
      </button>
    </div>
  );
};

export default YourCourses;