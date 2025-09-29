"use server";
import DashboardPage from "@/components/pages/DashboardPage";
import DashboardLayout from "@/components/organisms/DashboardLayout";

export default async function Home() {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}
