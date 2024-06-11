import branchesClientRoute from "./ClientBranches/branches.client.route";
import categoriesClientRoute from "./ClientCategories/categories.client.route";
import ordersClientRoute from "./ClientOrders/orders.client.route";
import servicesClientRoute from "./ClientServices/services.client.route";

export default {
  routes: [
    {
      path: "",
      name: "client-dashboard",
      redirect: { name: "orders-client" },
    },
    ...ordersClientRoute.routes,
    ...branchesClientRoute.routes,
    ...servicesClientRoute.routes,
    ...categoriesClientRoute.routes,
  ],
};
