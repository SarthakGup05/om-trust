/**
 * Om Charitable Trust - API Service
 * Handles communication with the Express backend REST API.
 */

const getApiEndpoint = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return `${envUrl.replace(/\/+$/, '')}/api/leads`;
  }
  // If no external URL provided, use relative path (proxied by Vite or on same host)
  return '/api/leads';
};

/**
 * Submits a lead inquiry (Volunteer, Contact, or Support) to the backend.
 *
 * @param {Object} leadData
 * @param {string} leadData.name
 * @param {string} [leadData.email]
 * @param {string} leadData.phone
 * @param {string} [leadData.city]
 * @param {'volunteer' | 'contact' | 'support'} leadData.type
 * @param {string} [leadData.interest]
 * @param {string} [leadData.message]
 * @returns {Promise<{ success: boolean, message: string, lead?: any }>}
 */
export const createLead = async (leadData) => {
  const endpoint = getApiEndpoint();

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const serverMessage = data.message || (data.errors ? data.errors.join(', ') : null);
      throw new Error(serverMessage || 'Something went wrong while submitting your request. Please try again.');
    }

    return data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[API Service] Submission error to', endpoint, ':', error.message);
    }

    if (error.message && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
      // If relative endpoint failed, try direct localhost:5000 as fallback
      if (endpoint === '/api/leads') {
        try {
          const directResponse = await fetch('http://localhost:5000/api/leads', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(leadData),
          });
          const directData = await directResponse.json().catch(() => ({}));
          if (directResponse.ok) {
            return directData;
          }
          throw new Error(directData.message || 'Submission failed.');
        } catch {
          // If localhost failed, try live Render backend as fallback
          try {
            const renderResponse = await fetch('https://om-trust.onrender.com/api/leads', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify(leadData),
            });
            const renderData = await renderResponse.json().catch(() => ({}));
            if (renderResponse.ok) {
              return renderData;
            }
            throw new Error(renderData.message || 'Submission failed.');
          } catch {
            // Both failed
          }
        }
      }

      throw new Error('Unable to reach the server. Please check your internet connection and verify the backend API is running.');
    }

    throw error;
  }
};
