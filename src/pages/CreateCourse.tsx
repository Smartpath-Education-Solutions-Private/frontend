import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Plus, User, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CreateCourse = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [formType, setFormType] = useState('simple');
  
  // Simple form state
  const [simpleTitle, setSimpleTitle] = useState('');
  const [simpleDescription, setSimpleDescription] = useState('');
  const [simpleCategory, setSimpleCategory] = useState('');

  // Detailed form state
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [language, setLanguage] = useState('English');
  const [level, setLevel] = useState('Beginner');
  const [duration, setDuration] = useState('');
  const [pricing, setPricing] = useState('free');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [chapters, setChapters] = useState([
    { id: 1, title: 'Chapter 1: Introduction', videoLink: '', content: '', duration: '' },
  ]);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [newChapter, setNewChapter] = useState({ title: '', videoLink: '', content: '', duration: '' });
  const [courseImage, setCourseImage] = useState(null);
  const [prerequisites, setPrerequisites] = useState('');
  const [learningObjectives, setLearningObjectives] = useState('');

  const handleSimpleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      id: state.courses.length + 1,
      title: simpleTitle,
      description: simpleDescription,
      category: simpleCategory,
      author: state.user,
      status: 'draft',
    };
    dispatch({ type: 'ADD_COURSE', payload: newCourse });
    navigate('/your-courses');
  };

  const handleDetailedSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      id: state.courses.length + 1,
      title: courseTitle,
      description: courseDescription,
      category,
      subcategory,
      language,
      level,
      duration,
      pricing,
      price: pricing === 'paid' ? price : '0',
      currency,
      tags,
      chapters,
      author: state.user,
      status: 'draft',
      image: courseImage,
      prerequisites,
      learningObjectives,
    };
    dispatch({ type: 'ADD_COURSE', payload: newCourse });
    navigate('/your-courses');
  };

  const handleAddChapter = () => {
    setShowChapterModal(true);
  };

  const handleSaveChapter = () => {
    const newChapterId = chapters.length + 1;
    setChapters([...chapters, { id: newChapterId, ...newChapter }]);
    setShowChapterModal(false);
    setNewChapter({ title: '', videoLink: '', content: '', duration: '' });
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAssessment = (chapterId) => {
    navigate(`/upload-assessment/${chapterId}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Create a course</h1>
      
      <div className="mb-6">
        <button
          className={`mr-4 px-4 py-2 rounded-md ${formType === 'simple' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFormType('simple')}
        >
          Simple Form
        </button>
        <button
          className={`px-4 py-2 rounded-md ${formType === 'detailed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFormType('detailed')}
        >
          Detailed Form
        </button>
      </div>

      {formType === 'simple' ? (
        <form onSubmit={handleSimpleSubmit} className="space-y-6">
          <div>
            <label htmlFor="simpleTitle" className="block text-sm font-medium text-gray-700">Course Title</label>
            <input
              type="text"
              id="simpleTitle"
              value={simpleTitle}
              onChange={(e) => setSimpleTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="simpleDescription" className="block text-sm font-medium text-gray-700">Course Description</label>
            <textarea
              id="simpleDescription"
              value={simpleDescription}
              onChange={(e) => setSimpleDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="simpleCategory" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              id="simpleCategory"
              value={simpleCategory}
              onChange={(e) => setSimpleCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Create Course
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleDetailedSubmit} className="space-y-6">
          <div>
            <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">Course Title</label>
            <input
              type="text"
              id="courseTitle"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">Course Description</label>
            <textarea
              id="courseDescription"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">Subcategory</label>
            <input
              type="text"
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (in hours)</label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              min="0"
              step="0.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pricing</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="pricing"
                  value="free"
                  checked={pricing === 'free'}
                  onChange={() => setPricing('free')}
                />
                <span className="ml-2">Free</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="pricing"
                  value="paid"
                  checked={pricing === 'paid'}
                  onChange={() => setPricing('paid')}
                />
                <span className="ml-2">Paid</span>
              </label>
            </div>
          </div>
          {pricing === 'paid' && (
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">{currency}</span>
                </div>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 block w-full pl-12 pr-12 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap">
              {tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                  >
                    <span className="sr-only">Remove tag</span>
                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                      <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Chapters</label>
            {chapters.map((chapter, index) => (
              <div key={chapter.id} className="mt-1 flex justify-between items-center">
                <span>{chapter.title}</span>
                <button
                  type="button"
                  onClick={() => handleAddAssessment(chapter.id)}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Assessment
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddChapter}
              className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Chapter
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {courseImage ? (
                  <img src={courseImage} alt="Course preview" className="mx-auto h-32 w-32 object-cover rounded-md" />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="prerequisites" className="block text-sm font-medium text-gray-700">Prerequisites</label>
            <textarea
              id="prerequisites"
              value={prerequisites}
              onChange={(e) => setPrerequisites(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="List any prerequisites for this course"
            ></textarea>
          </div>
          <div>
            <label htmlFor="learningObjectives" className="block text-sm font-medium text-gray-700">Learning Objectives</label>
            <textarea
              id="learningObjectives"
              value={learningObjectives}
              onChange={(e) => setLearningObjectives(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="What will students learn from this course?"
            ></textarea>
          </div>
          <div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Create Course
            </button>
          </div>
        </form>
      )}

      {showChapterModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-semibold mb-4">Add New Chapter</h3>
            <input
              type="text"
              placeholder="Chapter Title"
              value={newChapter.title}
              onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            />
            <input
              type="text"
              placeholder="Video Link"
              value={newChapter.videoLink}
              onChange={(e) => setNewChapter({ ...newChapter, videoLink: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            />
            <textarea
              placeholder="Chapter Content"
              value={newChapter.content}
              onChange={(e) => setNewChapter({ ...newChapter, content: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
              rows={4}
            ></textarea>
            <input
              type="text"
              placeholder="Chapter Duration (e.g., 1:30)"
              value={newChapter.duration}
              onChange={(e) => setNewChapter({ ...newChapter, duration: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowChapterModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChapter}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save Chapter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourse;