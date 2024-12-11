import "@/styles/dashboard.scss";

import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { IDashboardLayout } from "@/interfaces";
import SiteContent from "@/popup/SiteContent";
import UserProvider from "@/components/UserProvider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  links
}: IDashboardLayout) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return redirect("/login");
  }

  // Placeholder user info to replace database calls
  const placeholderImage = "https://placehold.co/50x50";
  const userInfo = {
    id: "placeholder-id",
    name: "John Doe",
    email: "john.doe@example.com",
    picture: placeholderImage,
    designation: "Developer",
    department: "Engineering",
    type: "admin",
    number: "123-456-7890",
    phone: "123-456-7890",
    isPhoneVerified: true,
    country: "USA",
    zipCode: "12345",
    language: "English",
    website: "https://example.com",
    nationality: "American",
    isSeller: false,
    verifications: ["Email Verified"],
    address: "123 Main Street",
    company: "Example Corp",
    taxNumber: "TAX-123456",
    idNumber: "ID-123456",
    applications: []
  };

  return (
    <UserProvider data={userInfo}>
      <div className="dashboard">
        <DashboardSidebar links={links} />
        <div className="dashboard__main">
          <DashboardHeader
            siteContent={userInfo.type === "admin" ? <SiteContent /> : null}
            links={links}
          />
          <div className="dashboard__main__content">
            <div className="dashboard__main__content__inner">{children}</div>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
