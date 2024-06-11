import { merchantRolesGuard } from "@/helper/merchant.router.helper";

export default {
  routes: [
    {
      path: "branches",
      name: "branches-client-dashboard",
      component: () => import("./BranchesClientList.vue"),
      meta: {
        roles: ["admin"],
      },
      // beforeEnter: merchantRolesGuard,
    },
    {
      path: "branches/create",
      name: "branches-client-create",
      component: () => import("./BranchesClientCreate.vue"),
      meta: {
        edit: false,
        roles: ["admin"],
      },
      // beforeEnter: merchantRolesGuard,
    },
    {
      path: "branches/:id/edit",
      name: "branches-client-edit",
      component: () => import("./BranchesClientCreate.vue"),
      meta: {
        edit: true,
        roles: ["admin"],
      },
      // beforeEnter: merchantRolesGuard,
    },
  ],
};
