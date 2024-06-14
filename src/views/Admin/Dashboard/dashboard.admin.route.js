import merchantAdminRoute from "./merchant/merchant.admin.route";
import merchantUsersAdminRoute from "./merchantUsers/merchantUsers.admin.route";
import serviceProvidersUsersRoute from "./serviceProvidersUsers/serviceProvidersUsers.route";
import categoriesAdminRoute from "./categories/categories.admin.route";
import serviceAdminRoute from "./services/service.admin.route";
import usersAdminRoute from "./users/users.admin.route";
import serviceProvidersAdminRoute from "./serviceProviders/serviceProviders.admin.route";
import orderAdminRoute from "./orderAdmin/orders.admin.route";
import settingsAdminRoute from "./settings/settings.admin.route";
export default {
  routes: [
    {
      path: "dashboard",
      name: "admin-dashboard",
      component: () => import("./home/AdminHome.vue"),
    },
    ...merchantAdminRoute.routes,
    ...merchantUsersAdminRoute.routes,
    ...serviceProvidersAdminRoute.routes,
    ...serviceProvidersUsersRoute.routes,
    ...categoriesAdminRoute.routes,
    ...serviceAdminRoute.routes,
    ...usersAdminRoute.routes,
    ...orderAdminRoute.routes,
    ...settingsAdminRoute.routes,
  ],
};
