// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/v1/user/login`,
  PROFILE: `${API_BASE_URL}/api/v1/user/profile`,
}

export default API_BASE_URL 