import axios from "axios";

export const API_URL = "http://localhost:5000/api";

const $api = axios.create({
  whithCredentials: true,
  baseURL: API_URL
});

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  return config;
});

$api.interceptors.response.use(
  config => config,
  async e => {
    const originalReq = e.config;

    if (e.response.status == 401 && originalReq && !originalReq._isRetry) {
      originalReq._isRetry = true;

      try {
        const res = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true
        });

        const { accessToken, refreshToken } = res.data;

        localStorage.setItem("token", accessToken);
        document.cookie = `refreshToken=${refreshToken}`;

        return $api.request(originalReq);
      } catch (err) {
        console.error(err);
      }
    }

    throw e;
  }
);

export default $api;
