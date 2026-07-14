import { requireAdmin } from "@/lib/auth";
import { getLeadMagnetLinkContent } from "@/lib/leadMagnetLink";
import AdminHeader from "../../AdminHeader";
import LeadMagnetEditor from "../../LeadMagnetEditor";

export const dynamic = "force-dynamic";

export default async function EditLeadMagnetPage() {
  await requireAdmin();
  const content = await getLeadMagnetLinkContent();

  return (
    <>
      <AdminHeader />
      <div className="admin-wrap">
        <h1 className="page-title">Modifica guida gratuita</h1>
        <p className="page-sub">
          Questa voce appare nella pagina link insieme agli altri link.
        </p>
        <LeadMagnetEditor initial={content} />
      </div>
    </>
  );
}
