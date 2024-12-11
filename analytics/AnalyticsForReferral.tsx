"use client";

import axios from "axios";
import gatherTrafficInfo from "@/utils/gatherTrafficInfo";
import { useEffect } from "react";

export default function AnalyticsForReferral({
  referral
}: {
  referral: string | undefined;
}) {
  const sendTrafficInfo = async () => {
    const traffic = await gatherTrafficInfo();
    await axios.post(`/api/referrals/${referral}`, traffic);
  };

  useEffect(() => {
    if (referral && process.env.NODE_ENV === "production") {
      sendTrafficInfo();
    }
  }, [referral, sendTrafficInfo]);

  return null;
}
