const request = require('supertest');
const app = require('../app');

describe('Counties API', () => {
  it('returns the full list of counties with population and headquarters', async () => {
    const res = await request(app).get('/api/v1/counties');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(47);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0]).toHaveProperty('headquarters');
    expect(res.body.data[0]).toHaveProperty('population');
  });

  it('filters counties by region', async () => {
    const res = await request(app).get('/api/v1/counties?region=Coast');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.every((item) => item.region === 'Coast')).toBe(true);
  });

  it('sorts counties by population descending', async () => {
    const res = await request(app).get('/api/v1/counties?sort=population_desc');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data[0].population).toBeGreaterThanOrEqual(res.body.data[1].population);
  });

  it('returns a single county by id with population data', async () => {
    const res = await request(app).get('/api/v1/counties/1');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(1);
    expect(res.body.data.headquarters).toBe('Mombasa City');
    expect(res.body.data.population).toBe(1208333);
  });

  it('returns 404 for an unknown county id', async () => {
    const res = await request(app).get('/api/v1/counties/999');

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('not found');
  });
});
