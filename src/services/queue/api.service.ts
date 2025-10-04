"use server";
import { satellite } from "@/config/api.config";
import { APIBaseResponse } from "@/interfaces/api.interface";
import {
  IQueue,
  IClaimQueueResponse,
  ICurrentQueuesResponse,
  IGetQueueMetricsResponse,
  INextQueueRequest,
  INextQueueResponse,
  IReleaseQueueRequest,
  IResetQueuesRequest,
  IResetQueuesResponse,
  ISkipQueueRequest,
  ISkipQueueResponse,
} from "@/interfaces/services/queue.interface";
import { errorMessage } from "@/utils/error.util";

const API_BASE_URL = "/api/v1/queues";

export const apiGetMetrics = async (): Promise<IGetQueueMetricsResponse> => {
  try {
    const res = await satellite.get<APIBaseResponse<IGetQueueMetricsResponse>>(
      `${API_BASE_URL}/metrics`
    );
    return res.data.data ?? { waiting: 0, called: 0, released: 0, skipped: 0 };
  } catch (error) {
    throw errorMessage(error);
  }
};

export const apiClaimQueue = async (): Promise<
  APIBaseResponse<IClaimQueueResponse>
> => {
  try {
    const res = await satellite.post<APIBaseResponse<IClaimQueueResponse>>(
      `${API_BASE_URL}/claim`
    );
    return res.data;
  } catch (error) {
    return errorMessage<IClaimQueueResponse>(error);
  }
};

export const apiReleaseQueue = async (data: IReleaseQueueRequest) => {
  try {
    const res = await satellite.post<APIBaseResponse<{ success: boolean }>>(
      `${API_BASE_URL}/release`,
      data
    );
    return res.data;
  } catch (error) {
    return errorMessage<{ success: boolean }>(error);
  }
};

export const apiGetCurrentQueues = async () => {
  try {
    const res = await satellite.get<APIBaseResponse<ICurrentQueuesResponse[]>>(
      `${API_BASE_URL}/current`
    );
    return res.data.data;
  } catch (error) {
    return errorMessage<ICurrentQueuesResponse[]>(error);
  }
};

export const apiSearchQueue = async (
  queueNumberOrCounterNumber: string
): Promise<IQueue[]> => {
  try {
    const res = await satellite.get<APIBaseResponse<IQueue[]>>(
      `${API_BASE_URL}/search?q=${queueNumberOrCounterNumber}`
    );
    return res.data.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const apiNextQueue = async (
  data: INextQueueRequest
): Promise<APIBaseResponse<INextQueueResponse>> => {
  try {
    const res = await satellite.post(`${API_BASE_URL}/next`, data);
    return res.data;
  } catch (error) {
    return errorMessage<INextQueueResponse>(error);
  }
};

export const apiSkipQueue = async (
  data: ISkipQueueRequest
): Promise<APIBaseResponse<ISkipQueueResponse>> => {
  try {
    const res = await satellite.post(`${API_BASE_URL}/skip`, data);
    return res.data;
  } catch (error) {
    return errorMessage<ISkipQueueResponse>(error);
  }
};

export const apiResetQueues = async (
  data: IResetQueuesRequest
): Promise<APIBaseResponse<IResetQueuesResponse>> => {
  try {
    const res = await satellite.post(`${API_BASE_URL}/reset`, data);
    return res.data;
  } catch (error) {
    return errorMessage<IResetQueuesResponse>(error);
  }
};
