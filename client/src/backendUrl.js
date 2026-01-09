// Use environment variable for backend URL (set in .env file or build environment)
// REACT_APP_BACKEND_URL should be set to your deployed backend URL in production
// Falls back to localhost for local development
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

export default backendUrl;
