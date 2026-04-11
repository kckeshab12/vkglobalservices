import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { withSession } from "../lib/session";
import AdminDashboardClient from "../components/admin/AdminDashboardClient";

export default async function AdminPage() {
  const headersList = await headers();
  const req = {
    headers: headersList,
  };

  const session = await withSession(req);

  if (!session.user || session.user.role !== "admin") {
    redirect("/adminauth");
  }

  return <AdminDashboardClient />;
}