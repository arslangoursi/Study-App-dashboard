"use client";

import useLanguage from "@/hooks/useLanguage";
import Link from "next/link";

export default function NoUsers() {
  const [lang] = useLanguage();

  return (
    <Link
      href="/admin/users/create"
      style={{
        gap: 10,
        top: "50%",
        width: 200,
        left: "50%",
        height: 200,
        display: "flex",
        borderRadius: 10,
        alignItems: "center",
        position: "absolute",
        color: "var(--blue)",
        textDecoration: "none",
        flexDirection: "column",
        justifyContent: "center",
        transform: "translate(-50%, -50%)",
        border: "3px dashed var(--whiteShadow)"
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-plus"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      {lang === "ar" ? "إنشاء مستخدم" : "Create a user"}
    </Link>
  );
}
