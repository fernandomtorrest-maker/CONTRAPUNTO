import crypto from 'crypto';

export const AUTHORIZED_USERS = [
  { id: 'fernando', name: 'Fernando' },
  { id: 'nicole', name: 'Nicole' },
  { id: 'diego', name: 'Diego' },
  { id: 'niels', name: 'Niels' },
  { id: 'julio', name: 'Julio' },
];

export const MASTER_PASSWORD = 'Contrapunto2026';
const SECRET_KEY = process.env.ADMIN_JWT_SECRET || 'contrapunto-secret-key-2026-secure-auth-chile';

// Función nativa para firmar token HMAC
export async function createAdminToken(userName: string): Promise<string> {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(
    JSON.stringify({
      user: userName,
      role: 'admin',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 horas
    })
  ).toString('base64url');

  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${signature}`;
}

// Función nativa para verificar token HMAC
export async function verifyAdminToken(token: string): Promise<{ user: string; role: string } | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (signature !== expectedSignature) return null;

    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (data.exp && Math.floor(Date.now() / 1000) > data.exp) {
      return null; // Token expirado
    }

    return data;
  } catch {
    return null;
  }
}
