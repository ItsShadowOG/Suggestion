/**
 * Mock API for Development
 * 
 * This module provides mock API responses for development and testing.
 * In production, these endpoints should be replaced with actual backend API calls.
 * 
 * For GitHub Pages deployment, you can use GitHub Actions or a serverless function
 * (like Netlify Functions or Vercel Functions) to handle authentication.
 */

/**
 * Mock admin login validation
 * WARNING: This is for development only. In production, use a secure backend API.
 * 
 * Credentials:
 * - Username: THEWIZARD99
 * - Password: WIZARD242427
 */
export async function mockAdminLogin(
  username: string,
  password: string
): Promise<{ success: boolean; token?: string; error?: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In production, these should be validated against a secure backend
  const ADMIN_USERNAME = 'THEWIZARD99';
  const ADMIN_PASSWORD = 'WIZARD242427';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate a mock JWT token
    const token = btoa(
      JSON.stringify({
        username,
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      })
    );

    return {
      success: true,
      token,
    };
  }

  return {
    success: false,
    error: 'Invalid username or password',
  };
}

/**
 * Verify if a token is valid
 */
export function mockVerifyToken(token: string): boolean {
  try {
    const decoded = JSON.parse(atob(token));
    return decoded.exp > Date.now();
  } catch {
    return false;
  }
}
