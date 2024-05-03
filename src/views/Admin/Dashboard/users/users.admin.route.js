export default {
  routes: [
    {
      path: "users",
      name: "users-admin-dashboard",
      component: () => import("./UsersAdminList.vue"),
    },
    {
      path: "users/create",
      name: "users-admin-create",
      component: () => import("./UsersAdminCreate.vue"),
    },
    {
      path: "users/:id/edit",
      name: "users-admin-edit",
      component: () => import("./UsersAdminCreate.vue"),
    },
  ],
};
