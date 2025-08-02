"use client";

import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactNode, useState } from "react";

import "./globals.css";
import Navigation from "@/components/ui/navigation";

interface RootLayoutProps {
  children: Readonly<ReactNode>;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <Navigation />
        {/* Warp Children with <QueryClientProvider> /> */}
        <QueryClientProvider client={queryClient}> 
        {children}
       </QueryClientProvider>
      </body>
    </html>
  );
}
