
export default {
  routes: [
    {
      path: "orders",
      name: "orders-client",
      component: () => import("./OrdersClientList.vue"),
      meta: {
        roles: ["admin", "staff"],
      },
      // beforeEnter: clientRolesGuard,
    },
    {
      path: "orders/create",
      name: "orders-client-create",
      component: () => import("./OrdersClientCreate.vue"),
      meta: {
        edit: false,
        roles: ["admin", "staff"],
      },
      // beforeEnter: clientRolesGuard,
    },
    {
      path: "orders/:id",
      name: "orders-client-show",
      component: () => import("./OrdersClientShow.vue"),
      meta: {
        edit: true,
        roles: ["admin", "staff"],
      },
      // beforeEnter: clientRolesGuard,
    },
  ],
};
