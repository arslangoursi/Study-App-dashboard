"use client";

import axios from "axios";
import gatherTrafficInfo from "@/utils/gatherTrafficInfo";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CustomAnalytics() {
  const pathname = usePathname();

  const sendAnalytics = async () => {
    const traffic = await gatherTrafficInfo();
    await axios.post(`/api/analytics`, { ...traffic, path: pathname });
  };

  useEffect(() => {
    if (pathname && process.env.NODE_ENV === "production") {
      sendAnalytics();
    }
  }, [pathname, sendAnalytics]);

  return null;
}
