import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    beforeEnter(to, from, next) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user !== null) {
        console.log("authentifié !");
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
  {
    path: "/profile/:id",
    name: "UserProfile",
    component: () => import("../views/UserProfile.vue"),
    beforeEnter(to, from, next) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user !== null) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
  {
    path: "/feed",
    name: "Feed",
    component: () => import("../views/Feed.vue"),
    beforeEnter(to, from, next) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user !== null) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
