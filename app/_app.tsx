"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const noHeaderFooterRoutes = ["/login", "/register"];

const queryClient = new QueryClient();

export default function App({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const showHeaderFooter =
    !noHeaderFooterRoutes.includes(pathname) && !pathname.startsWith("/admin");
  return (
    <QueryClientProvider client={queryClient}>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </QueryClientProvider>
  );
}
