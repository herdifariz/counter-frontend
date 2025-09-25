"use server";
import DashboardPage from "@/components/organisms/DashboardPage";
import DashboardLayout from "@/components/organisms/DashboardLayout";

export default async function Home() {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}
