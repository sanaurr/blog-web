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
      <body className="bg-neuBase dark:bg-neuBaseDark transition-colors duration-300 ease-in-out xh-screen">
        <UserProvider>
          <LoadingProvider>
            <Navbar />
            {children}
          </LoadingProvider>
        </UserProvider>
      </body>
    </html>
  );
}
