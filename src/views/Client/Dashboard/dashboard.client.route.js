import ordersClientRoute from "./ClientOrders/orders.client.route";

export default {
  routes: [
    {
      path: "",
      name: "client-dashboard",
      redirect: { name: "orders-client" },
    },
    ...ordersClientRoute.routes,
  ],
};
