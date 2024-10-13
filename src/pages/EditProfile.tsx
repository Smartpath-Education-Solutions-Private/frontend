import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Switch } from '../components/Switch';
import { Edit2, Save, Upload } from 'lucide-react';

const EditProfile = () => {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState('learning');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(state.user);
  const [preferences, setPreferences] = useState(state.preferences);
  const fileInputRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePreferenceChange = (name, value) => {
    setPreferences({ ...preferences, [name]: value });
  };

  const handleSave = () => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleDataDownload = () => {
    // Simulate data download (unchanged)
    console.log('Downloading user data...');
    // In a real application, you would implement the actual data download logic here
  };

  const handleDataDeletion = () => {
    // Simulate data deletion request (unchanged)
    console.log('Requesting data deletion...');
    // In a real application, you would implement the actual data deletion request logic here
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src={userData.profilePicture}
              alt={userData.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
            />
            <button
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              <Upload size={16} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="flex-grow ml-6">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="text-3xl font-bold mb-1 w-full border-b-2 border-blue-300 focus:outline-none focus:border-blue-500 bg-blue-50 px-2 py-1 rounded"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-1">{userData.name}</h1>
            )}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="text-gray-600 w-full border-b-2 border-blue-300 focus:outline-none focus:border-blue-500 bg-blue-50 px-2 py-1 rounded"
              />
            ) : (
              <p className="text-gray-600">{userData.email}</p>
            )}
          </div>
          <button
            className={`ml-4 p-2 rounded-full ${
              isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors duration-200`}
            onClick={isEditing ? handleSave : handleEditToggle}
          >
            {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
          </button>
        </div>

        <div className="bg-gray-100 rounded-lg p-1 mb-8">
          <div className="flex">
            <TabButton
              active={activeTab === 'learning'}
              onClick={() => handleTabChange('learning')}
            >
              Learning preferences
            </TabButton>
            <TabButton
              active={activeTab === 'privacy'}
              onClick={() => handleTabChange('privacy')}
            >
              Privacy settings
            </TabButton>
            <TabButton
              active={activeTab === 'data'}
              onClick={() => handleTabChange('data')}
            >
              Data usage
            </TabButton>
          </div>
        </div>

        {activeTab === 'learning' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Learning preferences</h2>

            <div className="space-y-4">
              <PreferenceToggle
                title="AI-powered recommendations"
                description="Allow us to use AI to personalize your learning experience and recommend courses."
                enabled={preferences.aiRecommendations}
                onChange={(value) => handlePreferenceChange('aiRecommendations', value)}
              />

              <PreferenceToggle
                title="Email notifications"
                description="Receive email updates about new courses, assessments, and your progress."
                enabled={preferences.emailNotifications}
                onChange={(value) => handlePreferenceChange('emailNotifications', value)}
              />

              <PreferenceToggle
                title="Collaborative learning"
                description="Enable features that allow you to learn and work on projects with other students."
                enabled={preferences.collaborativeLearning}
                onChange={(value) => handlePreferenceChange('collaborativeLearning', value)}
              />

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Preferred learning style</h3>
                <select
                  value={preferences.learningStyle}
                  onChange={(e) => handlePreferenceChange('learningStyle', e.target.value)}
                  className="w-full p-2 border rounded-md bg-white"
                >
                  <option value="visual">Visual</option>
                  <option value="auditory">Auditory</option>
                  <option value="reading-writing">Reading/Writing</option>
                  <option value="kinesthetic">Kinesthetic</option>
                </select>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Daily study goal</h3>
                <input
                  type="number"
                  value={preferences.dailyStudyGoal}
                  onChange={(e) => handlePreferenceChange('dailyStudyGoal', parseInt(e.target.value))}
                  className="w-full p-2 border rounded-md"
                  min="0"
                  max="24"
                /> hours
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Learning Progress</h3>
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-blue-500 rounded-full h-4 transition-all duration-500 ease-in-out"
                  style={{ width: `${preferences.learningProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-600">
                You've completed {preferences.learningProgress}% of your enrolled courses
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Recent Achievements</h3>
              <ul className="list-disc pl-5 space-y-2">
                {preferences.recentAchievements.map((achievement, index) => (
                  <li key={index} className="text-gray-700">{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Privacy settings</h2>
            <div className="space-y-4">
              <PreferenceToggle
                title="Profile visibility"
                description="Make your profile visible to other users on the platform."
                enabled={preferences.profileVisibility}
                onChange={(value) => handlePreferenceChange('profileVisibility', value)}
              />

              <PreferenceToggle
                title="Show course progress"
                description="Allow others to see your progress in courses you're enrolled in."
                enabled={preferences.showCourseProgress}
                onChange={(value) => handlePreferenceChange('showCourseProgress', value)}
              />

              <PreferenceToggle
                title="Allow direct messages"
                description="Let other users send you direct messages on the platform."
                enabled={preferences.allowDirectMessages}
                onChange={(value) => handlePreferenceChange('allowDirectMessages', value)}
              />

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Data sharing with instructors</h3>
                <select
                  value={preferences.dataSharing}
                  onChange={(e) => handlePreferenceChange('dataSharing', e.target.value)}
                  className="w-full p-2 border rounded-md bg-white"
                >
                  <option value="none">Don't share my data</option>
                  <option value="limited">Share limited data (course progress only)</option>
                  <option value="full">Share full data (progress and performance)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Data usage</h2>
            <p className="text-gray-600 mb-4">
              Control how your data is used on the platform. You can download your data or request its deletion here.
            </p>
            <div className="space-y-4">
              <PreferenceToggle
                title="Usage analytics"
                description="Allow us to collect anonymous usage data to improve our services."
                enabled={preferences.usageAnalytics}
                onChange={(value) => handlePreferenceChange('usageAnalytics', value)}
              />

              <PreferenceToggle
                title="Personalized ads"
                description="Allow us to show you personalized advertisements based on your interests."
                enabled={preferences.personalizedAds}
                onChange={(value) => handlePreferenceChange('personalizedAds', value)}
              />

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleDataDownload}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  Download my data
                </button>
                <button
                  onClick={handleDataDeletion}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  Request data deletion
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, children }) => (
  <button
    className={`flex-1 py-2 rounded-md transition-colors duration-200 ${
      active ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const PreferenceToggle = ({ title, description, enabled, onChange }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <Switch enabled={enabled} onChange={onChange} />
  </div>
);

export default EditProfile;