import api from "@/lib/api";
import {
  OrdersResponse,
  OrderItem,
  OrderAuditLogResponse,
  ValidateTriggersResponse,
  ReleaseOrderPayload,
  RejectOrderPayload,
  ApproveOrderPayload,
  ValidTriggersResponse,
} from "@/types/order";

interface GetOrdersParams {
  state?: string;
  page?: number;
  page_size?: number;
}

export const getOrders = async (params?: GetOrdersParams) => {
  const { data } = await api.get<OrdersResponse>("/orders", {
    params,
  });
  return data;
};

export const getOrderById = async (orderId: string) => {
  const { data } = await api.get<OrderItem>(`/orders/${orderId}`);
  return data;
};

export const getOrderAuditLog = async ({
  orderId,
  page,
  page_size,
}: {
  orderId?: string;
  page?: number;
  page_size?: number;
}) => {
  const { data } = await api.get<OrderAuditLogResponse>(
    `/orders/${orderId}/audit-log`,
    {
      params: { page, page_size },
    },
  );
  return data;
};

export const approveOrder = async (
  orderId: string,
  payload: ApproveOrderPayload,
) => {
  const { data } = await api.post(`/orders/${orderId}/approve`, payload);
  return data;
};

export const rejectOrder = async (
  orderId: string,
  payload: RejectOrderPayload,
) => {
  const { data } = await api.post(`/orders/${orderId}/reject`, payload);
  return data;
};

export const releaseOrder = async (
  orderId: string,
  payload: ReleaseOrderPayload,
) => {
  const { data } = await api.post(`/orders/${orderId}/release`, payload);
  return data;
};

export const cancelOrder = async (orderId: string) => {
  const { data } = await api.post(`/orders/${orderId}/cancel`);
  return data;
};

export const validateOrderTriggers = async (orderId: string) => {
  const { data } = await api.get<ValidateTriggersResponse>(
    `/orders/${orderId}/validate-triggers`,
  );
  return data;
};

export const getPipelineSummary = async () => {
  const { data } = await api.get("/dashboard/pipeline-summary");
  return data;
};

export const exportOrdersCsv = async () => {
  const response = await api.get("/dashboard/export-csv", {
    responseType: "blob",
  });

  return {
    blob: response.data,
    headers: response.headers,
  };
};

export const getValidTriggers = async (
  orderId: string,
): Promise<ValidTriggersResponse> => {
  const { data } = await api.get(`/orders/${orderId}/valid-triggers`);

  return data;
};
