"use server";
import DashboardLayout from "@/components/organisms/DashboardLayout";
import QueueDisplay from "@/components/QueueDisplayPage";

export default async function QueueDisplayPage() {
  return (
    <DashboardLayout>
      {<QueueDisplay className="min-h-[calc(100vh-4rem)]" />}
    </DashboardLayout>
  );
}
