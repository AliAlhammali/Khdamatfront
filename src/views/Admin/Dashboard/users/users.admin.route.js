export default {
  routes: [
    {
      path: "users-admin",
      name: "users-admin-dashboard",
      component: () => import("./UsersAdminList.vue")
    },
    {
      path: "users-admin/create",
      name: "users-admin-create",
      component: () => import("./UsersAdminCreate.vue")
    },
    {
      path: "users-admin/:id/edit",
      name: "users-admin-edit",
      component: () => import("./UsersAdminCreate.vue")
    }
  ]
};
