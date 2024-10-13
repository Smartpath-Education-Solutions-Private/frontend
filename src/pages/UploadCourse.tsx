import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const UploadCourse = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile({
        name: e.target.files[0].name,
        uploadedAt: 'Just now'
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Cinematic Techniques</span>
        <span className="mx-2">/</span>
        <span>Assessments</span>
        <span className="mx-2">/</span>
        <span>Assessment on Lighting</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Create a new AI Powered Assessment</h1>
      <p className="text-gray-600 mb-6">
        Upload your content file and let AI generate an assessment for your students.
      </p>

      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
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
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Continue
        </button>
      </div>
    </div>
  );
};

export default UploadCourse;