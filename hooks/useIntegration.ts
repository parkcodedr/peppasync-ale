"use client";

import {
  createIntegration,
  getIntegration,
  uploadDataMaster,
} from "@/services/integrationService";

import { CreateIntegrationPayload } from "@/types/integration";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useIntegration() {
  return useQuery({
    queryKey: ["integration"],

    queryFn: getIntegration,
  });
}

export function useCreateIntegration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateIntegrationPayload) =>
      createIntegration(payload),
    retry: false,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["integration"],
      });
    },
  });
}

export function useDataMasterUpload() {
  return useMutation({
    mutationFn: (file: File) => uploadDataMaster(file),
  });
}
