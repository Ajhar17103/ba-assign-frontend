import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BASE_URL;;
let authTokens = localStorage.getItem("access_token")
  ? localStorage.getItem("access_token")
  : null;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 3600,
  headers: {
    Authorization: `Bearer ${authTokens}`,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

let isFirstRefreshToken = true;

// Axios Request
axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : null;
    req.headers.Authorization = `Bearer ${authTokens}`;
  }

  const userExp = localStorage.getItem('expires_in');

  // Convert Unix timestamps to milliseconds
  const expMilliseconds = userExp * 1000;

  // Create Date objects
  const expirationDate = new Date(expMilliseconds);

  // Create Current Date objects
  const currentDate = new Date();

  const isExpired = currentDate > expirationDate;

  // if (isExpired && isFirstRefreshToken) {
  //   isFirstRefreshToken = false;

  //   const response = await axios.post(
  //     `${baseURL}/auth/refresh-token`,
  //     {
  //       refreshToken: localStorage.getItem("access_token"),
  //     }
  //   );
  //   if (response?.data?.refreshToken) {
  //     localStorage.setItem("access_token", response?.data?.accessToken);
  //     req.headers.Authorization = `Bearer ${response?.data?.accessToken}`;
  //     // return req;
  //     window.location.reload();
  //   }
  // } else if (!isExpired) {
    return req;
  // }
});

// Axios Response
axiosInstance.interceptors.response.use(
  async function (response) {
    return response;
  },

  async function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.reload();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
