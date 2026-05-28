/**
 * lib/storage.ts
 * 
 * Capa de abstracción para almacenamiento de archivos en la nube.
 * 
 * ESTRUCTURA LISTA PARA:
 * ├── AWS S3 → instalar @aws-sdk/client-s3 + @aws-sdk/s3-request-presigner
 * ├── Google Cloud Storage → instalar @google-cloud/storage
 * └── Cloudflare R2 → compatible con AWS SDK (endpoint diferente)
 * 
 * Para activar un proveedor, descomenta su sección y configura
 * las variables de entorno en docker-compose.yml / .env.local
 */

import { generateId } from './utils';
import type { PresignedUploadUrl } from '@/types';
import { env } from './env';

// ─── Configuración del proveedor (leer de env) ─────────────────────────────────
const STORAGE_PROVIDER = env.STORAGE_PROVIDER;
// const BUCKET_NAME = env.S3_BUCKET_NAME || env.GCS_BUCKET_NAME || 'contrapunto-uploads';
const PRESIGNED_URL_EXPIRY = 3600; // 1 hora en segundos

// ─── Función principal: obtener URL pre-firmada ────────────────────────────────

/**
 * Genera una URL pre-firmada para subir un archivo directamente al storage.
 * El cliente usará esta URL para hacer un PUT request directo al bucket,
 * sin que el archivo pase por el servidor de la aplicación.
 */
export async function getPresignedUploadUrl(
  filename: string,
  contentType: string,
  quoteId: string
): Promise<PresignedUploadUrl> {
  // Sanitizar nombre de archivo
  const sanitizedName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const fileKey = `quotes/${quoteId}/${Date.now()}-${sanitizedName}`;

  switch (STORAGE_PROVIDER) {
    case 'aws-s3':
      return getAwsPresignedUrl(fileKey, contentType);
    
    case 'gcs':
      return getGcsPresignedUrl(fileKey, contentType);
    
    case 'cloudflare-r2':
      return getR2PresignedUrl(fileKey, contentType);
    
    default:
      // Modo simulado para desarrollo/demo
      return getSimulatedPresignedUrl(fileKey, contentType);
  }
}

// ─── AWS S3 ────────────────────────────────────────────────────────────────────
// Descomentar e instalar: npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner

async function getAwsPresignedUrl(
  fileKey: string,
  contentType: string
): Promise<PresignedUploadUrl> {
  /*
  const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
  const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');

  const client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: PRESIGNED_URL_EXPIRY });
  const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

  return {
    filename: fileKey,
    uploadUrl,
    publicUrl,
    expiresIn: PRESIGNED_URL_EXPIRY,
  };
  */
  return getSimulatedPresignedUrl(fileKey, contentType);
}

// ─── Google Cloud Storage ──────────────────────────────────────────────────────
// Descomentar e instalar: npm install @google-cloud/storage

async function getGcsPresignedUrl(
  fileKey: string,
  contentType: string
): Promise<PresignedUploadUrl> {
  /*
  const { Storage } = await import('@google-cloud/storage');
  
  const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  const bucket = storage.bucket(BUCKET_NAME);
  const file = bucket.file(fileKey);

  const [uploadUrl] = await file.generateSignedPostPolicyV4({
    expires: Date.now() + PRESIGNED_URL_EXPIRY * 1000,
    conditions: [
      ['content-length-range', 0, 10 * 1024 * 1024], // max 10MB
      ['eq', '$Content-Type', contentType],
    ],
  });

  const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileKey}`;

  return {
    filename: fileKey,
    uploadUrl: uploadUrl.url,
    publicUrl,
    expiresIn: PRESIGNED_URL_EXPIRY,
  };
  */
  return getSimulatedPresignedUrl(fileKey, contentType);
}

// ─── Cloudflare R2 ─────────────────────────────────────────────────────────────
// Compatible con AWS SDK, solo cambia el endpoint

async function getR2PresignedUrl(
  fileKey: string,
  contentType: string
): Promise<PresignedUploadUrl> {
  /*
  const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
  const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');

  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: PRESIGNED_URL_EXPIRY });
  const publicUrl = `${process.env.R2_PUBLIC_URL}/${fileKey}`;

  return {
    filename: fileKey,
    uploadUrl,
    publicUrl,
    expiresIn: PRESIGNED_URL_EXPIRY,
  };
  */
  return getSimulatedPresignedUrl(fileKey, contentType);
}

// ─── Modo Simulado (Desarrollo) ────────────────────────────────────────────────

async function getSimulatedPresignedUrl(
  fileKey: string,
  contentType: string
): Promise<PresignedUploadUrl> {
  // Simula latencia de red
  await new Promise((resolve) => setTimeout(resolve, 50));

  const simulatedToken = generateId();
  
  return {
    filename: fileKey,
    uploadUrl: `https://storage.simulated.dev/upload/${fileKey}?token=${simulatedToken}&type=${encodeURIComponent(contentType)}&expires=${Date.now() + PRESIGNED_URL_EXPIRY * 1000}`,
    publicUrl: `https://storage.simulated.dev/files/${fileKey}`,
    expiresIn: PRESIGNED_URL_EXPIRY,
  };
}

// ─── Batch: múltiples archivos ─────────────────────────────────────────────────

export async function getPresignedUploadUrls(
  files: Array<{ name: string; type: string }>,
  quoteId: string
): Promise<PresignedUploadUrl[]> {
  return Promise.all(
    files.map((file) => getPresignedUploadUrl(file.name, file.type, quoteId))
  );
}
