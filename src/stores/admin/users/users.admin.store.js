import { defineStore } from "pinia";
import router from "@/router";
import UsersAdminService from "@/services/admin/users/users.admin.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useUsersAdminStore = defineStore("UsersAdmin", {
  state: () => ({
    records: [],
    record: {},
    uiFlags: {
      isLoading: false,
      isCreated: false,
      isUpdated: false,
      isDeleted: false,
    },
  }),
  getters: {},
  actions: {
    getUsersAdmin: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await UsersAdminService.get(params);
        this.records = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showUsersAdmin: async function(id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await UsersAdminService.show(id);
        this.record = data.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createUsersAdmin: async function(payload) {
      this.uiFlags.isCreated = true;
      try {
        await UsersAdminService.create(payload);
        router.push({ name: "users-admin-dashboard" });
        toast.success(i18n.global.t("global.actions.add_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
      } finally {
        this.uiFlags.isCreated = false;
      }
    },
    updateUsersAdmin: async function(id, payload) {
      this.uiFlags.isUpdated = true;
      try {
        await UsersAdminService.update(id, payload);
        router.push({ name: "users-admin-dashboard" });
        toast.success(i18n.global.t("global.actions.edit_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
      } finally {
        this.uiFlags.isUpdated = false;
      }
    },
    deleteUsersAdmin: async function(id) {
      this.uiFlags.isDeleted = true;
      try {
        await UsersAdminService.delete(id);
        this.getUsersAdmin();
        toast.success(i18n.global.t("global.actions.delete_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.delete_error"));
      } finally {
        this.uiFlags.isDeleted = false;
      }
    },
  },
});
