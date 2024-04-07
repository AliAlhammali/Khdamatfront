import {
  serviceProviderAuthGuard,
  serviceProviderGuestGuard
} from "@/helper/serviceProvider.router.helper";
import dashboardServiceProvider from "./Dashboard/dashboard.serviceProvider.route";

export default {
  routes: [
    {
      path: "/service-provider",
      component: () => import("./WrapperServiceProvider.vue"),
      redirect: { name: "service-provider-dashboard" },
      children: [
        {
          path: "login",
          name: "service-provider-login",
          component: () => import("./Auth/ServiceProviderLogin.vue"),
          beforeEnter: serviceProviderAuthGuard
        },
        {
          path: "",
          component: () => import("./Dashboard/ServiceProviderDashboard.vue"),
          redirect: { name: "service-provider-dashboard" },
          beforeEnter: serviceProviderGuestGuard,
          children: [...dashboardServiceProvider.routes]
        }
      ]
    }
  ]
};
