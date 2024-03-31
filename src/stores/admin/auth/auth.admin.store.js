import { defineStore } from "pinia";
import router from "@/router";
import authAdminService from "@/services/admin/auth/auth.admin.service";

export const useAuthAdminStore = defineStore("AuthAdmin", {
  state: () => ({
    record: null,
    isLoading: false
  }),
  getters: {},
  actions: {
    loginAdmin: async function (admin) {
      this.isLoading = true;
      try {
        const { data } = await authAdminService.login(admin);
        this.record = data.user;

        // Save token to cookies
        $cookies.set("admin_khadamat_token", data.token);
        $cookies.set("admin_khadamat_user", data.user);

        router.push({ name: "admin-dashboard" });
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    checkCookie: function () {
      const token = $cookies.get("admin_khadamat_token");
      const user = $cookies.get("admin_khadamat_user");

      if (token && user) {
        this.record = user;
      } else {
        router.push({ name: "admin-login" });
      }
    },
  }
});
