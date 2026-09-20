import { z } from 'zod';

export const createLeadSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .nullish()
    .or(z.literal('')),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .min(7, 'Phone number must be at least 7 digits')
    .max(30, 'Phone number cannot exceed 30 characters'),
  city: z
    .string()
    .trim()
    .max(100, 'City cannot exceed 100 characters')
    .nullish()
    .or(z.literal('')),
  type: z.enum(['volunteer', 'contact', 'support'], {
    required_error: 'Type is required (volunteer, contact, or support)',
    invalid_type_error: 'Type must be volunteer, contact, or support',
  }),
  interest: z
    .string()
    .trim()
    .max(200, 'Interest cannot exceed 200 characters')
    .nullish()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .max(2000, 'Message cannot exceed 2000 characters')
    .nullish()
    .or(z.literal('')),
});

export const updateLeadSchema = z.object({
  status: z
    .enum(['new', 'contacted', 'follow-up', 'resolved', 'closed'], {
      invalid_type_error: 'Invalid status value',
    })
    .optional(),
  notes: z
    .string()
    .trim()
    .max(5000, 'Notes cannot exceed 5000 characters')
    .optional(),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Invalid email address'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});
