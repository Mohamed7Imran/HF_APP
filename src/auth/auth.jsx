import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000/";
const BASE_URL = "https://hfapi.herofashion.com/";

export const setTokens = (access, refresh) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const loginUser = async (username, password) => {
  const res = await axios.post(BASE_URL + "login/", {
    username,
    password,
  });

  setTokens(res.data.access, res.data.refresh);
  startSilentRefresh(); // start refresh
  return res.data;
};



export const logoutUser = async () => {
  try {
    const refreshToken = getRefreshToken();

    await api.post("logout/", {
      refresh: refreshToken,
    });

  } catch (err) {
    console.log("Logout error", err);
  } finally {
    clearTokens();
    window.location.href = "/";
  }
};


// export const logoutUser = () => {
//   clearTokens();
//   window.location.href = "/";
// };

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/* ---------------- REQUEST INTERCEPTOR ---------------- */
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

/* ---------------- RESPONSE INTERCEPTOR ---------------- */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) return Promise.reject(error);

        const res = await axios.post(BASE_URL + "token/refresh/", {
          refresh: refreshToken,
        });

        const newAccess = res.data.access;
        const newRefresh = res.data.refresh; // 🔥 IMPORTANT

        setTokens(newAccess, newRefresh || currentRefresh);


        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

        return api(originalRequest); // ✅ IMPORTANT
      } catch (err) {
        console.log("Refresh expired");
        clearTokens();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

/* ---------------- SILENT REFRESH ---------------- */
let refreshInterval;

export const startSilentRefresh = () => {
  if (refreshInterval) return;

  refreshInterval = setInterval(async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) return;

      const res = await axios.post(BASE_URL + "token/refresh/", {
        refresh: refreshToken,
      });

      localStorage.setItem("access_token", res.data.access);
      console.log("Token refreshed silently");
    } catch (err) {
      console.log("Silent refresh stopped");
      clearInterval(refreshInterval);
    }
  }, 4 * 60 * 1000); // every 4 minutes
};