export default {
  routes: [
    {
      path: "users-admin",
      name: "admin-users-admin-dashboard",
      component: () => import("./UsersAdminList.vue")
    },
    {
      path: "users-admin/create",
      name: "admin-users-admin-create",
      component: () => import("./UsersAdminCreate.vue")
    },
    {
      path: "users-admin/:id/edit",
      name: "admin-users-admin-edit",
      component: () => import("./UsersAdminCreate.vue")
    }
  ]
};
