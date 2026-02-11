export interface ApiResponse {
  status: "success" | "error" | "fail";
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
