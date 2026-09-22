import { createRouter, createMemoryHistory } from "vue-router";
// import { createRouter, createWebHistory } from 'vue-router'
import { eventBus } from "@/eventBus";

import HomeView from "../views/HomeView.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/draw",
      name: "draw",
      component: () => import("../views/DrawView.vue"),
    },
    {
      path: "/tuto",
      name: "tuto",
      component: () => import("../views/TutoView.vue"),
    },
    {
      path: "/save",
      name: "save",
      component: () => import("../views/SaveView.vue"),
    },
  ],
});

router.beforeEach((to, from) => {
  eventBus.emit("route-will-change", {
    to: to.path,
    from: from.path,
  });
});
router.afterEach((to, from) => {
  eventBus.emit("route-has-changed", {
    to: to.path,
    from: from.path,
  });
});

export default router;
