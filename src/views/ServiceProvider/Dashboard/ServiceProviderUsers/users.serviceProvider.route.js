export default {
  routes: [
    {
      path: "users-service-provider",
      name: "users-service-provider-dashboard",
      component: () => import("./UsersServiceProviderList.vue")
    },
    {
      path: "users-service-provider/create",
      name: "users-service-provider-create",
      component: () => import("./UsersServiceProviderCreate.vue"),
      meta: {
        edit: false
      }
    },
    {
      path: "users-service-provider/:id/edit",
      name: "users-service-provider-edit",
      component: () => import("./UsersServiceProviderCreate.vue"),
      meta: {
        edit: true
      }
    }
  ]
};
