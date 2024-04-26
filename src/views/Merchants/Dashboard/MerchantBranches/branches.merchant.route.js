export default {
  routes: [
    {
      path: "branches",
      name: "branches-merchant-dashboard",
      component: () => import("./BranchesMerchantList.vue"),
    },
    {
      path: "branches/create",
      name: "branches-merchant-create",
      component: () => import("./BranchesMerchantCreate.vue"),
      meta: {
        edit: false,
      },
    },
    {
      path: "branches/:id/edit",
      name: "branches-merchant-edit",
      component: () => import("./BranchesMerchantCreate.vue"),
      meta: {
        edit: true,
      },
    },
  ],
};
