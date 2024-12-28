type ResponseBody = {
  status: "error" | "fail" | "success";
  data?: Record<string, unknown>;
  message?: string;
};

export default ResponseBody;
