import { clientRolesGuard } from "@/helper/client.router.helper";

export default {
  routes: [
    {
      path: "branches",
      name: "branches-client-dashboard",
      component: () => import("./BranchesClientList.vue"),
      meta: {
        roles: ["admin"],
      },
      // beforeEnter: clientRolesGuard,
    },
    {
      path: "branches/create",
      name: "branches-client-create",
      component: () => import("./BranchesClientCreate.vue"),
      meta: {
        edit: false,
        roles: ["admin"],
      },
      // beforeEnter: clientRolesGuard,
    },
    {
      path: "branches/:id/edit",
      name: "branches-client-edit",
      component: () => import("./BranchesClientCreate.vue"),
      meta: {
        edit: true,
        roles: ["admin"],
      },
      // beforeEnter: clientRolesGuard,
    },
  ],
};
