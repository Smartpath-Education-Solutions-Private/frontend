import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: 'Which direct lighting from below or from one side, often dangerous or evil-looking, may convey split personality, moral ambiguity, or secrecy?',
    options: [
      { id: 'a', text: 'High Key Lighting' },
      { id: 'b', text: 'Low Key Lighting' },
      { id: 'c', text: 'Side Lighting' },
      { id: 'd', text: 'Top Macro Lighting' },
    ],
  },
  // Add more questions here...
];

const TakeAssessment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    }
  };

  const handleSubmitAnswers = () => {
    // Handle submission logic here
    console.log('Answers submitted');
    // Navigate back to the course details page
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-sm breadcrumbs mb-4">
        <ul className="flex items-center space-x-2">
          <li>Cinematic Techniques</li>
          <ChevronRight className="w-4 h-4" />
          <li>Assessments</li>
          <ChevronRight className="w-4 h-4" />
          <li>Assessment on Lighting</li>
        </ul>
      </div>

      <h1 className="text-3xl font-bold mb-4">
        Assess your knowledge on the foundational concepts of Cinematic Techniques
      </h1>

      <div className="mb-4">
        <p className="font-semibold">You are on question {currentQuestion + 1} of {questions.length}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
        </div>
        <p className="text-sm text-gray-500">Time left: 1h 30m</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Question {currentQuestion + 1}</h2>
        <p className="mb-4">{questions[currentQuestion].text}</p>
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option) => (
            <label key={option.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              <input
                type="radio"
                name="answer"
                value={option.id}
                checked={selectedAnswer === option.id}
                onChange={() => setSelectedAnswer(option.id)}
                className="form-radio"
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Previous question
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleNextQuestion}
          >
            Next question
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={handleSubmitAnswers}
          >
            Submit answers
          </button>
        )}
      </div>
    </div>
  );
};

export default TakeAssessment;