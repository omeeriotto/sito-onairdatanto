"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-bar">
      <Link href="/admin" className="brand">
        OMEGA <b>RIOT</b> · admin
      </Link>
      <div className="bar-actions">
        <Link
          href="/link"
          target="_blank"
          className="btn btn-ghost"
        >
          Vedi /link ↗
        </Link>
        <button type="button" className="btn btn-ghost" onClick={logout}>
          Esci
        </button>
      </div>
    </div>
  );
}
