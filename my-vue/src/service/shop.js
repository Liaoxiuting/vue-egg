import request from "@/utils/api.js";

export function addshop(url, obj) {
  return request.post(url, obj);
}
