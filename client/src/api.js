import axios from 'axios';

// In production (Docker/K8s), the nginx config will proxy /api to the backend.
// In dev, vite.config.js proxy handles it.
const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Skills ───
export const getSkills = () => api.get('/skills');
export const seedSkills = () => api.post('/skills/seed');

// ─── Activities ───
export const getActivities = (skillId) =>
  api.get('/activities', { params: skillId ? { skill: skillId } : {} });
export const createActivity = (data) => api.post('/activities', data);
export const deleteActivity = (id) => api.delete(`/activities/${id}`);

// ─── Children ───
export const getChildren = () => api.get('/children');
export const getChild = (id) => api.get(`/children/${id}`);
export const createChild = (data) => api.post('/children', data);
export const deleteChild = (id) => api.delete(`/children/${id}`);
export const completeActivity = (childId, data) =>
  api.post(`/children/${childId}/complete-activity`, data);

// ─── Health ───
export const healthCheck = () => api.get('/health');

export default api;
