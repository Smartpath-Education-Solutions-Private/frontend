import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state, dispatch } = useAppContext();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    dispatch({ type: 'SIGN_OUT' });
    navigate('/');
  };

  const handleSwitchMode = () => {
    dispatch({
      type: 'SWITCH_MODE',
      payload: state.userMode === 'creator' ? 'taker' : 'creator',
    });
  };

  if (!state.isAuthenticated) {
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600">
                Smart Path
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/signin" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600">
                Smart Path
              </span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <NavLink
                  to="/profile"
                  active={location.pathname === '/profile'}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/dashboard"
                  active={location.pathname === '/dashboard'}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/courses"
                  active={location.pathname === '/courses'}
                >
                  Courses
                </NavLink>
                <NavLink
                  to="/ai-assistance"
                  active={location.pathname === '/ai-assistance'}
                >
                  AI Assistance
                </NavLink>
                <NavLink
                  to="/mentorship"
                  active={location.pathname === '/mentorship'}
                >
                  Mentorship
                </NavLink>
                <NavLink
                  to="/leaderboard"
                  active={location.pathname === '/leaderboard'}
                >
                  Leaderboard
                </NavLink>
                {state.userMode === 'creator' && (
                  <NavLink
                    to="/your-courses"
                    active={location.pathname === '/your-courses'}
                  >
                    Your Courses
                  </NavLink>
                )}
                {state.user.role === 'admin' && (
                  <NavLink
                    to="/admin-dashboard"
                    active={location.pathname === '/admin-dashboard'}
                  >
                    Admin Dashboard
                  </NavLink>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <Bell className="h-6 w-6" />
            </button>
            <div className="ml-3 relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={state.user.profilePicture}
                  alt="User avatar"
                />
                <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
              </button>
              {isProfileMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Link
                    to="/edit-profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Edit Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleSwitchMode}
                  >
                    Switch to{' '}
                    {state.userMode === 'creator' ? 'Taker' : 'Creator'} Mode
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 inline-block mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
            <div className="ml-3 md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink
              to="/profile"
              active={location.pathname === '/profile'}
            >
              Profile
            </MobileNavLink>
            <MobileNavLink
              to="/dashboard"
              active={location.pathname === '/dashboard'}
            >
              Dashboard
            </MobileNavLink>
            <MobileNavLink
              to="/courses"
              active={location.pathname === '/courses'}
            >
              Courses
            </MobileNavLink>
            <MobileNavLink
              to="/ai-assistance"
              active={location.pathname === '/ai-assistance'}
            >
              AI Assistance
            </MobileNavLink>
            <MobileNavLink
              to="/mentorship"
              active={location.pathname === '/mentorship'}
            >
              Mentorship
            </MobileNavLink>
            <MobileNavLink
              to="/leaderboard"
              active={location.pathname === '/leaderboard'}
            >
              Leaderboard
            </MobileNavLink>
            {state.userMode === 'creator' && (
              <MobileNavLink
                to="/your-courses"
                active={location.pathname === '/your-courses'}
              >
                Your Courses
              </MobileNavLink>
            )}
            {state.user.role === 'admin' && (
              <MobileNavLink
                to="/admin-dashboard"
                active={location.pathname === '/admin-dashboard'}
              >
                Admin Dashboard
              </MobileNavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-md text-sm font-medium ${
      active
        ? 'text-primary-600 bg-primary-50'
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`block px-3 py-2 rounded-md text-base font-medium ${
      active
        ? 'text-primary-600 bg-primary-50'
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
    }`}
  >
    {children}
  </Link>
);

export default Navbar;
