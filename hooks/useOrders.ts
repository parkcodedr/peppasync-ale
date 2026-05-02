import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOrders,
  getOrderById,
  getOrderAuditLog,
  validateOrderTriggers,
  cancelOrder,
  releaseOrder,
  rejectOrder,
  approveOrder,
  getPipelineSummary,
  exportOrdersCsv,
  getValidTriggers,
} from "@/services/orderService";
import { PipelineSummary } from "@/types/order";
import { mapPipelineSummary } from "@/lib/mapper/orderMapper";
import { getFilenameFromDisposition } from "@/lib/file";

interface UseOrdersParams {
  state?: string;
  page?: number;
  page_size?: number;
}

export const useOrders = (params?: UseOrdersParams) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => getOrders(params),
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
};

export const useOrderAuditLog = ({
  orderId,
  page,
  page_size,
}: {
  orderId?: string;
  page?: number;
  page_size?: number;
}) => {
  return useQuery({
    queryKey: ["order-audit-log", orderId, page, page_size],
    queryFn: () => getOrderAuditLog({ orderId, page, page_size }),
    enabled: !!orderId,
  });
};

const invalidateOrders = (queryClient: any) => {
  queryClient.invalidateQueries({ queryKey: ["orders"] });
  queryClient.invalidateQueries({ queryKey: ["order"] });
};

export const useApproveOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, notes }: { orderId: string; notes: string }) =>
      approveOrder(orderId, { notes }),
    onSuccess: () => {
      invalidateOrders(queryClient);
    },
  });
};

export const useRejectOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) =>
      rejectOrder(orderId, { reason }),

    onSuccess: () => {
      invalidateOrders(queryClient);
    },
  });
};

export const useReleaseOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, notes }: { orderId: string; notes: string }) =>
      releaseOrder(orderId, { notes }),

    onSuccess: () => {
      invalidateOrders(queryClient);
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => cancelOrder(orderId),

    onSuccess: () => {
      invalidateOrders(queryClient);
    },
  });
};

export const useValidateOrderTriggers = (orderId: string) => {
  return useQuery({
    queryKey: ["order-triggers", orderId],
    queryFn: () => validateOrderTriggers(orderId),
    enabled: !!orderId,
  });
};

export const usePipelineSummary = () => {
  return useQuery<PipelineSummary>({
    queryKey: ["pipeline-summary"],
    queryFn: async () => {
      const res = await getPipelineSummary();
      return mapPipelineSummary(res);
    },
  });
};

export const useExportOrdersCsv = () => {
  return useMutation({
    mutationFn: exportOrdersCsv,

    onSuccess: ({ blob, headers }) => {
      const url = window.URL.createObjectURL(blob);
      console.log({ headers });

      const disposition = headers["content-disposition"];
      const filename =
        getFilenameFromDisposition(disposition) ??
        `orders-${new Date().toISOString().split("T")[0]}.csv`;

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    },
  });
};

export const useValidTriggers = (orderId?: string) => {
  return useQuery({
    queryKey: ["valid-triggers", orderId],
    queryFn: () => getValidTriggers(orderId!),
    enabled: !!orderId,
  });
};
