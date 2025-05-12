import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import { Preferences } from "@capacitor/preferences"; // ✅ Add this import

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/tab1",
  },
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/profile",
    component: () => import("@/views/ProfilePage.vue"),
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1Page.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2Page.vue"),
      },
      {
        path: "tab3",
        component: () => import("@/views/Tab3Page.vue"),
      },

      {
        path: "/episodes/:episode",
        name: "episode-show",
        component: () => import("@/views/Tab4Page.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// ✅ Paste this AFTER creating the router and BEFORE exporting
router.beforeEach(async (to, from, next) => {
  const { value: token } = await Preferences.get({ key: "authToken" });

  const authRequired = to.path.startsWith("/tabs");

  if (authRequired && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
