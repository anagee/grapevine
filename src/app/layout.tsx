import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'Grapevine Trends',
  description: 'AI-Powered Social Trend Analysis for Wine & Food',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <footer className="border-t mt-10">
  <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row gap-2 sm:gap-6">
    <span>© {new Date().getFullYear()} Grapevine Trends</span>
    <a className="hover:underline" href="/privacy">Privacy Policy</a>
    <a className="hover:underline" href="/terms">Terms of Service</a>
  </div>
</footer>
      </body>
    </html>
  );
}
