import type { Metadata } from 'next';
import { Inter, Barlow_Condensed } from 'next/font/google';
import './globals.css';

// ─── Fuentes Google Fonts ──────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
  weight: ['700', '800'],
});

// ─── SEO Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://constructoracontrapunto.cl'),

  title: {
    default: 'Constructora Contrapunto | Construcción y Diseño de Espacios con Carácter',
    template: '%s | Constructora Contrapunto',
  },

  description:
    'Proyectos a medida construidos con precisión, materiales nobles y atención en cada detalle. Construcción, remodelaciones, quinchos, tiny houses y mobiliario en Santiago, Chile.',

  keywords: [
    'constructora Santiago',
    'construcción a medida',
    'remodelaciones Santiago',
    'quinchos',
    'tiny houses Chile',
    'mobiliario a medida',
    'Constructora Contrapunto',
    'flipping inmobiliario',
  ],

  authors: [{ name: 'Constructora Contrapunto', url: 'https://constructoracontrapunto.cl' }],

  creator: 'Constructora Contrapunto',

  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://constructoracontrapunto.cl',
    siteName: 'Constructora Contrapunto',
    title: 'Constructora Contrapunto | Construimos Espacios con Carácter',
    description:
      'Proyectos a medida construidos con precisión, materiales nobles y atención en cada detalle.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Constructora Contrapunto - Espacios con Carácter',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Constructora Contrapunto',
    description: 'Construimos espacios con carácter. Proyectos a medida en Santiago, Chile.',
    images: ['/images/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

// ─── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body className="bg-carbon text-cream font-body antialiased">
        {children}
      </body>
    </html>
  );
}
