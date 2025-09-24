"use server";
import DashboardLayout from "@/components/organisms/DashboardLayout";
<<<<<<< HEAD
import DashboardPage from "@/components/DashboardPage";

export default async function Home() {
  return <DashboardLayout>{<DashboardPage />}</DashboardLayout>;
=======
import DashboardPage from "@/components/organisms/DashboardPage";

export default async function Home() {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
>>>>>>> 5a9ffe7ba6c958a43d1a5aefbfa11c67839121d0
}
