import { auth } from "@/server/auth";
import { BarChart, Building2, MapPin, Pen, Settings } from "lucide-react";

import DashboardNav from "../../components/navigation/dashboard-nav";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const userLinks = [
    {
      label: "Appointments",
      path: "/dashboard/orders",
      icon: <MapPin size={16} />,
    },

    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: <Settings size={16} />,
    },
  ] as const;
  console.log("session", session?.user.role);
  const adminLinks =
    session?.user.role === "admin"
      ? [
          {
            label: "Insights",
            path: "/dashboard/analytics",
            icon: <BarChart size={16} />,
          },
          {
            label: "New Listing",
            path: "/dashboard/add-product",
            icon: <Pen size={16} />,
          },
          {
            label: "Listings",
            path: "/dashboard/products",
            icon: <Building2 size={16} />,
          },
        ]
      : [];

  const allLinks = [...adminLinks, ...userLinks];
  return (
    <div>
      <DashboardNav allLinks={allLinks} />
      {children}
    </div>
  );
}
