"use server";
import { satellite } from "@/config/api.config";
import { APIBaseResponse } from "@/interfaces/api.interface";
import {
  ICounter,
  ICounterResponse,
  ICreateCounterRequest,
  IUpdateCounterRequest,
} from "@/interfaces/services/counter.interface";
import { errorMessage } from "@/utils/error.util";

const API_BASE_URL = "/api/v1/counters";

export const apiGetAllCounters = async (include_inactive: boolean = false) => {
  try {
    const res = await satellite.get<APIBaseResponse<ICounter[]>>(
      `${API_BASE_URL}/`,
      {
        params: { include_inactive },
      }
    );
    return res.data;
  } catch (error) {
    return errorMessage<ICounter[]>(error);
  }
};

export const apiCreateCounter = async (data: ICreateCounterRequest) => {
  try {
    const res = await satellite.post<APIBaseResponse<ICounterResponse>>(
      `${API_BASE_URL}/create`,
      data
    );
    return res.data;
  } catch (error) {
    return errorMessage<ICounter>(error);
  }
};

export const apiUpdateCounter = async (data: IUpdateCounterRequest) => {
  try {
    console.log(data);
    const { id, ...updateData } = data;

    const res = await satellite.put<APIBaseResponse<ICounterResponse>>(
      `${API_BASE_URL}/${id}`,
      updateData
    );
    return res.data;
  } catch (error) {
    return errorMessage<ICounter>(error);
  }
};

export const apiDeleteCounter = async (id: number) => {
  try {
    const res = await satellite.delete<APIBaseResponse<{ success: boolean }>>(
      `${API_BASE_URL}/${id}`
    );
    return res.data;
  } catch (error) {
    return errorMessage<{ success: boolean }>(error);
  }
};
