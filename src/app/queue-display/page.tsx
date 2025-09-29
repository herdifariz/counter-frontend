"use server";
import DashboardLayout from "@/components/organisms/DashboardLayout";
import QueueDisplayPage from "@/components/pages/QueueDisplayPage";

export default async function page() {
  return (
    <DashboardLayout>
      <QueueDisplayPage />
    </DashboardLayout>
  );
}
