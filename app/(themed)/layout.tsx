import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export default function ThemedLayout({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
