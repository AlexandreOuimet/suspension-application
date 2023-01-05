import Vue from "vue";
import VueRouter from "vue-router";
import { getCurrentUser } from "@/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/signIn",
    name: "signIn",
    component: () => import("../views/SignInView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !(await getCurrentUser())) {
    console.log("oui");
    return "signIn";
  }
});
