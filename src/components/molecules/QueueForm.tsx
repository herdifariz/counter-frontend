"use client";
import React from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IReleaseQueueSchema,
  VReleaseQueueSchema,
} from "@/schemas/counter.schema";

interface QueueFormProps {
  onSubmit: (data: { queueNumber: string }) => void;
  isLoading?: boolean;
  buttonLabel?: string;
  buttonVariant?: "primary" | "danger" | "secondary";
}

const QueueForm: React.FC<QueueFormProps> = ({
  onSubmit,
  isLoading = false,
  buttonLabel = "Cari", // default jadi "Cari"
  buttonVariant = "primary", // default warna primary
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReleaseQueueSchema>({
    resolver: yupResolver(VReleaseQueueSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Nomor Antrian"
        placeholder="Masukkan nomor antrian"
        fullWidth
        leftIcon={
          <span className="material-symbols-outlined">confirmation_number</span>
        }
        {...register("queueNumber")}
        error={errors.queueNumber?.message}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          variant={buttonVariant}
          leftIcon={
            <span className="material-symbols-outlined">
              {buttonVariant === "danger" ? "exit_to_app" : "search"}
            </span>
          }
        >
          {isLoading ? "Memproses..." : buttonLabel}
        </Button>
      </div>
    </form>
  );
};

export default QueueForm;
