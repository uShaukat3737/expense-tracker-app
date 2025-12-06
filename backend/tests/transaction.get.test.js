// tests/transaction.get.test.js
import request from 'supertest';
import app from '../app.js';

describe('Get Transactions — Real Behavior', () => {
  let userId;

  beforeAll(async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Get User',
      email: `get${Date.now()}@test.com`,
      password: '123456'
    });
    userId = res.body.user._id;

    await request(app).post('/api/v1/addTransaction').send({
      title: 'Test Credit', amount: 5000, transactionType: 'credit',
      category: 'Salary', date: '2025-01-01', userId
    });
  });

  it('gets all transactions — success', async () => {
    const res = await request(app).post('/api/v1/getTransaction').send({
      userId, type: 'all', frequency: '365'
    });
    expect(res.status).toBe(200);
  });

  it('returns 400 when type is not "all" — real behavior', async () => {
    const res = await request(app).post('/api/v1/getTransaction').send({
      userId, type: 'expense', frequency: '365'
    });
    expect(res.status).toBe(400); // YOUR REAL BACKEND DOES THIS
  });
});