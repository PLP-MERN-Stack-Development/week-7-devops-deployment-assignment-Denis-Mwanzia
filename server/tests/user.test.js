const app = require('../server');
const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
  const dbUri =
    process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/testdb';
  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/api/users').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      role: 'client',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe('john@example.com');
  });

  it('should return list of users', async () => {
    await User.create({
      name: 'Jane',
      email: 'jane@example.com',
      password: 'abcdef',
      role: 'marketing',
    });
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body.users.length).toBeGreaterThan(0);
  });

  it('should update a user', async () => {
    const user = await User.create({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
      role: 'client',
    });
    const res = await request(app)
      .put(`/api/users/${user._id}`)
      .send({ name: 'John Updated' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.user.name).toBe('John Updated');
  });

  it('should delete a user', async () => {
    const user = await User.create({
      name: 'Delete Me',
      email: 'deleteme@example.com',
      password: '123456',
    });
    const res = await request(app).delete(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('User deleted successfully');
  });
});
