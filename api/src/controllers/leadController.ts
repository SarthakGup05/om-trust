import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Lead } from '../models/Lead.js';
import { createLeadSchema, updateLeadSchema } from '../validation/leadValidation.js';

/**
 * Public: Submit a new lead from website forms.
 * POST /api/leads
 */
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = createLeadSchema.safeParse(req.body);

    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors.map((err) => err.message).join(', ');
      res.status(400).json({
        success: false,
        message: errorDetails || 'Invalid request data',
      });
      return;
    }

    const { name, email, phone, city, type, interest, message } = parseResult.data;

    const lead = await Lead.create({
      name,
      email: email || '',
      phone,
      city: city || '',
      type,
      interest: interest || '',
      message: message || '',
      status: 'new',
      notes: '',
    });

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      lead,
    });
  } catch (error) {
    console.error('[Lead Controller] Error creating lead:', error instanceof Error ? error.message : error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while submitting your request. Please try again.',
    });
  }
};

/**
 * Admin: Get paginated and filtered leads.
 * GET /api/leads?page=1&limit=20&search=rahul&type=volunteer&status=new
 */
export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const search = ((req.query.search as string) || '').trim();
    const type = ((req.query.type as string) || '').trim();
    const status = ((req.query.status as string) || '').trim();

    const filter: Record<string, any> = {};

    if (type && type !== 'all') {
      filter.type = type;
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      const searchRegex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [
        { name: searchRegex },
        { phone: searchRegex },
        { email: searchRegex },
        { city: searchRegex },
      ];
    }

    const total = await Lead.countDocuments(filter);
    const totalPages = Math.ceil(total / limit) || 1;
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('[Lead Controller] Error fetching leads:', error instanceof Error ? error.message : error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve leads',
    });
  }
};

/**
 * Admin: Get single lead by ID with duplicate inquiries check.
 * GET /api/leads/:id
 */
export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid lead ID format',
      });
      return;
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
      return;
    }

    // Optional: Find related leads from the same phone or email
    const relatedLeads = await Lead.find({
      _id: { $ne: lead._id },
      $or: [
        { phone: lead.phone },
        ...(lead.email ? [{ email: lead.email }] : []),
      ],
    })
      .select('name type status createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      lead,
      relatedLeads,
    });
  } catch (error) {
    console.error('[Lead Controller] Error retrieving lead:', error instanceof Error ? error.message : error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve lead details',
    });
  }
};

/**
 * Admin: Update lead status or notes.
 * PATCH /api/leads/:id
 */
export const updateLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid lead ID format',
      });
      return;
    }

    const parseResult = updateLeadSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: parseResult.error.errors.map((e) => e.message).join(', ') || 'Invalid update data',
      });
      return;
    }

    const { status, notes } = parseResult.data;
    const updateData: Record<string, any> = {};

    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({
        success: false,
        message: 'No fields provided for update',
      });
      return;
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      lead: updatedLead,
    });
  } catch (error) {
    console.error('[Lead Controller] Error updating lead:', error instanceof Error ? error.message : error);
    res.status(500).json({
      success: false,
      message: 'Failed to update lead',
    });
  }
};

/**
 * Admin: Delete lead.
 * DELETE /api/leads/:id
 */
export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid lead ID format',
      });
      return;
    }

    const deleted = await Lead.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    console.error('[Lead Controller] Error deleting lead:', error instanceof Error ? error.message : error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete lead',
    });
  }
};

/**
 * Admin: Dashboard statistics aggregation.
 * GET /api/dashboard/stats
 */
export const getDashboardStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [statusStats, typeStats, total, recentLeads] = await Promise.all([
      Lead.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]),
      Lead.aggregate([
        {
          $group: {
            _id: '$type',
            count: { $sum: 1 },
          },
        },
      ]),
      Lead.countDocuments(),
      Lead.find().sort({ createdAt: -1 }).limit(6),
    ]);

    const statusMap = statusStats.reduce((acc: Record<string, number>, item: { _id: string; count: number }) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    const typeMap = typeStats.reduce((acc: Record<string, number>, item: { _id: string; count: number }) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    const stats = {
      total,
      new: statusMap['new'] || 0,
      contacted: statusMap['contacted'] || 0,
      followUp: statusMap['follow-up'] || 0,
      resolved: statusMap['resolved'] || 0,
      closed: statusMap['closed'] || 0,
      volunteer: typeMap['volunteer'] || 0,
      contact: typeMap['contact'] || 0,
      support: typeMap['support'] || 0,
    };

    res.status(200).json({
      success: true,
      stats,
      recentLeads,
    });
  } catch (error) {
    console.error('[Lead Controller] Error retrieving stats:', error instanceof Error ? error.message : error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard statistics',
    });
  }
};

/**
 * Helper function to escape CSV cell fields according to RFC-4180
 */
const escapeCsv = (value: any): string => {
  if (value === null || value === undefined) return '""';
  const stringValue = String(value).replace(/"/g, '""');
  return `"${stringValue}"`;
};

/**
 * Admin: Export all or filtered leads to CSV.
 * GET /api/leads/export
 */
export const exportLeadsCsv = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = ((req.query.search as string) || '').trim();
    const type = ((req.query.type as string) || '').trim();
    const status = ((req.query.status as string) || '').trim();

    const filter: Record<string, any> = {};

    if (type && type !== 'all') {
      filter.type = type;
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      const searchRegex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [
        { name: searchRegex },
        { phone: searchRegex },
        { email: searchRegex },
        { city: searchRegex },
      ];
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });

    const headers = [
      'Lead ID',
      'Name',
      'Phone',
      'Email',
      'City',
      'Source Type',
      'Status',
      'Interest / Category',
      'Submitted Message',
      'Admin Notes',
      'Created At (ISO)',
      'Created Date (IST)',
      'Last Updated (ISO)',
    ];

    const rows = leads.map((lead) => {
      const istDate = new Date(lead.createdAt).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      return [
        escapeCsv(lead._id),
        escapeCsv(lead.name),
        escapeCsv(lead.phone),
        escapeCsv(lead.email || ''),
        escapeCsv(lead.city || ''),
        escapeCsv(lead.type),
        escapeCsv(lead.status),
        escapeCsv(lead.interest || ''),
        escapeCsv(lead.message || ''),
        escapeCsv(lead.notes || ''),
        escapeCsv(lead.createdAt.toISOString()),
        escapeCsv(istDate),
        escapeCsv(lead.updatedAt.toISOString()),
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\r\n');
    const filename = `om_trust_leads_${new Date().toISOString().slice(0, 10)}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.status(200).send(csvContent);
  } catch (error) {
    console.error('[Lead Controller] Error exporting CSV:', error instanceof Error ? error.message : error);
    res.status(500).json({
      success: false,
      message: 'Failed to export leads to CSV',
    });
  }
};

