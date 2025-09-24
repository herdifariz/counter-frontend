"use server";
import DashboardLayout from "@/components/organisms/DashboardLayout";
<<<<<<< HEAD
import QueueTicketDisplay from "@/components/QueueTicketPage";
=======
import QueueTicketPage from "@/components/organisms/QueueTicketPage";
>>>>>>> 5a9ffe7ba6c958a43d1a5aefbfa11c67839121d0

export default async function page() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
<<<<<<< HEAD
        {<QueueTicketDisplay className="min-h-[calc(100vh-4rem)]" />}
=======
        <QueueTicketPage />
>>>>>>> 5a9ffe7ba6c958a43d1a5aefbfa11c67839121d0
      </div>
    </DashboardLayout>
  );
}
