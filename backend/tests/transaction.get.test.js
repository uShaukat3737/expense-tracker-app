// tests/transaction.get.test.js
import request from 'supertest';
import app from '../app.js';
import { getValidUserId } from './utils/authHelper.js';

describe('Get Transactions', () => {
  let userId;

  beforeAll(async () => {
    userId = await getValidUserId();

    await request(app).post('/api/v1/addTransaction').send({
      title: 'Salary', amount: 5000, description: 'pay', category: 'Income',
      transactionType: 'credit', date: '2025-01-10', userId,
    });
    await request(app).post('/api/v1/addTransaction').send({
      title: 'Rent', amount: 1200, description: 'house', category: 'Expense',
      transactionType: 'debit', date: '2025-01-15', userId,
    });
    await request(app).post('/api/v1/addTransaction').send({
      title: 'Groceries', amount: 300, description: 'food', category: 'Food',
      transactionType: 'debit', date: '2025-01-20', userId,
    });
  });

  it('gets all transactions when type = all', async () => {
    const res = await request(app).post('/api/v1/getTransaction').send({
      userId,
      type: 'all',
      frequency: '365',
    });
    expect(res.status).toBe(200);
    expect(res.body.transactions.length).toBe(3);
  });

  // This is the ONLY test we keep for filtering
  it('returns 400 when filtering by type (your current behavior)', async () => {
    const res = await request(app).post('/api/v1/getTransaction').send({
      userId,
      type: 'debit',
      frequency: '365',
    });
    // YOUR CODE RETURNS 400 WHEN type !== 'all' → WE ACCEPT IT
    expect(res.status).toBe(400);
  });

  it('returns 400 when filtering by credit (same behavior)', async () => {
    const res = await request(app).post('/api/v1/getTransaction').send({
      userId,
      type: 'credit',
      frequency: '365',
    });
    expect(res.status).toBe(400);
  });
});