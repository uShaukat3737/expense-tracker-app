// tests/auth.avatar.test.js
import request from 'supertest';
import app from '../app.js';

let userId;

beforeAll(async () => {
  const res = await request(app).post('/api/auth/register').send({
    name: 'Avatar User',
    email: 'avatar@test.com',
    password: '123456',
  });
  userId = res.body.user._id;
});

describe('Set Avatar Endpoint', () => {
  it('sets avatar image', async () => {
    const res = await request(app).post(`/api/auth/setAvatar/${userId}`).send({
      image: 'base64:image-data-here',
    });
    expect(res.status).toBe(200);
    expect(res.body.isSet).toBe(true);
    expect(res.body.image).toBe('base64:image-data-here');
  });
});