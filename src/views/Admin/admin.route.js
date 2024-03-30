import dashboardAdminRoute from "./Dashboard/dashboard.admin.route";

export default {
  routes: [
    {
      path: "/admin",
      component: () => import("./WrapperAdmin.vue"),
      redirect: { name: "admin-login" },
      children: [
        {
          path: "login",
          name: "admin-login",
          component: () => import("./Auth/AdminLogin.vue")
        },
        {
          path: "",
          name: "admin-dashboard",
          component: () => import("./Dashboard/AdminDashboard.vue"),
          redirect: { name: "merchant-dashboard" },
          children: [...dashboardAdminRoute.routes]
        }
      ]
    }
  ]
};
