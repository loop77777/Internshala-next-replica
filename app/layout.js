import "./globals.css";

export const metadata = {
  title: "Internship Search Replica",
  description: "Internshala style internship search page replica",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}