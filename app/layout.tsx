import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { Inter, Lusitana } from 'next/font/google';
import { inter } from '@/app/ui/fonts';
import "./globals.css";

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import ReactQueryProvider from "./ReactQueryProvider";
// const inter = Inter({ subsets: ["latin"] });

 
// export const inter = Inter({ subsets: ['latin'] });
// export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
    title: "Book Rent",
    description: "Book Rental system",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const queryClient = new QueryClient();

    return (
        <html lang="en">
            <body className={inter.className}>
                {/* <ReactQueryProvider> */}
                    {children}
                    <SpeedInsights />
                    <Analytics />
                {/* </ReactQueryProvider> */}
            </body>
        </html>
    );
}
