import { requireAdmin } from "@/lib/auth";
import { listAllLinks } from "@/lib/links";
import AdminHeader from "./AdminHeader";
import LinkAdminList from "./LinkAdminList";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();
  const links = await listAllLinks();

  return (
    <>
      <AdminHeader />
      <div className="admin-wrap">
        <h1 className="page-title">Gestione Link</h1>
        <p className="page-sub">
          Trascina la maniglia per riordinare. Mostra/nascondi, modifica o
          elimina ogni link. Le modifiche sono immediate.
        </p>
        <LinkAdminList initialLinks={links} />
      </div>
    </>
  );
}
