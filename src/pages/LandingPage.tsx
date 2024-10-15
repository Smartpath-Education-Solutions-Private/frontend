import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, Brain, Award, BarChart, Zap, Globe } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Unlock Your Potential with Smart Path Learning
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Embark on a personalized learning journey powered by AI and guided by industry experts.
              </p>
              <div className="space-x-4">
                <Link to="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-50 transition duration-300 shadow-lg hover:shadow-xl">
                  Get Started
                </Link>
                <Link to="/signin" className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-400 transition duration-300 shadow-lg hover:shadow-xl">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Smart Path Learning?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-yellow-400" />}
              title="AI-Powered Learning"
              description="Experience personalized course recommendations and adaptive assessments tailored to your unique learning style."
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-green-500" />}
              title="Expert Mentorship"
              description="Connect with industry professionals for guidance, support, and insider knowledge throughout your learning journey."
            />
            <FeatureCard
              icon={<Brain className="w-12 h-12 text-purple-500" />}
              title="Interactive Content"
              description="Engage with dynamic lessons, quizzes, and hands-on projects designed to reinforce your knowledge and skills."
            />
            <FeatureCard
              icon={<Award className="w-12 h-12 text-red-500" />}
              title="Recognized Certificates"
              description="Earn industry-recognized certificates to showcase your newly acquired skills and boost your career prospects."
            />
            <FeatureCard
              icon={<BarChart className="w-12 h-12 text-blue-500" />}
              title="Progress Tracking"
              description="Monitor your learning journey with detailed analytics, performance insights, and personalized improvement suggestions."
            />
            <FeatureCard
              icon={<Globe className="w-12 h-12 text-indigo-500" />}
              title="Global Learning Community"
              description="Join a diverse community of learners from around the world, fostering collaboration and cross-cultural exchange."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Learners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Smart Path Learning transformed my career. The AI-powered recommendations and expert mentorship were game-changers!"
              author="Sarah J., Software Engineer"
            />
            <TestimonialCard
              quote="The interactive content and global community made learning enjoyable and helped me stay motivated throughout my journey."
              author="Michael L., Data Scientist"
            />
            <TestimonialCard
              quote="Earning a recognized certificate through Smart Path Learning opened up new opportunities in my field. Highly recommended!"
              author="Emily R., UX Designer"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Future?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Smart Path Learning today and unlock a world of possibilities. Your journey to success starts here!
          </p>
          <Link to="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-50 transition duration-300 shadow-lg hover:shadow-xl inline-block">
            Start Learning Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Smart Path Learning</h3>
              <p className="text-gray-400">Empowering learners worldwide</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <Link to="/about" className="hover:text-blue-300 mb-2 md:mb-0">About</Link>
              <Link to="/contact" className="hover:text-blue-300 mb-2 md:mb-0">Contact</Link>
              <Link to="/privacy" className="hover:text-blue-300 mb-2 md:mb-0">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-blue-300 mb-2 md:mb-0">Terms of Service</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 Smart Path Learning. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
    <div className="flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, author }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <p className="text-gray-600 mb-6 italic">"{quote}"</p>
    <p className="font-semibold text-right">- {author}</p>
  </div>
);

export default LandingPage;