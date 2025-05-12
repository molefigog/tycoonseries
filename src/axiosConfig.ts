// src/axiosConfig.ts
import axios from "axios";
import { Preferences } from "@capacitor/preferences";

// Automatically attach the token before every request
axios.interceptors.request.use(
  async (config) => {
    const { value: token } = await Preferences.get({ key: "authToken" });

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
