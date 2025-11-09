import Header from "../components/Header";
import "./globals.css";

export const metadata = {
  title: "TimeTracker Pro",
  description: "Professional Time Tracking App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-gray-50">
        <Header />
        {children}
      </body>
    </html>
  );
}
