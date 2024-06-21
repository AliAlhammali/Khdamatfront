export default {
  routes: [
    {
      path: "settings",
      name: "admin-settings",
      component: () => import("./WrapperSettings.vue"),
      redirect: { name: "admin-settings-general" },
      children: [
        {
          path: "general",
          name: "admin-settings-general",
          component: () => import("./general/SettingsGeneral.vue"),
        },
        {
          path: "taxes",
          name: "admin-settings-taxes",
          component: () => import("./taxes/SettingsTaxes.vue"),
        },
      ],
    },
  ],
};
