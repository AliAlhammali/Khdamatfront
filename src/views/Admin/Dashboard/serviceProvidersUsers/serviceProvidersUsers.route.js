export default {
  routes: [
    {
      path: "service-provider-users",
      name: "admin-service-provider-users-dashboard",
      component: () => import("./ServiceProvidersUsersList.vue")
    },
    {
      path: "service-provider-users/create",
      name: "admin-service-provider-users-create",
      component: () => import("./ServiceProvidersUsersCreate.vue")
    },
    {
      path: "service-provider-users/:id/edit",
      name: "admin-service-provider-users-edit",
      component: () => import("./ServiceProvidersUsersCreate.vue")
    }
  ]
};
