import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/Register.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../components/ForgotPassword.vue"),
  },
  {
    path: "/password-reset/:token",
    name: "ResetPassword",
    component: () => import("../components/ResetPassword.vue"),
  },
  // HotelList,
  {
    path: "/hotels",
    name: "HotelList",
    component: () => import("../components/HotelList.vue"),
  },
  // HotelCreate,
  {
    path: "/hotels/create",
    name: "HotelCreate",
    component: () => import("../components/HotelCreate.vue"),
  },
  // HotelEdit,
  {
    path: "/hotels/:id/edit",
    name: "HotelEdit",
    component: () => import("../components/HotelEdit.vue"),
  },
  // RoomList,
  {
    path: "/rooms",
    name: "RoomList",
    component: () => import("../components/RoomList.vue"),
  },
  {
    path: "/rooms/create",
    name: "RoomCreate",
    component: () => import("../components/RoomForm.vue"),
  },
  {
    path: "/rooms/:id/edit",
    name: "RoomEdit",
    component: () => import("../components/RoomForm.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
