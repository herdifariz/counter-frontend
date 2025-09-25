"use client";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import { ILoginSchema, VLoginSchema } from "@/schemas/auth.schema";
import { useLoginUser } from "@/services/auth/wrapper.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();
  const { mutate, isPending } = useLoginUser();

  const { register, handleSubmit, formState } = useForm<ILoginSchema>({
    resolver: yupResolver(VLoginSchema),
    mode: "onChange",
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (data: ILoginSchema) => {
    mutate(data, {
      onSuccess: (res) => {
        if (res && res.status === true) {
          router.push("/");
        }
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Sistem Manajemen Antrian
          </h1>
          <p className="text-gray-600 mt-1">Login untuk akses fitur admin</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, (val) => {
            console.log("error", val);
          })}
          className="space-y-4"
        >
          <Input
            {...register("username")}
            label="Username"
            placeholder="Masukkan username"
            error={formState.errors.username?.message}
            fullWidth
          />

          <Input
            {...register("password")}
            label="Password"
            placeholder="Masukkan password"
            type="password"
            error={formState.errors.password?.message}
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
