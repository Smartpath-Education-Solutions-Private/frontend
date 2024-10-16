import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Users, BookOpen, TrendingUp, DollarSign } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AdminDashboard = () => {
  const { state } = useAppContext();
  const [studentData, setStudentData] = useState({
    totalStudents: 0,
    totalEnrollments: 0,
    averageProgress: 0,
    totalRevenue: 0,
  });

  const [enrollmentData, setEnrollmentData] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // For now, we'll use mock data
    setStudentData({
      totalStudents: 1250,
      totalEnrollments: 3500,
      averageProgress: 68,
      totalRevenue: 75000,
    });

    setEnrollmentData([
      { name: 'Jan', enrollments: 200 },
      { name: 'Feb', enrollments: 300 },
      { name: 'Mar', enrollments: 400 },
      { name: 'Apr', enrollments: 350 },
      { name: 'May', enrollments: 500 },
      { name: 'Jun', enrollments: 450 },
    ]);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="w-8 h-8 text-blue-500" />}
          title="Total Students"
          value={studentData.totalStudents.toLocaleString()}
        />
        <StatCard
          icon={<BookOpen className="w-8 h-8 text-green-500" />}
          title="Total Enrollments"
          value={studentData.totalEnrollments.toLocaleString()}
        />
        <StatCard
          icon={<TrendingUp className="w-8 h-8 text-yellow-500" />}
          title="Average Progress"
          value={`${studentData.averageProgress}%`}
        />
        <StatCard
          icon={<DollarSign className="w-8 h-8 text-purple-500" />}
          title="Total Revenue"
          value={`$${studentData.totalRevenue.toLocaleString()}`}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Enrollment Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={enrollmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="enrollments" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Add more sections for student progress, popular courses, etc. */}
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
    <div className="mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
