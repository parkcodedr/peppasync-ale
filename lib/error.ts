type AxiosErrorResponse = {
  data?: {
    message?: string;
    errors?: string[];
  };
};

type AxiosErrorLike = {
  response?: AxiosErrorResponse;
  message?: string;
  status?: number;
  code?: string;
};

export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
): string {
  if (typeof error === "object" && error !== null) {
    const err = error as AxiosErrorLike;

    if (err.response?.data?.message) {
      return err.response.data.message;
    }

    if (err.response?.data?.errors && err.response.data.errors.length > 0) {
      return err.response.data.errors[0];
    }

    if (err.message) {
      return err.message;
    }
  }

  return fallback;
}
