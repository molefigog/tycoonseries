import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "Tycoon Series",
  webDir: "dist",

  plugins: {
    LocalNotifications: {
      smallIcon: "double_tick",
      iconColor: "#488AFF",
      sound: "beepg.wav",
    },

    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
