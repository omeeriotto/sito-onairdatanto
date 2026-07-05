import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getLinkRaw } from "@/lib/links";
import AdminHeader from "../../AdminHeader";
import LinkEditor from "../../LinkEditor";

export const dynamic = "force-dynamic";

export default async function EditLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();

  const row = await getLinkRaw(id);
  if (!row) notFound();

  return (
    <>
      <AdminHeader />
      <div className="admin-wrap">
        <h1 className="page-title">Modifica link</h1>
        <p className="page-sub">Le modifiche saranno visibili subito su /link.</p>
        <LinkEditor
          initial={{
            id: row.id,
            title: row.title,
            description: row.description,
            link: row.link,
            cta: row.cta,
            visible: row.visible === 1,
            imageKey: row.image_key,
            imageUrl: row.image_url,
          }}
        />
      </div>
    </>
  );
}
