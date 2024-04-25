export default {
  routes: [
    {
      path: "orders-admin",
      name: "admin-orders-dashboard",
      component: () => import("./OrderAdminList.vue"),
    },
    {
      path: "orders-admin/:id",
      name: "admin-orders-show",
      component: () => import("./OrderAdminShow.vue"),
    },
  ],
};
