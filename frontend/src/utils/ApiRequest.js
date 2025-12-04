// Detect if running on Vercel (same domain) or localhost
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const isVercel = typeof window !== 'undefined' && 
  window.location.hostname.includes('vercel.app');

let host;

if (isLocalhost) {
  host = 'http://localhost:5001';  // Local backend
} else if (isVercel) {
  host = '';  // Same domain → relative paths
} else {
  host = 'https://expense-tracker-app-knl1.onrender.com'; // Fallback (Render)
}

// Export API endpoints
export const setAvatarAPI = `${host}/api/auth/setAvatar`;
export const registerAPI = `${host}/api/auth/register`;
export const loginAPI = `${host}/api/auth/login`;
export const addTransaction = `${host}/api/v1/addTransaction`;
export const getTransactions = `${host}/api/v1/getTransaction`;
export const editTransactions = `${host}/api/v1/updateTransaction`;
export const deleteTransactions = `${host}/api/v1/deleteTransaction`;