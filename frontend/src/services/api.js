import axios from "axios";

// Axios példány létrehozása
export const myAxios = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor, minden kéréshez hozzáadjuk a tokent, ha van
myAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["X-API-TOKEN"] = token;
  }
  return config;
});

// Auth header-ek külön is elérhetőek, ha valami miatt manuálisan kell
export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token
    ? {
        "X-API-TOKEN": token,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
}
