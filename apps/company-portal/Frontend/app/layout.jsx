import "./globals.css";

export const metadata = {
  title: "CRMS",
  description: "PRD repository and review workspace"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8F9FE] text-gray-800">
        {children}
      </body>
    </html>
  );
}
