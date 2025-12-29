/**
 * Authentication Utilities
 * Note: This is a client-side helper module. Actual authentication MUST be performed
 * server-side with proper hashing, salting, and secure storage.
 * 
 * These utilities are for demonstration and local validation only.
 * Production systems should use bcrypt, Argon2, or similar on the backend.
 */

/**
 * Simple SHA-256 hash function for demonstration purposes
 * WARNING: This is NOT suitable for production password storage.
 * Always use bcrypt, Argon2, or similar on the backend.
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Verify a password against a hash
 * WARNING: This is NOT suitable for production. Use bcrypt.compare() on the backend.
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

/**
 * Check if user is authenticated (has valid token)
 */
export function isAuthenticated(): boolean {
  const token = localStorage.getItem('admin_token');
  return !!token;
}

/**
 * Get the stored authentication token
 */
export function getAuthToken(): string | null {
  return localStorage.getItem('admin_token');
}

/**
 * Clear authentication (logout)
 */
export function clearAuth(): void {
  localStorage.removeItem('admin_token');
}
