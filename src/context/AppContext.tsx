import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// ... (previous interfaces and types)

const initialState: AppState = {
  user: null,
  preferences: {
    aiRecommendations: true,
    emailNotifications: true,
    collaborativeLearning: false,
    learningStyle: 'visual',
    dailyStudyGoal: 2,
    learningProgress: 0,
    recentAchievements: [],
    profileVisibility: true,
    showCourseProgress: true,
    allowDirectMessages: true,
    dataSharing: 'limited',
    usageAnalytics: true,
    personalizedAds: false,
  },
  courses: [],
  mentorship: {
    mentors: [],
    scheduledSessions: [],
    historySessions: [],
  },
  isAuthenticated: false,
  userMode: 'taker',
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'UPDATE_PREFERENCES':
      return { ...state, preferences: { ...state.preferences, ...action.payload } };
    case 'ADD_COURSES':
      return { ...state, courses: [...state.courses, ...action.payload] };
    case 'ADD_COURSE':
      return { ...state, courses: [...state.courses, action.payload] };
    case 'DELETE_COURSE':
      return { ...state, courses: state.courses.filter(course => course.id !== action.payload) };
    case 'UPDATE_COURSE':
      return { ...state, courses: state.courses.map(course => course.id === action.payload.id ? action.payload : course) };
    case 'UPDATE_MENTORSHIP':
      return { ...state, mentorship: { ...state.mentorship, ...action.payload } };
    case 'SIGN_IN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'SIGN_OUT':
      return { ...state, user: null, isAuthenticated: false, userMode: 'taker' };
    case 'SWITCH_MODE':
      return { ...state, userMode: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};