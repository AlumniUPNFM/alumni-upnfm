import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
      <Header></Header>
      <main className="mx-8 lg:mx-36 h-auto">{children}</main>
      <Footer></Footer>
    </>
  );
}
