"use server";
import DashboardLayout from "@/components/organisms/DashboardLayout";
import DashboardPage from "@/components/DashboardPage";

export default async function Home() {
  return <DashboardLayout>{<DashboardPage />}</DashboardLayout>;
}
