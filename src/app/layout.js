import Navbar from "@/components/navbar";
import "./globals.css";
import { UserProvider } from "@/contexts/user-context";
import { LoadingProvider } from "@/contexts/loading-context";


export const metadata = {
  title: "Blog Web",
  description: "A blog web site",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body>
          <LoadingProvider>
            <Navbar />
            {children}
          </LoadingProvider>
        </body>
      </html>
    </UserProvider>
  );
}
