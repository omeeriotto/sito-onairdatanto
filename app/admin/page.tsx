import { requireAdmin } from "@/lib/auth";
import { getHomeContent } from "@/lib/homeContent";
import { listLeadMagnetSubscribers } from "@/lib/leadMagnetSubscribers";
import { listAllAdminLinks } from "@/lib/links";
import AdminHeader from "./AdminHeader";
import DashboardShell from "./DashboardShell";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();
  const [links, homeContent, subscribers] = await Promise.all([
    listAllAdminLinks().catch(() => []),
    getHomeContent(),
    listLeadMagnetSubscribers().catch(() => []),
  ]);

  return (
    <>
      <AdminHeader />
      <DashboardShell links={links} homeContent={homeContent} subscribers={subscribers} />
    </>
  );
}
