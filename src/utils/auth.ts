import axios from "axios";
import { Preferences } from "@capacitor/preferences";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Ref } from "vue";

// const API_URL = 'http://nid-pos.local/api';

const API_URL = "https://tycoonseries.com/api";

export async function login(name: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/login`, { name, password });
    const token = response.data.token;

    await Preferences.set({ key: "authToken", value: token });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return { success: true, user: response.data.user };
  } catch (error: any) {
    const message = error.response?.data?.message || "Login failed.";
    return { success: false, message };
  }
}

export async function register(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      password_confirmation,
    });

    const token = response.data.token;

    await Preferences.set({ key: "authToken", value: token });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return { success: true };
  } catch (error: any) {
    const message = error.response?.data?.message || "Registration failed.";
    return { success: false, message };
  }
}
export async function getProfile() {
  try {
    const { value: token } = await Preferences.get({ key: "authToken" });

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.get(`${API_URL}/me2`);
    return { success: true, user: response.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Could not fetch profile.",
    };
  }
}

export async function getDetails() {
  try {
    const response = await axios.get(`${API_URL}/details`);
    return { success: true, user: response.data };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Could not fetch System Details",
    };
  }
}
export async function updateProfile(data: {
  name?: string;
  email?: string;
  tel?: string;
  password?: string;
  password_confirmation?: string;
}) {
  try {
    const payload: any = {};
    if (data.name) payload.name = data.name;
    if (data.email) payload.email = data.email;
    if (data.tel) payload.tel = data.tel;
    if (data.password) {
      payload.password = data.password;
      payload.password_confirmation = data.password_confirmation;
    }

    const response = await axios.post(`${API_URL}/update-profile`, payload);

    return { success: true, user: response.data.user };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Update failed.",
      errors: error.response?.data?.errors || {},
    };
  }
}

export async function logout() {
  try {
    const { value: token } = await Preferences.get({ key: "authToken" });

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.post(`${API_URL}/logout`);
    }

    await Preferences.remove({ key: "authToken" });
    delete axios.defaults.headers.common["Authorization"];

    return { success: true };
  } catch (error: any) {
    return { success: false, message: "Logout failed." };
  }
}

export async function subscribe(
  model: string,
  userId: number,
  mpesaNumber: string,
  amount: string
): Promise<any> {
  try {
    const payload = { model, userId, mpesaNumber, amount };
    const response = await axios.post(`${API_URL}/m-pesa`, payload);
    console.log("Payment submitted:", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Error submitting payment:", error);

    // Type guard to check if 'error' is an instance of Error
    if (error instanceof Error) {
      // Improved error handling based on response status
      const errorMessage = error.message || "Payment failed. Please try again.";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export { API_URL };
