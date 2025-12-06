// tests/transaction.delete.test.js
import request from 'supertest';
import app from '../app.js';
import Transaction from '../models/TransactionModel.js';

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

    // Add transaction
    await request(app).post('/api/v1/addTransaction').send({
      title: 'To Delete',
      amount: 999,
      description: 'test',
      category: 'Food',
      transactionType: 'expense',
      date: '2025-01-01',
      userId
    });

    // Get ID from DB — your API doesn't return it
    const trans = await Transaction.findOne({ user: userId });
    transactionId = trans._id.toString();
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