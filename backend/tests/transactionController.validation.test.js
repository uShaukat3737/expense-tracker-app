// tests/transactionController.validation.test.js
import request from 'supertest';
import app from '../app.js';

describe('transactionController — Real Validation', () => {
  let userId;

  beforeAll(async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Trans User',
      email: `trans${Date.now()}@test.com`,
      password: '123456'
    });
    userId = res.body.user._id;
  });

  it('addTransaction → fails on missing fields', async () => {
    const res = await request(app).post('/api/v1/addTransaction').send({ userId });
    expect(res.status).toBe(408);
    expect(res.body.messages).toBe('Please Fill all fields');
  });

  it('deleteTransaction → returns "User not found" on invalid ID', async () => {
    const res = await request(app).post('/api/v1/deleteTransaction/666f6f6f666f666f666f666f').send({
      userId
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User not found'); // Your real behavior
  });

  it('updateTransaction → returns 400 on invalid ID', async () => {
    const res = await request(app).put('/api/v1/updateTransaction/666f6f6f666f666f666f666f').send({
      title: 'Fail'
    });
    expect(res.status).toBe(400);
  });
});