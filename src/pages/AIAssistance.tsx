import React, { useState, useRef } from 'react';
import { Send, FileText, Clock, MessageSquare, Search, FileUp, X } from 'lucide-react';

const AIAssistance = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const fileInputRef = useRef(null);

  const recentQuestions = [
    {
      id: 1,
      question: 'What is Rule of Thirds in photography?',
      category: 'Photography',
      answer: 'The Rule of Thirds is a composition guideline in photography that divides an image into a 3x3 grid. Important elements should be placed along these lines or at their intersections to create more balanced and interesting compositions.',
    },
    {
      id: 2,
      question: 'What is a Gimbal / Stabilizer?',
      category: 'Cinematic Techniques',
      answer: 'A gimbal or stabilizer is a pivoted support that allows rotation of an object about a single axis. In cinematography, it\'s used to keep cameras steady during motion, allowing for smooth and stable footage even when the camera operator is moving.',
    },
    {
      id: 3,
      question: 'How does aperture affect depth of field?',
      category: 'Photography',
      answer: 'Aperture greatly affects depth of field. A wider aperture (smaller f-number) creates a shallow depth of field, blurring the background. A narrower aperture (larger f-number) increases depth of field, keeping more of the image in focus.',
    },
  ];

  const handleAskQuestion = () => {
    if (input.trim()) {
      setChatHistory([...chatHistory, { type: 'user', message: input }]);
      // Simulate AI response (replace with actual API call in a real application)
      setTimeout(() => {
        setChatHistory(prev => [...prev, { type: 'ai', message: `Here's a response to "${input}"` }]);
      }, 1000);
      setInput('');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Implement the logic for handling the uploaded file
      console.log('File uploaded:', file.name);
      // You might want to send this file to your backend for processing
    }
  };

  const openModal = (question) => {
    setSelectedQuestion(question);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedQuestion(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Smart Path AI Assistance</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-4 h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
          {chatHistory.map((item, index) => (
            <div key={index} className={`mb-4 ${item.type === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${item.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {item.message}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Ask a question..."
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors duration-200"
            onClick={handleAskQuestion}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center">
          <label className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200">
            <FileUp className="w-5 h-5 inline-block mr-2" />
            Upload PDF
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
          </label>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Recently Asked Questions</h2>
        <div className="space-y-4">
          {recentQuestions.map((question) => (
            <div
              key={question.id}
              className="flex items-center bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => openModal(question)}
            >
              <FileText className="w-6 h-6 mr-3 text-gray-400" />
              <div>
                <h3 className="font-semibold">{question.question}</h3>
                <p className="text-sm text-gray-500">{question.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{selectedQuestion.question}</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">{selectedQuestion.answer}</p>
            <p className="text-sm text-gray-500">Category: {selectedQuestion.category}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistance;