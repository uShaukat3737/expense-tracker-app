import request from 'supertest';
import app from '../app.js';
import { getValidUserId } from './utils/authHelper.js';
import Transaction from '../models/TransactionModel.js';

describe('Update Transaction', () => {
  let userId, transactionId;

  beforeAll(async () => {
    userId = await getValidUserId();

    const res = await request(app).post('/api/v1/addTransaction').send({
      title: 'Old One',
      amount: 100,
      description: 'test',
      category: 'Test',
      transactionType: 'debit',
      date: '2025-01-01',
      userId,
    });

    const trans = await Transaction.findOne({ user: userId });
    transactionId = trans._id;
  });

  it('updates successfully', async () => {
    const res = await request(app)
      .put(`/api/v1/updateTransaction/${transactionId}`)
      .send({ title: 'NEW TITLE 2025' });

    expect(res.status).toBe(200);
    expect(res.body.transaction.title).toBe('NEW TITLE 2025');
  });
});