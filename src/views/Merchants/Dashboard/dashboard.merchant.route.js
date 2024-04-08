import usersMerchantRoute from "./MerchantUsers/users.merchant.route";

export default {
  routes: [
    {
      path: "dashboard",
      name: "merchant-dashboard",
      component: () => import("./home/MerchantHome.vue")
    },
    ...usersMerchantRoute.routes
  ]
};
