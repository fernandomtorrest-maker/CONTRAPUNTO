import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // SMTP Config
  SMTP_HOST: z.string().default('smtp.hostinger.com'),
  SMTP_PORT: z.coerce.number().default(465),
  SMTP_USER: z.string().optional().or(z.literal('')),
  SMTP_PASSWORD: z.string().optional().or(z.literal('')),
  SMTP_FROM: z.string().optional(),
  SMTP_TO: z.string().email().default('danorivera.vk@gmail.com'),
  
  // Storage Config
  STORAGE_PROVIDER: z.enum(['simulated', 'aws-s3', 'gcs', 'cloudflare-r2']).default('simulated'),
  S3_BUCKET_NAME: z.string().optional(),
  GCS_BUCKET_NAME: z.string().optional(),
  
  // AWS / Cloudflare R2 credentials (only validated if provider is aws-s3 or cloudflare-r2)
  AWS_REGION: z.string().default('us-east-1'),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  CF_ACCOUNT_ID: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_PUBLIC_URL: z.string().optional(),
  
  // GCP credentials
  GCP_PROJECT_ID: z.string().optional(),
  GOOGLE_APPLICATION_CREDENTIALS: z.string().optional(),
});

// Parse variables
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_FROM: process.env.SMTP_FROM,
  SMTP_TO: process.env.SMTP_TO,
  STORAGE_PROVIDER: process.env.STORAGE_PROVIDER,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  GCS_BUCKET_NAME: process.env.GCS_BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  CF_ACCOUNT_ID: process.env.CF_ACCOUNT_ID,
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
  R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
  GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
  console.error('❌ Error de validación de variables de entorno:', parsed.error.format());
  throw new Error('Variables de entorno inválidas o faltantes');
}

export const env = parsed.data;
