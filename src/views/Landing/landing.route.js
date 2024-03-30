export default {
  routes: [
    {
      path: "",
      name: "home",
      component: () => import("./WrapperLanding.vue")
    }
  ]
};
