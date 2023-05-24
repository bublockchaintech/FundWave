import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);
  return (
    <>
      <Navbar />
      {isBrowser && <Component {...pageProps} />}
      <Footer />
    </>
  );
}
