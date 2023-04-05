import Header from "components/Header";
import "./globals.css";

export const metadata = {
  title: "feels",
  description: "feels is a web app for logging your moods",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
