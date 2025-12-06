// tests/app.test.js
import request from 'supertest';
import app from '../app.js';

describe('App.js — Health Route', () => {
  it('GET /api/health → returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});