import axios from 'axios';
import { Preferences } from '@capacitor/preferences';

const API_URL = 'http://localhost:8083/api';

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const token = response.data.token;

    await Preferences.set({ key: 'authToken', value: token });

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return { success: true, user: response.data.user };
  } catch (error: any) {
    const message =
      error.response?.data?.message || 'Login failed. Please try again.';
    return { success: false, message };
  }
}
