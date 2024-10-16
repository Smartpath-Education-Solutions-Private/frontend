import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import AIAssistance from './pages/AIAssistance';
import UploadCourse from './pages/UploadCourse';
import Assessment from './pages/Assessment';
import Mentorship from './pages/Mentorship';
import YourCourses from './pages/YourCourses';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import ReviewAndPublish from './pages/ReviewAndPublish';
import TakeAssessment from './pages/TakeAssessment';
import UploadAssessment from './pages/UploadAssessment';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LearningPath from './pages/LearningPath';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Leaderboard from './pages/Leaderboard';
import AdminDashboard from './pages/AdminDashboard';
import { AppProvider, useAppContext } from './context/AppContext';

const PrivateRoute = ({ children }) => {
  const { state } = useAppContext();
  return state.isAuthenticated ? children : <Navigate to="/" />;
};

const AdminRoute = ({ children }) => {
  const { state } = useAppContext();
  return state.isAuthenticated && state.user.role === 'admin' ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

function AppContent() {
  const { state } = useAppContext();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            {state.isAuthenticated && (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit-profile"
                  element={
                    <PrivateRoute>
                      <EditProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/courses"
                  element={
                    <PrivateRoute>
                      <Courses />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/courses/:id"
                  element={
                    <PrivateRoute>
                      <CourseDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/ai-assistance"
                  element={
                    <PrivateRoute>
                      <AIAssistance />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/upload-course"
                  element={
                    <PrivateRoute>
                      <UploadCourse />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/assessment/:courseId"
                  element={
                    <PrivateRoute>
                      <Assessment />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/mentorship"
                  element={
                    <PrivateRoute>
                      <Mentorship />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/your-courses"
                  element={
                    <PrivateRoute>
                      <YourCourses />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/create-course"
                  element={
                    <PrivateRoute>
                      <CreateCourse />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit-course/:courseId"
                  element={
                    <PrivateRoute>
                      <EditCourse />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/review-and-publish/:chapterId"
                  element={
                    <PrivateRoute>
                      <ReviewAndPublish />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/take-assessment/:courseId"
                  element={
                    <PrivateRoute>
                      <TakeAssessment />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/upload-assessment/:chapterId"
                  element={
                    <PrivateRoute>
                      <UploadAssessment />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/learning-path"
                  element={
                    <PrivateRoute>
                      <LearningPath />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin-dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
              </>
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
