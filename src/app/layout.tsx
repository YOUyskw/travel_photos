import AuthStateProvider from "@/provider/AuthStateProvider";
import "./globals.css";

export const metadata = {
  title: "Trip Timeline",
  description: "Trip Timeline",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthStateProvider>{children}</AuthStateProvider>
      </body>
    </html>
  );
}
