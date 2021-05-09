import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/profile/:id",
    name: "UserProfile",
    component: () => import("../views/UserProfile.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/feed",
    name: "Feed",
    component: () => import("../views/Feed.vue"),
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requireAuth)) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user !== null) {
      next();
    } else {
      next({
        name: "Home",
      });
    }
  } else {
    next();
  }
});

export default router;
