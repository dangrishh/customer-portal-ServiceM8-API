import axios from "axios";

const BASE_URL = "https://api.servicem8.com/api_1.0";

export const serviceM8 = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.SERVICEM8_API_KEY}`,
  },
});
