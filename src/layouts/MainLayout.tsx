import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";

export default function MainLayout({
  children,
  hideMargin = false,
}: Readonly<{
  children: React.ReactNode;
  hideMargin?: boolean;
}>) {
  return (
    <>
      <Head>
        <title>Alumni UPNFM</title>
        <meta
          name="description"
          content="Plataforma de empleo para egresados de la UPNFM"
        />
        <link rel="icon" href="/favicon.ico" />
        {/* viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Fonts */}
      </Head>
      <Header hideMargin={hideMargin}></Header>
      <main className={`${hideMargin ? "mx-0" : "mx-8 lg:mx-36"} h-auto`}>{children}</main>
      <Footer hideMargin={hideMargin}></Footer>
    </>
  );
}
