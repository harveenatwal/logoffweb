import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Logoff - Social App Blocker",
  description:
    "Master screen time and unlock deeper focus, together. Invite friends, join group challenges, and support each other.",
  openGraph: {
    title: "Logoff - Social App Blocker",
    description:
      "Master screen time and unlock deeper focus, together. Invite friends, join group challenges, and support each other.",
    url: "https://www.logoffapp.com",
    siteName: "Logoff",
    images: [
      {
        url: "https://cdn.logoffapp.com/opengraph_2.png",
        width: 1200,
        height: 600,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script>
          {`!function(t,e,n,s,a,c,i,o,p){t.AppsFlyerSdkObject=a,t.AF=t.AF||function(){
          (t.AF.q=t.AF.q||[]).push([Date.now()].concat(Array.prototype.slice.call(arguments)))},
          t.AF.id=t.AF.id||i,t.AF.plugins={},o=e.createElement(n),p=e.getElementsByTagName(n)[0],o.async=1,
          o.src="https://websdk.appsflyer.com?"+(c.length>0?"st="+c.split(",").sort().join(",")+"&":"")+(i.length>0?"af_id="+i:""),
          p.parentNode.insertBefore(o,p)}(window,document,"script",0,"AF","banners",{banners: {key: "565b7c8f-ea91-4c9c-b6fa-8e03a482c233"}});
          // Smart Banners are by default set to the max z-index value, so they won't be hidden by the website elements. This can be changed if you want some website components to be on top of the banner.
          AF('banners', 'showBanner');
          `}
        </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
        {/* Twitter conversion tracking base code */}
        <Script id="twitter-pixel" strategy="afterInteractive">
          {`
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','pwucv');
          `}
        </Script>
      </body>
    </html>
  );
}
