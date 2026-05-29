import "./globals.css";
import Navbar from "../components/Navbar";
import FloatingEmojis from "../components/FloatingEmojis";
import Toast from "../components/Toast";

// THIS LINE IS THE MOST IMPORTANT FOR VERCEL
// It prevents the "Export encountered errors" during build
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0F0F0F] text-white antialiased overflow-x-hidden">
        <FloatingEmojis />
        <Navbar />
        <Toast />
        <main className="relative z-10 pt-32">
          {children}
        </main>
      </body>
    </html>
  );
}