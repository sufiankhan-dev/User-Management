import { UserType } from "@/lib/types";
import UserForm from "../../../../components/UserForm";
import { cookies } from "next/headers";

async function getUser(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${baseUrl}/api/users/${id}`, {
      cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  } catch (error) {
    console.error("Error loading user:", error);
    throw error;
  }
}

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);

  return (
    <div className="space-y-8 mt-8 md:mt-0">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit User</h2>
        <p className="text-muted-foreground">Update user information below.</p>
      </div>

      <div className="max-w-2xl">
        <UserForm user={user} mode="edit" />
      </div>
    </div>
  );
}
