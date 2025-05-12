import { Device } from "@capacitor/device";
import { PushNotifications } from "@capacitor/push-notifications";
import { LocalNotifications } from "@capacitor/local-notifications";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { API_URL } from "@/utils/auth";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyDVtIWzSb8QdTY5lRgYjIjLs8Hy1Tt0ZoY",
  authDomain: "todo-76a93.firebaseapp.com",
  projectId: "todo-76a93",
  storageBucket: "todo-76a93.appspot.com",
  messagingSenderId: "193259357261",
  appId: "1:193259357261:android:2826d5a6d0fc1e128f4804",
};

const vapidKey =
  "BKCtDu9lMQisgrZWZIsrvPtgVwZmIS_GMorliyXMRpgDNyuStYS_9MRJv7wOWuvLNhUTHQ9A8X3s4LbIe2kMpKs";

export const initializeFirebase = async (user: { id: any }) => {
  if (!user?.id) return;

  try {
    const app = initializeApp(firebaseConfig);
    const info = await Device.getInfo();
    const model = info.model || "Unknown";
    const manufacturer = info.manufacturer || "Unknown";
    const platform = info.platform || "unknown";
    const device_model = `${model} ${manufacturer}`;

    if (platform === "web") {
      const messaging = getMessaging(app);
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const fcmToken = await getToken(messaging, { vapidKey });
        console.log("✅ Web FCM Token:", fcmToken);

        await axios.post(`${API_URL}/devices/register`, {
          token: fcmToken,
          user_id: user.id,
          device_model,
          platform,
        });

        onMessage(messaging, (payload) => {
          console.log("📩 Web Message received:", payload);
        });
      } else {
        console.warn("⚠️ Web notification permission not granted");
      }
    } else {
      let permStatus = await PushNotifications.checkPermissions();
      if (permStatus.receive === "prompt") {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== "granted") {
        throw new Error("User denied push notification permissions");
      }

      await PushNotifications.register();

      PushNotifications.addListener("registration", async (token) => {
        console.log("📱 Mobile Push Token:", token.value);

        await axios.post(`${API_URL}/devices/register`, {
          token: token.value,
          user_id: user.id,
          device_model,
          platform,
        });
      });

      PushNotifications.addListener(
        "pushNotificationReceived",
        async (notification) => {
          console.log("📲 Push Notification:", notification);

          await LocalNotifications.schedule({
            notifications: [
              {
                title: notification.title || "New notification",
                body: notification.body || "",
                id: Date.now(),
                schedule: { at: new Date(Date.now() + 1000) },
              },
            ],
          });
        }
      );

      PushNotifications.addListener("registrationError", (err) => {
        console.error("❌ Registration error:", err.error);
      });
    }
  } catch (e) {
    console.error("❌ Error initializing Firebase or notifications:", e);
  }
};
