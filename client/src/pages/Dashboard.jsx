import { useEffect, useState } from 'react';
import { fetchUsers } from '../services/userService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import UserList from '../features/users/UserList';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchUsers();
        setUsers(res.data.users);
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const data = [
    'admin',
    'technician',
    'customerCare',
    'marketing',
    'client',
  ].map((role) => ({
    role,
    count: users.filter((u) => u.role === role).length,
  }));

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-indigo-600">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            User Roles Summary
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 overflow-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            All Users
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading users...</p>
          ) : (
            <UserList />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
