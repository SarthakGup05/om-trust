import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { loginSchema } from '../validation/leadValidation.js';
import { AuthRequest } from '../middleware/auth.js';

/**
 * Public: Admin Login
 * POST /api/auth/login
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = loginSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: parseResult.error.errors.map((e) => e.message).join(', ') || 'Invalid credentials',
      });
      return;
    }

    const { email, password } = parseResult.data;

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('[Auth Controller] JWT_SECRET is not set');
      res.status(500).json({
        success: false,
        message: 'Server configuration error',
      });
      return;
    }

    const token = jwt.sign(
      {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
      },
      secret,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error('[Auth Controller] Login error:', error instanceof Error ? error.message : error);
    res.status(500).json({
      success: false,
      message: 'Failed to process login request',
    });
  }
};

/**
 * Authenticated: Get current logged-in admin
 * GET /api/auth/me
 */
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.admin) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const admin = await Admin.findById(req.admin.id).select('-password');

    if (!admin) {
      res.status(404).json({
        success: false,
        message: 'Admin account not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error('[Auth Controller] GetMe error:', error instanceof Error ? error.message : error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile',
    });
  }
};

/**
 * Authenticated: Logout confirmation
 * POST /api/auth/logout
 */
export const logout = async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
