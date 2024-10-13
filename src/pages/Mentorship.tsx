import React, { useState, useEffect } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Mentorship = () => {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMentorModal, setShowAddMentorModal] = useState(false);
  const [newMentor, setNewMentor] = useState({ name: '', institution: '', field: '', image: '' });
  const [showScheduleConfirmation, setShowScheduleConfirmation] = useState(false);
  const [scheduledMentor, setScheduledMentor] = useState(null);

  useEffect(() => {
    // Initialize mentorship data if it's empty
    if (state.mentorship.mentors.length === 0) {
      dispatch({
        type: 'UPDATE_MENTORSHIP',
        payload: {
          mentors: [
            {
              id: 1,
              name: 'Eva M.',
              institution: 'Stanford University',
              field: 'Engineering',
              degree: 'PhD',
              image: 'https://i.pravatar.cc/150?img=1',
            },
            {
              id: 2,
              name: 'Alex T.',
              company: 'Google',
              position: 'Software Engineer',
              experience: '5 years',
              image: 'https://i.pravatar.cc/150?img=2',
            },
            {
              id: 3,
              name: 'Rachel S.',
              institution: 'Harvard University',
              field: 'Business',
              degree: 'MBA',
              image: 'https://i.pravatar.cc/150?img=3',
            },
          ],
        },
      });
    }
  }, []);

  const filteredMentors = state.mentorship.mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMentor = () => {
    const newMentorWithId = {
      ...newMentor,
      id: state.mentorship.mentors.length + 1,
    };
    dispatch({
      type: 'UPDATE_MENTORSHIP',
      payload: {
        mentors: [...state.mentorship.mentors, newMentorWithId],
      },
    });
    setShowAddMentorModal(false);
    setNewMentor({ name: '', institution: '', field: '', image: '' });
  };

  const handleScheduleSession = (mentor) => {
    const newSession = {
      id: state.mentorship.scheduledSessions.length + 1,
      name: mentor.name,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      image: mentor.image,
    };
    dispatch({
      type: 'UPDATE_MENTORSHIP',
      payload: {
        scheduledSessions: [...state.mentorship.scheduledSessions, newSession],
      },
    });
    setScheduledMentor(mentor);
    setShowScheduleConfirmation(true);
  };

  const handleCancelSession = (sessionId) => {
    const updatedSessions = state.mentorship.scheduledSessions.filter(
      (session) => session.id !== sessionId
    );
    dispatch({
      type: 'UPDATE_MENTORSHIP',
      payload: {
        scheduledSessions: updatedSessions,
      },
    });
  };

  const handleCompleteSession = (session) => {
    const updatedScheduledSessions = state.mentorship.scheduledSessions.filter(
      (s) => s.id !== session.id
    );
    const updatedHistorySessions = [...state.mentorship.historySessions, session];
    dispatch({
      type: 'UPDATE_MENTORSHIP',
      payload: {
        scheduledSessions: updatedScheduledSessions,
        historySessions: updatedHistorySessions,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Smart Path Mentorship</h1>

      <div className="mb-8">
        <div className="flex space-x-4 mb-4">
          <TabButton active={activeTab === 'available'} onClick={() => setActiveTab('available')}>
            Available
          </TabButton>
          <TabButton active={activeTab === 'scheduled'} onClick={() => setActiveTab('scheduled')}>
            Scheduled
          </TabButton>
          <TabButton active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
            History
          </TabButton>
        </div>

        {activeTab === 'available' && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Available mentors</h2>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search by mentor name"
                className="w-full p-3 pl-10 bg-white rounded-lg shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3 text-gray-400" />
            </div>

            <div className="space-y-4">
              {filteredMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex items-center">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{mentor.name}</h3>
                      <p className="text-sm text-gray-500">
                        {mentor.institution || mentor.company},{' '}
                        {mentor.field || mentor.position}
                        {mentor.degree && `, ${mentor.degree}`}
                        {mentor.experience && `, ${mentor.experience}`}
                      </p>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => handleScheduleSession(mentor)}
                  >
                    Schedule
                  </button>
                </div>
              ))}
            </div>

            <button
              className="mt-4 flex items-center text-blue-500"
              onClick={() => setShowAddMentorModal(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add new mentor
            </button>
          </>
        )}

        {activeTab === 'scheduled' && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Scheduled sessions</h2>
            <div className="space-y-4">
              {state.mentorship.scheduledSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex items-center">
                    <img
                      src={session.image}
                      alt={session.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{session.name}</h3>
                      <p className="text-sm text-gray-500">
                        {session.date}, {session.time}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
                      onClick={() => handleCompleteSession(session)}
                    >
                      Complete
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg"
                      onClick={() => handleCancelSession(session.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'history' && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Session history</h2>
            <div className="space-y-4">
              {state.mentorship.historySessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex items-center">
                    <img
                      src={session.image}
                      alt={session.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{session.name}</h3>
                      <p className="text-sm text-gray-500">
                        {session.date}, {session.time}
                      </p>
                    </div>
                  </div>
                  <span className="text-green-500">Completed</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {showAddMentorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Mentor</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-2 border rounded"
              value={newMentor.name}
              onChange={(e) => setNewMentor({ ...newMentor, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Institution"
              className="w-full p-2 mb-2 border rounded"
              value={newMentor.institution}
              onChange={(e) => setNewMentor({ ...newMentor, institution: e.target.value })}
            />
            <input
              type="text"
              placeholder="Field"
              className="w-full p-2 mb-2 border rounded"
              value={newMentor.field}
              onChange={(e) => setNewMentor({ ...newMentor, field: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full p-2 mb-4 border rounded"
              value={newMentor.image}
              onChange={(e) => setNewMentor({ ...newMentor, image: e.target.value })}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg mr-2"
                onClick={() => setShowAddMentorModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleAddMentor}
              >
                Add Mentor
              </button>
            </div>
          </div>
        </div>
      )}

      {showScheduleConfirmation && scheduledMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Session Scheduled</h2>
            <p>
              Your session with {scheduledMentor.name} has been scheduled for{' '}
              {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => {
                setShowScheduleConfirmation(false);
                setActiveTab('scheduled');
              }}
            >
              View Scheduled Sessions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const TabButton = ({ active, onClick, children }) => (
  <button
    className={`px-4 py-2 rounded-full ${
      active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Mentorship;