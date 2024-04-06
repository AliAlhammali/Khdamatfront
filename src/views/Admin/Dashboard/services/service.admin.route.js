export default {
  routes: [
    {
      path: "service",
      name: "admin-service-dashboard",
      component: () => import("./ServiceList.vue")
    },
    {
      path: "service/create",
      name: "admin-service-create",
      component: () => import("./ServiceCreate.vue")
    },
    {
      path: "service/:id/edit",
      name: "admin-service-edit",
      component: () => import("./ServiceCreate.vue")
    }
  ]
};
