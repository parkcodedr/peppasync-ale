

import api from "@/lib/api";
import {
  CreateIntegrationPayload,
  Integration,
} from "@/types/integration";

export async function getIntegration() {
  const response = await api.get<Integration>("/integrations");

  return response.data;
}

export async function createIntegration(
  payload: CreateIntegrationPayload,
) {
  const response = await api.put<Integration>(
    "/integrations",
    payload,
  );

  return response.data;
}

export async function uploadDataMaster(
  file: File,
) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<{
    file_path: string;
    url: string;
  }>(
    "/integrations/data-master/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}

