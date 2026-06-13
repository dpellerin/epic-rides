"use client";

import { useRouter } from "next/navigation";

export function AdminSignOutButton() {
  const router = useRouter();

  async function signOut() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button type="button" className="ghost-button" onClick={signOut}>
      Sign out
    </button>
  );
}
