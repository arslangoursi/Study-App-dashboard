"use client";

import Loader from "@/components/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppAuthHandler({ token }: { token: string }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
    axios.post("/api/appLogin?appToken=" + token).then(() => router.push("/"));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Loader />
    </div>
  );
}
