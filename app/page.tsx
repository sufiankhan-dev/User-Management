import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserType } from "@/lib/types";
import { Users } from "lucide-react";
import { cookies } from "next/headers";

async function getUserStats() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${baseUrl}/api/users/stats`, {
      cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    if (!res.ok) throw new Error("Failed to fetch user stats");
    return await res.json();
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return { totalUsers: 0 };
  }
}

export default async function DashboardPage() {
  const { totalUsers } = await getUserStats();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mt-8 md:mt-0">
          Dashboard
        </h2>
        <p className="text-muted-foreground">
          Welcome to your dashboard overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        {/* Add more stat cards here as needed */}
      </div>
    </div>
  );
}
