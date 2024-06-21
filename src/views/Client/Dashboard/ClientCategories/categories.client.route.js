import { clientRolesGuard } from "@/helper/client.router.helper";

export default {
  routes: [
    {
      path: "categories",
      name: "categories-client-dashboard",
      component: () => import("./CategoriesClientList.vue"),
      meta: {
        roles: ["admin"],
      },
      // beforeEnter: clientRolesGuard,
    },
  ],
};
