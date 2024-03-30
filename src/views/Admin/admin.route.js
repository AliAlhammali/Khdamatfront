import { adminGuestGuard, adminAuthGuard } from "@/helper/admin.router.helper";
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
          component: () => import("./Auth/AdminLogin.vue"),
          beforeEnter: adminAuthGuard
        },
        {
          path: "",
          component: () => import("./Dashboard/AdminDashboard.vue"),
          redirect: { name: "admin-dashboard" },
          beforeEnter: adminGuestGuard,
          children: [...dashboardAdminRoute.routes]
        }
      ]
    }
  ]
};
