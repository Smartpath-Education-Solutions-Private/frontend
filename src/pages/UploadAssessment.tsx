import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, Upload } from 'lucide-react';

// Mock function to simulate AI-generated questions
const generateMockQuestions = (fileName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const questions = [
        {
          id: 1,
          text: `What is the main topic covered in ${fileName}?`,
          options: [
            { id: 'a', text: 'Lighting techniques' },
            { id: 'b', text: 'Camera angles' },
            { id: 'c', text: 'Sound design' },
            { id: 'd', text: 'Script writing' },
          ],
        },
        {
          id: 2,
          text: 'Which lighting technique is commonly used for dramatic effect?',
          options: [
            { id: 'a', text: 'High-key lighting' },
            { id: 'b', text: 'Low-key lighting' },
            { id: 'c', text: 'Natural lighting' },
            { id: 'd', text: 'Flat lighting' },
          ],
        },
        // Add more mock questions here
      ];
      resolve(questions);
    }, 2000); // Simulate a 2-second delay
  });
};

const UploadAssessment = () => {
  const { chapterId } = useParams();
  const [file, setFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile({
        name: e.target.files[0].name,
        uploadedAt: 'Just now'
      });
    }
  };

  const handleContinue = async () => {
    if (file) {
      setIsGenerating(true);
      try {
        const generatedQuestions = await generateMockQuestions(file.name);
        // Store the generated questions in localStorage (in a real app, you'd use a more robust state management solution)
        localStorage.setItem('generatedQuestions', JSON.stringify(generatedQuestions));
        navigate(`/review-and-publish/${chapterId}`);
      } catch (error) {
        console.error('Error generating questions:', error);
        // Handle error (e.g., show an error message to the user)
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-sm breadcrumbs mb-4">
        <ul className="flex items-center space-x-2">
          <li>Create Course</li>
          <ChevronRight className="w-4 h-4" />
          <li>Chapter {chapterId}</li>
          <ChevronRight className="w-4 h-4" />
          <li>Upload Assessment</li>
        </ul>
      </div>

      <h1 className="text-3xl font-bold mb-2">Create a new AI Powered Assessment</h1>
      <p className="text-gray-600 mb-6">
        Upload your content file and let AI generate an assessment for your students.
      </p>

      <div className="mb-6">
        <div className="flex space-x-4 mb-4 border-b">
          <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600">
            Upload
          </button>
          <button className="px-4 py-2 text-gray-500">
            Add More Questions
          </button>
          <button className="px-4 py-2 text-gray-500">
            Review & Publish
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-2">Upload your content file</h2>
        <p className="text-gray-600 mb-4">
          We support .doc, .txt, .pdf, and .ppt files. Please upload a file that contains the content you want to turn into a quiz.
        </p>
        <div className="mb-6">
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center w-full bg-gray-50">
              <Upload className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-gray-600">Upload file</span>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".doc,.docx,.txt,.pdf,.ppt,.pptx"
            />
          </label>
        </div>
        {file && (
          <div>
            <h3 className="font-semibold mb-2">Your uploaded file</h3>
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-lg mr-4">
                <Upload className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <p className="font-semibold">{file.name}</p>
                <p className="text-sm text-gray-500">
                  Uploaded {file.uploadedAt}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={handleContinue}
          disabled={!file || isGenerating}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
            (!file || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isGenerating ? 'Generating Questions...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default UploadAssessment;