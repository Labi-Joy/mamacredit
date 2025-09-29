import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: {
    default: 'MamaCredit - Women\'s Savings Circles',
    template: '%s | MamaCredit'
  },
  description: 'Join thousands of African women building financial freedom through traditional savings circles, powered by modern technology. No banks. No paperwork. Just sisters.',
  keywords: [
    'savings circles',
    'African women',
    'financial inclusion',
    'sisterhood',
    'women empowerment',
    'susu',
    'tontine',
    'web3',
    'Hedera',
    'cryptocurrency',
    'Nigeria',
    'Lagos',
    'community savings'
  ],
  authors: [{ name: 'MamaCredit Team' }],
  creator: 'MamaCredit',
  publisher: 'MamaCredit',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mamacredit.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mamacredit.app',
    siteName: 'MamaCredit',
    title: 'MamaCredit - Women\'s Savings Circles',
    description: 'Join thousands of African women building financial freedom through traditional savings circles, powered by modern technology.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MamaCredit - Empowering African Women Through Sisterhood',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MamaCredit - Women\'s Savings Circles',
    description: 'Join thousands of African women building financial freedom through sisterhood.',
    images: ['/twitter-image.jpg'],
    creator: '@mamacredit',
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
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'financial technology',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* PWA & Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#8B1538" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MamaCredit" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Prevent zoom on iOS */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-burgundy-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        {/* Main content wrapper */}
        <div id="main-content" className="min-h-screen">
          {children}
        </div>
        
        {/* Global notifications portal */}
        <div id="notifications-portal" />
        
        {/* Loading states portal */}
        <div id="loading-portal" />
        
        {/* Modal portal */}
        <div id="modal-portal" />
        
        {/* Analytics and third-party scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Basic analytics tracking
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
              
              // Performance monitoring
              if ('performance' in window) {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
                  }, 0);
                });
              }
              
              // Service worker registration for PWA
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}