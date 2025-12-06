// tests/transaction.add.test.js
import request from 'supertest';
import app from '../app.js';

describe('Add Transaction', () => {
  let userId;

  beforeAll(async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Add User',
      email: `add${Date.now()}@test.com`,
      password: '123456'
    });
    userId = res.body.user._id;
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
});