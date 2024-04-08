export default {
  routes: [
    {
      path: "categories-merchant",
      name: "categories-merchant-dashboard",
      component: () => import("./CategoriesMerchantList.vue")
    }
  ]
};
