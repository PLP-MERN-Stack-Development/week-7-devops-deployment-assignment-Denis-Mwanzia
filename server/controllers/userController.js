const User = require('../models/User');

// @desc    Create new user
// @route   POST /api/users
// @access  Public
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Public
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
