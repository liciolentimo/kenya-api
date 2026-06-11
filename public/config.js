/*
 * KenyaAPI Config
 * ─────────────────────────────────────────
 * DEPLOYMENT CHECKLIST:
 * 1. API_BASE points to the live Railway backend (HTTPS)
 * 2. SITE_URL points to the live Netlify frontend (HTTPS)
 * 3. Redeploy backend on Railway after any server.js changes
 * 4. Redeploy frontend on Netlify after any public/ changes
 * 5. Test CORS: open browser console on Netlify, check for errors
 * ─────────────────────────────────────────
 */

const API_BASE = 'https://kenya-api.netlify.app/api/v1';
const SITE_URL = 'https://kenya-api.netlify.app';
