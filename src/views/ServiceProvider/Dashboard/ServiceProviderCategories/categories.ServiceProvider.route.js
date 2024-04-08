export default {
  routes: [
    {
      path: "categories-service-provider",
      name: "categories-service-provider-dashboard",
      component: () => import("./CategoriesServiceProviderList.vue")
    }
  ]
};
