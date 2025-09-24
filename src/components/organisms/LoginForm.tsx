"use client";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import { ILoginSchema } from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const onSubmit = (data: ILoginSchema) => {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Sistem Manajemen Antrian
          </h1>
          <p className="text-gray-600 mt-1">Login untuk akses fitur admin</p>
        </div>

        <form className="space-y-4">
          <Input label="Username" placeholder="Masukkan username" fullWidth />

          <Input
            label="Password"
            placeholder="Masukkan password"
            type="password"
            fullWidth
          />

          <Button
            type="submit"
            fullWidth
            isLoading={false}
            disabled={false}
            leftIcon={<span className="material-symbols-outlined">login</span>}
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
