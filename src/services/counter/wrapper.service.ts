"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiCreateCounter,
  apiDeleteCounter,
  apiGetAllCounters,
  apiUpdateCounter,
} from "./api.service";
import {
  ICreateCounterRequest,
  IUpdateCounterRequest,
} from "@/interfaces/services/counter.interface";
import toast from "react-hot-toast";

const COUNTER_KEYS = {
  all: ["counters"] as const,
  byId: (id: number) => ["counters", id] as const,
};

export const useGetAllCounters = (include_inactive: boolean = false) => {
  return useQuery({
    queryKey: [COUNTER_KEYS.all, include_inactive],
    queryFn: () => apiGetAllCounters(include_inactive),
    refetchOnWindowFocus: false,
  });
};

export const useCreateCounter = () => {
  return useMutation({
    mutationFn: (data: ICreateCounterRequest) => apiCreateCounter(data),
    onSuccess: (response) => {
      if (response && response.error) {
        toast.error(response.error.message || "Failed to create counter");
        return;
      }

      if (response && response.status === true) {
        toast.success("Counter created successfully");
      } else {
        toast.error(response?.message || "Failed to create counter");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create counter");
    },
  });
};

export const useUpdateCounter = () => {
  return useMutation({
    mutationFn: (data: IUpdateCounterRequest) => apiUpdateCounter(data),
    onSuccess: (response) => {
      if (response && response.error) {
        toast.error(response.error.message || "Failed to update counter");
        return;
      }

      if (response && response.status === true) {
        toast.success("Counter updated successfully");
      } else {
        toast.error(response?.message || "Failed to update counter");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update counter");
    },
  });
};

export const useDeleteCounter = () => {
  return useMutation({
    mutationFn: (id: number) => apiDeleteCounter(id),
    onSuccess: (response) => {
      if (response && response.error) {
        toast.error(response.error.message || "Failed to delete admin");
        return;
      }

      if (response && response.status === true) {
        toast.success("Admin deleted successfully");
      } else {
        toast.error(response?.message || "Failed to delete admin");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete admin");
    },
  });
};
