const request = require('supertest');
const app = require('../app');

describe('Institutions API', () => {
  it('returns the full institutions list', async () => {
    const res = await request(app).get('/api/v1/institutions');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.total).toBeGreaterThanOrEqual(res.body.count);
  });

  it('returns a single institution by id', async () => {
    const res = await request(app).get('/api/v1/institutions/1');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(1);
    expect(res.body.data.name).toBeDefined();
  });

  it('returns 404 for a missing institution id', async () => {
    const res = await request(app).get('/api/v1/institutions/999');

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('not found');
  });

  it('returns institutions for a valid county', async () => {
    const res = await request(app).get('/api/v1/institutions/county/1');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBeGreaterThan(0);
    expect(res.body.data.every((item) => item.county_id === 1)).toBe(true);
  });

  it('validates institution type', async () => {
    const res = await request(app).get('/api/v1/institutions/type/University');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.type).toBe('University');
  });

  it('returns 400 for invalid institution type', async () => {
    const res = await request(app).get('/api/v1/institutions/type/InvalidType');

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('searches institutions by query term', async () => {
    const res = await request(app).get('/api/v1/institutions/search?q=Mombasa');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBeGreaterThan(0);
    expect(res.body.data[0].county_name).toBe('Mombasa');
  });

  it('returns 400 for too short search query', async () => {
    const res = await request(app).get('/api/v1/institutions/search?q=a');

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
