import ApplicationsIcon from "@/icons/ApplicationsIcon";
import CustomersIcon from "@/icons/CustomersIcon";
import DashboardIcon from "@/icons/DashboardIcon";
import ProjectsIcon from "@/icons/ProjectsIcon";
import ReferralsIcon from "@/icons/ReferralsIcon";
import SalesAnalyticsIcon from "@/icons/SalesAnalyticsIcon";
import SiteAnalyticsIcon from "@/icons/SiteAnalyticsIcon";
import TransactionsIcon from "@/icons/TransactionsIcon";
import UsersIcon from "@/icons/UsersIcon";

export default [
  {
    label: "General",
    labelAr: "عام",
    children: [
      {
        href: "/",
        label: "Dashboard",
        labelAr: "لوحة القيادة",
        icon: <DashboardIcon />
      },
      {
        href: "/projects",
        label: "Projects",
        labelAr: "مشاريع",
        icon: <ProjectsIcon />
      }
    ]
  },
  {
    label: "Sales",
    labelAr: "الحجوزات",
    children: [
      {
        href: "/applications",
        label: "Applications",
        labelAr: "تفاصيل الحجوزات",
        icon: <ApplicationsIcon />
      }
    ]
  },
  {
    label: "Accounts",
    labelAr: "المبيعات",
    children: [
      {
        href: "/transactions",
        label: "Transactions",
        labelAr: "تفاصيل المبيعات",
        icon: <TransactionsIcon />
      }
      // {
      //   href: "/change-property-price",
      //   label: "Change Property Price",
      //   labelAr: "تغيير سعر العقار",
      //   icon: <TransactionsIcon />
      // }
    ]
  },
  {
    label: "Marketing",
    labelAr: "تسويق",
    children: [
      {
        href: "/customers",
        label: "Customers",
        labelAr: "عملاء",
        icon: <CustomersIcon />
      },
      {
        href: "/referrals",
        label: "Referrals",
        labelAr: "إحالات",
        icon: <ReferralsIcon />
      }
    ]
  },
  {
    label: "Management",
    labelAr: "إدارة",
    children: [
      {
        href: "/users",
        label: "Users",
        labelAr: "المستعملون",
        icon: <UsersIcon />
      }
    ]
  },
  {
    label: "Analytics",
    labelAr: "تحليلات",
    children: [
      // {
      //   href: "/sales-analytics",
      //   label: "Sales Analytics",
      //   labelAr: "تحليلات المبيعات",
      //   icon: <SalesAnalyticsIcon />
      // },
      {
        href: "/site-analytics",
        label: "Site Analytics",
        labelAr: "تحليلات الموقع",
        icon: <SiteAnalyticsIcon />
      }
    ]
  },
  {
    label: "Site Content",
    labelAr: "تحليلات",
    children: [
      {
        href: "/interests",
        label: "Interests",
        labelAr: "طلبات الاهتمام",
        icon: <SalesAnalyticsIcon />
      },
      {
        href: "/marketing-interests",
        label: "Marketing Interests",
        labelAr: "طلبات تسجيل الوسطاء العقاريين",
        icon: <SalesAnalyticsIcon />
      },
      {
        href: "/newsletters",
        label: "Newsletters",
        labelAr: "النشرات الإخبارية",
        icon: <SalesAnalyticsIcon />
      },
      {
        href: "/schedule-calls",
        label: "Schedule Calls",
        labelAr: "طلبات تواصل العملاء",
        icon: <SalesAnalyticsIcon />
      }
    ]
  }
];
