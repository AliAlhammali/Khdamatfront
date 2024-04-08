import categoriesMerchantRoute from "./MerchantCategories/categories.merchant.route";
import servicesMerchantRoute from "./MerchantServices/services.merchant.route";
import usersMerchantRoute from "./MerchantUsers/users.merchant.route";

export default {
  routes: [
    {
      path: "dashboard",
      name: "merchant-dashboard",
      component: () => import("./home/MerchantHome.vue")
    },
    ...usersMerchantRoute.routes,
    ...categoriesMerchantRoute.routes,
    ...servicesMerchantRoute.routes
  ]
};
