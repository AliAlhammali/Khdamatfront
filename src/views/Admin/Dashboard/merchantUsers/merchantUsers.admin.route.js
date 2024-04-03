export default {
  routes: [
    {
      path: "merchant-users",
      name: "admin-merchant-users-dashboard",
      component: () => import("./MerchantUsersList.vue")
    },
    {
      path: "merchant-users/create",
      name: "admin-merchant-users-create",
      component: () => import("./MerchantUsersCreate.vue")
    },
    {
      path: "merchant-users/:id/edit",
      name: "admin-merchant-users-edit",
      component: () => import("./MerchantUsersCreate.vue")
    }
  ]
};
