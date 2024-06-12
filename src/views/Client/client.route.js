import {
  clientAuthGuard,
  clientGuestGuard,
} from "@/helper/client.router.helper";
import dashboardClientRoute from "./Dashboard/dashboard.client.route";

export default {
  routes: [
    {
      path: "/client",
      component: () => import("./WrapperClient.vue"),
      redirect: { name: "client-login" },
      children: [
        {
          path: "login",
          name: "client-login",
          component: () => import("./Auth/ClientLogin.vue"),
          beforeEnter: clientAuthGuard,
        },
        {
          path: "register",
          name: "client-register",
          component: () => import("./Auth/ClientRegister.vue"),
        },
        {
          path: "OTP",
          name: "client-OTP",
          component: () => import("./Auth/ClientOTP.vue"),
        },
        {
          path: "",
          component: () => import("./Dashboard/ClientDashboard.vue"),
          redirect: { name: "client-dashboard" },
          beforeEnter: clientGuestGuard,
          children: [...dashboardClientRoute.routes],
        },
      ],
    },
  ],
};
