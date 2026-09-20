import rateLimit from 'express-rate-limit';

// Public lead submission limiter: max 30 submissions per 15 minutes per IP
export const leadSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false, xForwardedForHeader: false },
  message: {
    success: false,
    message: 'Too many submissions from this IP address. Please try again after 15 minutes.',
  },
});

// Admin login attempt limiter: max 20 attempts per 15 minutes per IP
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false, xForwardedForHeader: false },
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
});
