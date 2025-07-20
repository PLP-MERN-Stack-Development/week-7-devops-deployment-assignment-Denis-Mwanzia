import { useEffect, useState } from 'react';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../services/userService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
  });
  const [editUser, setEditUser] = useState(null);

  const loadUsers = async () => {
    const res = await fetchUsers();
    setUsers(res.data.users);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await updateUser(editUser._id, {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        });
      } else {
        await createUser(formData);
      }

      loadUsers();
      setModalOpen(false);
      setFormData({ name: '', email: '', password: '', role: 'client' });
      setEditUser(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error submitting form');
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      loadUsers();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <button
          onClick={() => {
            setEditUser(null);
            setFormData({ name: '', email: '', password: '', role: 'client' });
            setModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200"
        >
          + Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border rounded-lg">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 transition">
                <td className="p-3 border">{u.name}</td>
                <td className="p-3 border">{u.email}</td>
                <td className="p-3 border capitalize">{u.role}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(u)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {editUser ? 'Edit User' : 'Add New User'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              {!editUser && (
                <input
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              )}
              <select
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="admin">Admin</option>
                <option value="technician">Technician</option>
                <option value="customerCare">Customer Care</option>
                <option value="marketing">Marketing</option>
                <option value="client">Client</option>
              </select>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditUser(null);
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {editUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
