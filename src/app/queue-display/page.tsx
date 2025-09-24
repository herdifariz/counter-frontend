"use server";
import DashboardLayout from "@/components/organisms/DashboardLayout";
<<<<<<< HEAD
import QueueDisplay from "@/components/QueueDisplayPage";

export default async function QueueDisplayPage() {
  return (
    <DashboardLayout>
      {<QueueDisplay className="min-h-[calc(100vh-4rem)]" />}
=======
import QueueDisplayPage from "@/components/organisms/QueueDisplayPage";

export default async function page() {
  return (
    <DashboardLayout>
      <QueueDisplayPage />
>>>>>>> 5a9ffe7ba6c958a43d1a5aefbfa11c67839121d0
    </DashboardLayout>
  );
}
