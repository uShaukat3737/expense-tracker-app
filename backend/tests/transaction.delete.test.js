import request from 'supertest';
import app from '../app.js';
import { getValidUserId } from './utils/authHelper.js';

describe('Delete Transaction', () => {
  let userId, transactionId;

  beforeAll(async () => {
    userId = await getValidUserId();

    const res = await request(app).post('/api/v1/addTransaction').send({
      title: 'Delete Me',
      amount: 999,
      description: 'bye',
      category: 'Test',
      transactionType: 'debit',
      date: '2025-01-01',
      userId,
    });

    // Get ID from DB
    const trans = await import('../models/TransactionModel.js');
    const found = await trans.default.findOne({ user: userId });
    transactionId = found._id;
  });

  it('deletes successfully', async () => {
    const res = await request(app)
      .post(`/api/v1/deleteTransaction/${transactionId}`)
      .send({ userId });

    expect(res.status).toBe(200);
    expect(res.body.message).toContain('deleted');
  });
});