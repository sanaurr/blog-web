import Navbar from "@/components/navbar";
import "./globals.css";
import { UserProvider } from "@/contexts/user-context";
import { LoadingProvider } from "@/contexts/loading-context";


export const metadata = {
  title: "ZeeBLOG",
  description: "A modern blogging platform to share your stories and ideas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-y-hidden">
        <UserProvider>
          <LoadingProvider>
            <Navbar />
            <main className="pt-20">
              {children}
            </main>
          </LoadingProvider>
        </UserProvider>
      </body>
    </html>
  );
}
