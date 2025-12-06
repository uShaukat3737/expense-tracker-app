// tests/auth.avatar.test.js
import request from 'supertest';
import app from '../app.js';

describe('Set Avatar Endpoint', () => {
  let userId;

  beforeAll(async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Avatar User',
      email: `avatar${Date.now()}@test.com`,
      password: '123456'
    });
    userId = res.body.user._id;
  });

  it('sets avatar image successfully', async () => {
    const res = await request(app)
      .post(`/api/auth/setAvatar/${userId}`)
      .send({ image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test' });

    expect(res.status).toBe(200);
    expect(res.body.isSet).toBe(true);
    expect(res.body.image).toContain('dicebear');
  });
});