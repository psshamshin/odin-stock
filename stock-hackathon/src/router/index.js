import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import AuthView from "@/views/AuthView.vue";
import StockView from "@/views/StockView.vue";
import ImportReqView from "@/views/ImportReqView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LandingView,
    },
    {
      path: "/auth",
      component: AuthView,
    },
    {
      path: "/stock",
      component: StockView,
    },
    {
      path: "/import",
      component: ImportReqView,
    },
  ],
});

export default router;
