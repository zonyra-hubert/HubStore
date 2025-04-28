import { redirect } from "next/navigation";

const DashboardPage = () => {
  redirect("/dashboard/settings");
  return <div>DashbaordPage</div>;
};

export default DashboardPage;
