/**
 * Web3Forms API service for Om Charitable Trust.
 * Handles secure submission to https://api.web3forms.com/submit
 * using the VITE_WEB3FORMS_ACCESS_KEY environment variable.
 */

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

/**
 * Validates common phone formats (requires 10-15 digits).
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

/**
 * Submits form data to Web3Forms using JSON payload.
 *
 * @param {Object} params
 * @param {string} params.subject - The email subject line.
 * @param {string} params.formType - Identifier for the form (e.g., 'Volunteer', 'Contact', 'Support').
 * @param {Record<string, string> | FormData} params.data - Key-value pairs or FormData instance.
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const submitToWeb3Forms = async ({ subject, formType, data }) => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (!accessKey) {
    if (import.meta.env.DEV) {
      console.error(
        'Web3Forms configuration error: VITE_WEB3FORMS_ACCESS_KEY is not set in environment variables.'
      )
    }
    throw new Error('Something went wrong while sending your request. Please try again.')
  }

  // Convert FormData if provided, or use object
  const entries =
    typeof FormData !== 'undefined' && data instanceof FormData
      ? Object.fromEntries(data.entries())
      : { ...data }

  const payload = {
    access_key: accessKey,
    subject,
    from_name: 'Om Charitable Trust Website',
    botcheck: '',
    ...entries,
    'Website': 'Om Charitable Trust',
    'Form Type': formType,
    'Page': typeof window !== 'undefined' ? window.location.href : '',
    'Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  }

  if (import.meta.env.VITE_WEB3FORMS_CC_EMAIL) {
    payload.ccemail = import.meta.env.VITE_WEB3FORMS_CC_EMAIL
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      if (import.meta.env.DEV) {
        console.error(`Web3Forms response not OK: HTTP ${response.status} ${response.statusText}`)
      }
      throw new Error('Something went wrong while sending your request. Please try again.')
    }

    const result = await response.json()

    if (!result.success) {
      if (import.meta.env.DEV) {
        console.error('Web3Forms returned unsuccessful response:', result.message)
      }
      throw new Error('Something went wrong while sending your request. Please try again.')
    }

    return result
  } catch (error) {
    if (
      import.meta.env.DEV &&
      error.message !== 'Something went wrong while sending your request. Please try again.'
    ) {
      console.error('Web3Forms submission error:', error.message)
    }
    throw new Error('Something went wrong while sending your request. Please try again.')
  }
}
