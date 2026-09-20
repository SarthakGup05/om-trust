import { Router } from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getDashboardStats,
  exportLeadsCsv,
} from '../controllers/leadController.js';
import { login, getMe, logout } from '../controllers/authController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { leadSubmissionLimiter, authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// ==========================================
// PUBLIC HEALTH CHECK
// ==========================================
router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// ==========================================
// PUBLIC LEAD SUBMISSION (Rate Limited)
// ==========================================
router.post('/leads', leadSubmissionLimiter, createLead);

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================
router.post('/auth/login', authLimiter, login);
router.post('/auth/logout', authenticateAdmin, logout);
router.get('/auth/me', authenticateAdmin, getMe);

// ==========================================
// ADMIN PROTECTED LEAD & DASHBOARD ROUTES
// ==========================================
router.get('/dashboard/stats', authenticateAdmin, getDashboardStats);
router.get('/leads/export', authenticateAdmin, exportLeadsCsv);
router.get('/leads', authenticateAdmin, getLeads);
router.get('/leads/:id', authenticateAdmin, getLeadById);
router.patch('/leads/:id', authenticateAdmin, updateLead);
router.delete('/leads/:id', authenticateAdmin, deleteLead);

export default router;
