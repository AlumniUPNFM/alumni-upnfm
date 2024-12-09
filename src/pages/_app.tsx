import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Toaster } from "sonner";

const montserratFont = localFont({
  src: "./fonts/MontserratVF.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${montserratFont.variable}`}>
      <Component {...pageProps} />
      <Toaster />
    </main>
  );
}
