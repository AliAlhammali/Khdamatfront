import merchantAdminRoute from "./merchant/merchant.admin.route";

export default {
  routes: [
    {
      path: "dashboard",
      name: "admin-dashboard",
      component: () => import("./home/AdminHome.vue")
    },
    ...merchantAdminRoute.routes
  ]
};
