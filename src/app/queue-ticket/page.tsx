"use server";
import DashboardLayout from "@/components/organisms/DashboardLayout";
import QueueTicketDisplay from "@/components/QueueTicketPage";

export default async function QueueTicketPage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {<QueueTicketDisplay className="min-h-[calc(100vh-4rem)]" />}
      </div>
    </DashboardLayout>
  );
}
