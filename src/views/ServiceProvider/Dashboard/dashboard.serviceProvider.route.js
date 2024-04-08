import categoriesServiceProviderRoute from "./ServiceProviderCategories/categories.ServiceProvider.route";
import servicesServiceProviderRoute from "./ServiceProviderServices/services.ServiceProvider.route";
import usersServiceProviderRoute from "./ServiceProviderUsers/users.serviceProvider.route";

export default {
  routes: [
    {
      path: "dashboard",
      name: "service-provider-dashboard",
      component: () => import("./home/ServiceProviderHome.vue")
    },
    ...usersServiceProviderRoute.routes,
    ...categoriesServiceProviderRoute.routes,
    ...servicesServiceProviderRoute.routes
  ]
};
