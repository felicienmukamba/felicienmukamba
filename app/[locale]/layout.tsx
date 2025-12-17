import type React from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/next"
import "../globals.css"

export const metadata: Metadata = {
    title: "Felicien Mukamba - Software Engineer & Web Developer",
    description:
        "Portfolio of Felicien Mukamba, software engineer passionate about web development. Specialist in Angular, React, Spring Boot, Django, Python, Next.js and Flutter. Based in DRC 🇨🇩",
    generator: "v0.app",
    keywords: [
        "Felicien Mukamba",
        "Web Developer",
        "Software Engineer",
        "DRC",
        "Congo",
        "Angular",
        "React",
        "Next.js",
        "Flutter",
        "SOSIDE",
    ],
    authors: [{ name: "Felicien Mukamba", url: "https://github.com/felicienmukamba" }],
    openGraph: {
        title: "Felicien Mukamba - Software Engineer",
        description: "Software engineer passionate about web development from DRC 🇨🇩",
        type: "website",
    },
    icons: {
        icon: [
            {
                url: "/icon-light-32x32.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/icon-dark-32x32.png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/icon.svg",
                type: "image/svg+xml",
            },
        ],
        apple: "/apple-icon.png",
    },
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Await the params to fix Next.js 15+ async params
    const { locale } = await params;

    // Providing all messages to the client side
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className="font-sans antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange={false}
                >
                    <NextIntlClientProvider messages={messages}>
                        {children}
                        <Analytics />
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
