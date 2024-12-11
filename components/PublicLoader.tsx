"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import AOS from "aos";

export default function PublicLoader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleLoading = () => {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    };

    handleLoading();
  }, [pathname]);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  return (
    <motion.div
      // @ts-ignore
      suppressHydrationWarning
      style={{
        position: "fixed",
        left: "0",
        width: "100vw",
        height: "100dvh",
        objectFit: "cover",
        backgroundColor: "rgb(3 18 35)",
        display: "flex",
        zIndex: 9999
      }}
      initial={{ top: 0 }}
      animate={{ top: loading ? 0 : "-100vh" }}
    >
      <img
        loading="lazy"
        src="/public_loader.gif"
        alt="Loading..."
        style={{
          display: "block",
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",

          width: "40%",
          height: "auto",
          objectFit: "cover"
        }}
      />
    </motion.div>
  );
}
