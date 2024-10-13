import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, Edit } from 'lucide-react';

const ReviewAndPublish = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    const storedQuestions = localStorage.getItem('generatedQuestions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  const handlePublish = () => {
    setIsPublishing(true);
    // Simulate publishing process
    setTimeout(() => {
      setIsPublishing(false);
      // Clear the stored questions
      localStorage.removeItem('generatedQuestions');
      // Navigate back to the create course page
      navigate('/create-course');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-sm breadcrumbs mb-4">
        <ul className="flex items-center space-x-2">
          <li>Create Course</li>
          <ChevronRight className="w-4 h-4" />
          <li>Chapter {chapterId}</li>
          <ChevronRight className="w-4 h-4" />
          <li>Review and Publish</li>
        </ul>
      </div>

      <h1 className="text-3xl font-bold mb-4">Review and publish</h1>
      <p className="text-gray-600 mb-8">
        Let's make sure everything is perfect before you publish this quiz
      </p>

      <h2 className="text-xl font-semibold mb-4">Review and edit</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {questions.map((question) => (
          <div key={question.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">Question {question.id}</h3>
                <p className="text-sm text-gray-500">Multiple choice</p>
              </div>
              <Edit className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm">{question.text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Publish</h2>
      <p className="text-gray-600 mb-4">
        Once you publish this quiz, it will be added to your course. You can always edit questions, add new ones, or remove
        questions after publishing.
      </p>

      <button
        className={`px-6 py-2 bg-blue-500 text-white rounded-lg ${
          isPublishing ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handlePublish}
        disabled={isPublishing}
      >
        {isPublishing ? 'Publishing...' : 'Approve & Publish'}
      </button>

      <p className="mt-4 text-sm text-gray-500">
        You have 30 minutes left to finish this quiz
      </p>

      <div className="mt-4">
        <div className="bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 rounded-full h-2"
            style={{ width: `${(questions.length / 20) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">{questions.length}/20 questions complete</p>
      </div>
    </div>
  );
};

export default ReviewAndPublish;