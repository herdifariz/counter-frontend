"use server";

import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { AxiosError } from "axios";
import { satellite } from "@/config/api.config";
import { APIBaseResponse } from "@/interfaces/api.interface";
import {
  IAdmin,
  ICreateAdminRequest,
  ILoginRequest,
  ILoginResponse,
  IToggleAdminStatusRequest,
  IToggleAdminStatusResponse,
  IUpdateAdminRequest,
} from "@/interfaces/services/auth.interface";
import { errorMessage } from "@/utils/error.util";
import { setToken } from "@/utils/cookie.util";

const API_BASE_URL = "/api/v1/auth";

export const tokenInterceptor = async (
  error: AxiosError
): Promise<AxiosError> => {
  const cookie = await cookies();

  if (error?.response?.status === 401) {
    cookie.delete("token");
    redirect("/login", RedirectType.replace);
  }

  // return Promise.resolve(errorMessage);
  return Promise.reject(error);
};

export const apiPostLogin = async (body: ILoginRequest) => {
  try {
    const cookie = await cookies();
    cookie.delete("token");

    const res = await satellite.post<APIBaseResponse<ILoginResponse>>(
      `${API_BASE_URL}/login`,
      body
    );

    if (res.data.status && res.data.data?.token) {
      await setToken(res.data.data.token);
      return res.data.data.token;
    }

    return res.data;
  } catch (error) {
    return errorMessage(error);
  }
};

export const apiGetAllAdmins = async () => {
  try {
    const res = await satellite.get<APIBaseResponse<IAdmin[]>>(
      `${API_BASE_URL}`
    );
    return res.data;
  } catch (error) {
    return errorMessage(error);
  }
};

export const apiGetAdminById = async (id: number) => {
  try {
    const res = await satellite.get<APIBaseResponse<IAdmin>>(
      `${API_BASE_URL}/${id}`
    );
    return res.data;
  } catch (error) {
    return errorMessage(error);
  }
};

export const apiCreateAdmin = async (data: ICreateAdminRequest) => {
  try {
    const res = await satellite.post<APIBaseResponse<IAdmin>>(
      `${API_BASE_URL}/create`,
      data
    );

    return res.data;
  } catch (error) {
    return errorMessage(error);
  }
};

export const apiUpdateAdmin = async (data: IUpdateAdminRequest) => {
  try {
    const res = await satellite.put<APIBaseResponse<IAdmin>>(
      `${API_BASE_URL}/update`,
      data
    );
    return res.data;
  } catch (error) {
    return errorMessage(error);
  }
};

export const apiDeleteAdmin = async (id: number) => {
  try {
    const res = await satellite.delete<APIBaseResponse<{ success: boolean }>>(
      `${API_BASE_URL}/${id}`
    );
    return res.data;
  } catch (error) {
    return errorMessage(error);
  }
};

export const apiToggleAdminStatus = async (data: IToggleAdminStatusRequest) => {
  try {
    const res = await satellite.patch<
      APIBaseResponse<IToggleAdminStatusResponse>
    >(`${API_BASE_URL}/${data.id}/toggle-status`);
    return res.data;
  } catch (error) {
    return errorMessage(error);
  }
};
