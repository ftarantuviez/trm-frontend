import { ETHERSCAN_API_BASE_URL } from "./constants";
import axiosInstance from "axios";

export const axios = axiosInstance.create({
  baseURL: ETHERSCAN_API_BASE_URL,
});
