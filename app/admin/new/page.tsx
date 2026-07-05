import { requireAdmin } from "@/lib/auth";
import AdminHeader from "../AdminHeader";
import LinkEditor from "../LinkEditor";

export const dynamic = "force-dynamic";

export default async function NewLinkPage() {
  await requireAdmin();
  return (
    <>
      <AdminHeader />
      <div className="admin-wrap">
        <h1 className="page-title">Nuovo link</h1>
        <p className="page-sub">Compila i campi e guarda l&apos;anteprima a destra.</p>
        <LinkEditor />
      </div>
    </>
  );
}
