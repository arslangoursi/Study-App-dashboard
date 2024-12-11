export default function getCookieClient(key: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${key}=`));

  return match ? match.split("=")[1] : null;
}
