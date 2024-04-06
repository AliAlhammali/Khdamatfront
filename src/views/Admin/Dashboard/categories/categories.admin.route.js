export default {
  routes: [
    {
      path: "categories",
      name: "admin-categories-dashboard",
      component: () => import("./CategoriesList.vue")
    },
    {
      path: "categories/create",
      name: "admin-categories-create",
      component: () => import("./CategoriesCreate.vue")
    },
    {
      path: "categories/:id/edit",
      name: "admin-categories-edit",
      component: () => import("./CategoriesCreate.vue")
    }
  ]
};
