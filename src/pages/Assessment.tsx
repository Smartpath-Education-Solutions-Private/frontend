import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Upload } from 'lucide-react';

const Assessment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFile, setUploadedFile] = useState({
    name: 'Sample File.docx',
    uploadedAt: '4 days ago',
  });

  const handleStartAssessment = () => {
    navigate(`/take-assessment/${courseId}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        Create a new AI Powered Assessment
      </h1>
      <p className="text-gray-600 mb-6">
        Upload your content file and let AI generate an assessment for your
        students.
      </p>

      <div className="mb-6">
        <div className="flex space-x-4 mb-4 border-b">
          <TabButton
            active={activeTab === 'upload'}
            onClick={() => setActiveTab('upload')}
          >
            Upload
          </TabButton>
          <TabButton
            active={activeTab === 'addQuestions'}
            onClick={() => setActiveTab('addQuestions')}
          >
            Add More Questions
          </TabButton>
          <TabButton
            active={activeTab === 'review'}
            onClick={() => setActiveTab('review')}
          >
            Review & Publish
          </TabButton>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Upload your content file</h2>
        <p className="text-gray-600 mb-4">
          We support .doc, .txt, .pdf, and .ppt files. Please upload a file that
          contains the content you want to turn into a quiz.
        </p>
        <div className="mb-6">
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center w-full">
            <Upload className="w-5 h-5 mr-2" />
            Upload file
          </button>
        </div>
        {uploadedFile && (
          <div>
            <h3 className="font-semibold mb-2">Your uploaded file</h3>
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-lg mr-4">
                <Upload className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <p className="font-semibold">{uploadedFile.name}</p>
                <p className="text-sm text-gray-500">
                  Uploaded {uploadedFile.uploadedAt}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleStartAssessment}
        >
          Start Assessment
        </button>
      </div>

      {/* Assessment Items */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Available Assessments</h2>
        <div className="space-y-4">
          <AssessmentItem
            title="Adaptive Assessment"
            subject="Engineering Basics"
            dueIn="2 days"
            onStart={handleStartAssessment}
          />
          <AssessmentItem
            title="Adaptive Assessment"
            subject="Cinematic Techniques"
            dueIn="4 hours"
            onStart={handleStartAssessment}
          />
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, children }) => (
  <button
    className={`px-4 py-2 ${
      active ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const AssessmentItem = ({ title, subject, dueIn, onStart }) => (
  <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
    <div className="flex items-center">
      <div className="bg-gray-100 p-2 rounded-lg mr-4">
        <Upload className="w-6 h-6 text-gray-400" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{subject}</p>
      </div>
    </div>
    <div className="flex items-center">
      <p className="text-sm text-gray-500 mr-4">Due in {dueIn}</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={onStart}
      >
        Start now
      </button>
    </div>
  </div>
);

export default Assessment;