// tests/transaction.delete.test.js
import request from 'supertest';
import app from '../app.js';

describe('Delete Transaction', () => {
  let userId, transactionId;

  beforeAll(async () => {
    // Register user
    const userRes = await request(app).post('/api/auth/register').send({
      name: 'Delete User',
      email: `delete${Date.now()}@test.com`,
      password: '123456'
    });
    userId = userRes.body.user._id;

    // Add transaction — CAPTURE ID FROM RESPONSE
    const addRes = await request(app).post('/api/v1/addTransaction').send({
      title: 'To Delete',
      amount: 999,
      description: 'test',
      category: 'Food',
      transactionType: 'expense',
      date: '2025-01-01',
      userId
    });

    // Your API returns the transaction in body — use it!
    transactionId = addRes.body.transaction?._id || addRes.body.newTransaction?._id;
    expect(transactionId).toBeDefined();
  });

  it('deletes successfully', async () => {
    const res = await request(app)
      .post(`/api/v1/deleteTransaction/${transactionId}`)
      .send({ userId });

    expect(res.status).toBe(200);
    expect(res.body.message).toContain('deleted');
  });
});