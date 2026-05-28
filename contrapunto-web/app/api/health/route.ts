import { NextResponse } from 'next/server';
import { verifyEmailConnection } from '@/lib/email';
import { env } from '@/lib/env';

// Health check endpoint para Docker HEALTHCHECK y load balancers
export async function GET() {
  const memoryUsage = process.memoryUsage();
  
  // Check SMTP connection status
  const emailStatus = await verifyEmailConnection();
  
  const status = emailStatus.success || env.SMTP_USER === '' 
    ? 'ok' 
    : 'degraded';

  return NextResponse.json(
    {
      status,
      timestamp: new Date().toISOString(),
      service: 'contrapunto-web',
      environment: env.NODE_ENV,
      checks: {
        smtp: {
          configured: !!env.SMTP_USER,
          connected: emailStatus.success,
          error: emailStatus.error || null,
        },
        storage: {
          provider: env.STORAGE_PROVIDER,
        }
      },
      system: {
        memory: {
          heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
          heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
          rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
        },
        uptime: `${Math.round(process.uptime())}s`,
      }
    },
    { status: status === 'ok' ? 200 : 500 }
  );
}
