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
        },
        {
          path: "register",
          name: "client-register",
          component: () => import("./Auth/ClientRegister.vue"),
        },
        {
          path: "",
          component: () => import("./Dashboard/ClientDashboard.vue"),
          redirect: { name: "client-dashboard" },
          children: [...dashboardClientRoute.routes],
        },
      ],
    },
  ],
};
