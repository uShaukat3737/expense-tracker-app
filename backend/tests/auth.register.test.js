// tests/auth.register.test.js
import request from 'supertest';
import app from '../app.js';
import User from '../models/UserSchema.js';
import bcrypt from 'bcrypt';               // ← ADD THIS LINE

describe('Register Endpoint', () => {
  it('creates a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'register@test.com',
      password: '123456',
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('register@test.com');
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('fails on duplicate email', async () => {
    // ← THIS IS THE ONLY CHANGE (proper hashed password)
    await User.create({
      name: 'Dup',
      email: 'dup@test.com',
      password: await bcrypt.hash('123456', 10),   // valid hashed password
    });

    const res = await request(app).post('/api/auth/register').send({
      name: 'Dup User',
      email: 'dup@test.com',
      password: '123456',
    });

    expect(res.status).toBe(409);
    expect(res.body.message).toBe('User already Exists');
  });

  it('fails on missing fields', async () => {
    const res = await request(app).post('/api/auth/register').send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Please enter All Fields');
  });
});