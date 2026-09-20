/**
 * Om Charitable Trust Admin CRM - API Client Service
 */

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.replace(/\/+$/, '');
  }
  // During local dev or same-origin, default to empty string so /api is proxied or direct
  return '';
};

const TOKEN_STORAGE_KEY = 'om_trust_admin_token';

export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

async function apiFetch(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${baseUrl}${endpoint}`;

  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (err) {
    // If relative fetch failed, try direct localhost:5000 in dev or Render in prod
    if (!baseUrl && endpoint.startsWith('/api')) {
      try {
        response = await fetch(`http://localhost:5000${endpoint}`, {
          ...options,
          headers,
        });
      } catch {
        response = await fetch(`https://om-trust.onrender.com${endpoint}`, {
          ...options,
          headers,
        });
      }
    } else {
      throw err;
    }
  }

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
export const apiLogin = async (email, password) => {
  const data = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (data.token) {
    setToken(data.token);
  }
  return data;
};

export const apiGetMe = async () => {
  return apiFetch('/api/auth/me');
};

export const apiLogout = async () => {
  try {
    await apiFetch('/api/auth/logout', { method: 'POST' });
  } finally {
    removeToken();
  }
};

// Leads API
export const apiGetLeads = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());
  if (params.search) query.append('search', params.search);
  if (params.type && params.type !== 'all') query.append('type', params.type);
  if (params.status && params.status !== 'all') query.append('status', params.status);

  return apiFetch(`/api/leads?${query.toString()}`);
};

export const apiGetLeadById = async (id) => {
  return apiFetch(`/api/leads/${id}`);
};

export const apiUpdateLead = async (id, update) => {
  return apiFetch(`/api/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(update),
  });
};

export const apiDeleteLead = async (id) => {
  return apiFetch(`/api/leads/${id}`, {
    method: 'DELETE',
  });
};

export const apiGetDashboardStats = async () => {
  return apiFetch('/api/dashboard/stats');
};
