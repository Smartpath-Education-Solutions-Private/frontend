import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star, ChevronDown, ChevronUp, Clock, Book, Award, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CourseDetails = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [userRating, setUserRating] = useState(0);

  const course = {
    id: 1,
    title: 'Cinematic Techniques',
    description: 'Master the art of cinematography with this comprehensive course.',
    instructor: 'Jane Doe',
    rating: 4.8,
    totalRatings: 1250,
    duration: '40 hours',
    level: 'Intermediate',
    chapters: [
      { id: 1, title: 'Introduction', duration: '1 hour', videoLink: 'https://example.com/intro' },
      { id: 2, title: 'Exploring the basics', duration: '3 hours', videoLink: 'https://example.com/basics' },
      { id: 3, title: 'Choosing the Gear', duration: '2 hours', videoLink: 'https://example.com/gear' },
      { id: 4, title: 'Understanding Lighting', duration: '4 hours', videoLink: 'https://example.com/lighting' },
      { id: 5, title: 'Understanding your Subject', duration: '3 hours', videoLink: 'https://example.com/subject' },
    ],
  };

  const handleEnrollAndMarkComplete = () => {
    setIsEnrolled(true);
    dispatch({ type: 'ENROLL_COURSE', payload: course.id });
  };

  const handleStartAssessment = () => {
    navigate(`/take-assessment/${course.id}`);
  };

  const handleRatingChange = (rating) => {
    setUserRating(rating);
    console.log(`User rated the course: ${rating} stars`);
  };

  const toggleChapterExpansion = (chapterId) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
            alt="Cinematic Techniques"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Play className="w-16 h-16 text-white" />
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= course.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">{course.rating} ({course.totalRatings} ratings)</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </span>
                <span className="flex items-center">
                  <Book className="w-4 h-4 mr-1" />
                  {course.level}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center mb-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt={course.instructor}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-semibold">{course.instructor}</p>
              <p className="text-sm text-gray-500">Course Instructor</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
            {course.chapters.map((chapter) => (
              <div key={chapter.id} className="border-b last:border-b-0">
                <button
                  className="w-full py-4 flex items-center justify-between focus:outline-none"
                  onClick={() => toggleChapterExpansion(chapter.id)}
                >
                  <span className="font-medium">{chapter.title}</span>
                  {expandedChapter === chapter.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedChapter === chapter.id && (
                  <div className="pb-4">
                    <p className="text-sm text-gray-600 mb-2">Duration: {chapter.duration}</p>
                    <a
                      href={chapter.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Watch Video
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!isEnrolled ? (
            <button
              onClick={handleEnrollAndMarkComplete}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Enroll in Course
            </button>
          ) : (
            <div className="space-y-4">
              <button
                onClick={handleStartAssessment}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
              >
                Take Assessment
              </button>
              <div>
                <p className="text-lg font-semibold mb-2">Rate this course:</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      className={`w-8 h-8 ${
                        star <= userRating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <Star className="w-full h-full fill-current" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;