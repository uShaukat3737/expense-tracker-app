import request from 'supertest';
import app from '../app.js';
import { getValidUserId } from './utils/authHelper.js';

describe('Add Transaction', () => {
  let userId;

  beforeAll(async () => {
    userId = await getValidUserId();
  });

  it('adds transaction successfully', async () => {
    const res = await request(app).post('/api/v1/addTransaction').send({
      title: 'Coffee',
      amount: 50,
      description: 'Morning coffee',
      category: 'Food',
      transactionType: 'debit',
      date: '2025-01-01',
      userId,
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Transaction Added Successfully');
  });

  it('fails on missing fields', async () => {
    const res = await request(app).post('/api/v1/addTransaction').send({ userId });
    expect(res.status).toBe(408);
  });
});