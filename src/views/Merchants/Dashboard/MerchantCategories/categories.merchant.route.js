export default {
  routes: [
    {
      path: "categories",
      name: "categories-merchant-dashboard",
      component: () => import("./CategoriesMerchantList.vue"),
    },
  ],
};
