/**
 * Om Charitable Trust Admin CRM - API Client Service
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TOKEN_STORAGE_KEY = 'om_trust_admin_token';

export interface Lead {
  _id: string;
  id?: string;
  name: string;
  email?: string;
  phone: string;
  city?: string;
  type: 'volunteer' | 'contact' | 'support';
  interest?: string;
  message?: string;
  status: 'new' | 'contacted' | 'follow-up' | 'resolved' | 'closed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  total: number;
  new: number;
  contacted: number;
  followUp: number;
  resolved: number;
  closed: number;
  volunteer: number;
  contact: number;
  support: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
}

export interface LeadsResponse {
  success: boolean;
  data: Lead[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
    }
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

// Authentication API
export const apiLogin = async (email: string, password: string): Promise<{ success: boolean; token: string; admin: AdminUser }> => {
  const data = await apiFetch<{ success: boolean; token: string; admin: AdminUser }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (data.token) {
    setToken(data.token);
  }
  return data;
};

export const apiGetMe = async (): Promise<{ success: boolean; admin: AdminUser }> => {
  return apiFetch<{ success: boolean; admin: AdminUser }>('/api/auth/me');
};

export const apiLogout = async (): Promise<void> => {
  try {
    await apiFetch('/api/auth/logout', { method: 'POST' });
  } finally {
    removeToken();
  }
};

// Leads API
export const apiGetLeads = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  status?: string;
}): Promise<LeadsResponse> => {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());
  if (params.search) query.append('search', params.search);
  if (params.type && params.type !== 'all') query.append('type', params.type);
  if (params.status && params.status !== 'all') query.append('status', params.status);

  return apiFetch<LeadsResponse>(`/api/leads?${query.toString()}`);
};

export const apiGetLeadById = async (id: string): Promise<{ success: boolean; lead: Lead; relatedLeads?: Lead[] }> => {
  return apiFetch<{ success: boolean; lead: Lead; relatedLeads?: Lead[] }>(`/api/leads/${id}`);
};

export const apiUpdateLead = async (
  id: string,
  update: { status?: Lead['status']; notes?: string }
): Promise<{ success: boolean; message: string; lead: Lead }> => {
  return apiFetch<{ success: boolean; message: string; lead: Lead }>(`/api/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(update),
  });
};

export const apiDeleteLead = async (id: string): Promise<{ success: boolean; message: string }> => {
  return apiFetch<{ success: boolean; message: string }>(`/api/leads/${id}`, {
    method: 'DELETE',
  });
};

export const apiGetDashboardStats = async (): Promise<{
  success: boolean;
  stats: DashboardStats;
  recentLeads: Lead[];
}> => {
  return apiFetch<{
    success: boolean;
    stats: DashboardStats;
    recentLeads: Lead[];
  }>('/api/dashboard/stats');
};
