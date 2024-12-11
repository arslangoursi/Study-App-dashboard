import "@/styles/dashboard.scss";

import DashboardLayout from "@/components/DashboardLayout";
import { ReactNode } from "react";
import adminLinks from "@/data/adminLinks";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout links={adminLinks}>{children}</DashboardLayout>;
}
