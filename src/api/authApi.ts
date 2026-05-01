import { POST } from "./client";
import { ENDPOINTS } from "./endpoints";

export type ResponseType<T> = {
  error_details: {
    type: string;
    code: string;
    detail: string;
    attr: string;
    fa_details: string;
  };
  is_success: boolean;
  message: string;
  status_code: number;
  response?: T;
};
export const checkAgencyCode = (code: string) =>
  POST(ENDPOINTS.dey.checkAgencyCode, { agent_code: code });

export const signup = (payload: unknown) => POST(ENDPOINTS.dey.signup, payload);
