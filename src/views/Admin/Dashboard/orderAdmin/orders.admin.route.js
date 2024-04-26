export default {
  routes: [
    {
      path: "orders",
      name: "admin-orders-dashboard",
      component: () => import("./OrderAdminList.vue"),
    },
    {
      path: "orders/:id",
      name: "admin-orders-show",
      component: () => import("./OrderAdminShow.vue"),
    },
  ],
};
