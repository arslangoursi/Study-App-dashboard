"use client";

import ClipLoader from "react-spinners/ClipLoader";

export default function Loader({ small = false, color = "var(--golden)" }) {
  return <ClipLoader loading={true} color={color} size={small ? 20 : 30} />;
}
