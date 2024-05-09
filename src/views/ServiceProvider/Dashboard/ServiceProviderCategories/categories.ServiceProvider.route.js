import { SPRolesGuard } from "@/helper/serviceProvider.router.helper";

export default {
  routes: [
    {
      path: "categories",
      name: "categories-service-provider-dashboard",
      component: () => import("./CategoriesServiceProviderList.vue"),
      beforeEnter: SPRolesGuard,
      meta: {
        roles: ["admin"],
      },
    },
  ],
};
