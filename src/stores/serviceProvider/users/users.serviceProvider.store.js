import { defineStore } from "pinia";
import router from "@/router";
import UsersServiceProvider from "@/services/serviceProvider/users/users.serviceProvider.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useUsersServiceProviderStore = defineStore("UsersServiceProvider", {
  state: () => ({
    records: [],
    record: {},
    uiFlags: {
      isLoading: false,
      isCreated: false,
      isUpdated: false,
      isDeleted: false
    }
  }),
  getters: {},
  actions: {
    getUsersServiceProvider: async function (params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await UsersServiceProvider.get(params);
        this.records = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showUsersServiceProvider: async function (id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await UsersServiceProvider.show(id);
        this.record = data.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createUsersServiceProvider: async function (payload) {
      this.uiFlags.isCreated = true;
      try {
        await UsersServiceProvider.create(payload);
        router.push({ name: "users-service-provider-dashboard" });
        toast.success(i18n.global.t("global.actions.add_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
      } finally {
        this.uiFlags.isCreated = false;
      }
    },
    updateUsersServiceProvider: async function (payload) {
      this.uiFlags.isUpdated = true;
      try {
        await UsersServiceProvider.update(payload.id, payload);
        router.push({ name: "users-service-provider-dashboard" });
        toast.success(i18n.global.t("global.actions.edit_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
      } finally {
        this.uiFlags.isUpdated = false;
      }
    },
    deleteUsersServiceProvider: async function (id) {
      this.uiFlags.isDeleted = true;
      try {
        await UsersServiceProvider.delete(id);
        this.getUsersServiceProvider();
        toast.success(i18n.global.t("global.actions.delete_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.delete_error"));
      } finally {
        this.uiFlags.isDeleted = false;
      }
    }
  }
});
