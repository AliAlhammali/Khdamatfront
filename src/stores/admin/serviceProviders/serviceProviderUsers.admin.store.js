import { defineStore } from "pinia";
import router from "@/router";
import ServiceProvidersUsersAdmin from "@/services/admin/serviceProvidersAdmin/service.providers.users.admin.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useServiceProvidersUsersAdminStore = defineStore(
  "ServiceProvidersUsersAdmin",
  {
    state: () => ({
      records: null,
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
      getServiceProvidersUsersAdmin: async function(params) {
        this.uiFlags.isLoading = true;
        try {
          const { data } = await ServiceProvidersUsersAdmin.get(params);
          this.records = data;
        } catch (error) {
          console.error(error);
        } finally {
          this.uiFlags.isLoading = false;
        }
      },
      showServiceProvidersUsersAdmin: async function(id) {
        this.uiFlags.isLoading = true;
        try {
          const { data } = await ServiceProvidersUsersAdmin.show(id);
          this.record = data.data;
        } catch (error) {
          console.error(error);
        } finally {
          this.uiFlags.isLoading = false;
        }
      },
      createServiceProvidersUsersAdmin: async function(payload) {
        this.uiFlags.isCreated = true;
        try {
          await ServiceProvidersUsersAdmin.create(payload);
          router.push({
            name: "admin-service-provider-users-dashboard",
          });
          toast.success(i18n.global.t("global.actions.add_success"));
        } catch (error) {
          toast.error(i18n.global.t("global.actions.add_error"));
        } finally {
          this.uiFlags.isCreated = false;
        }
      },
      updateServiceProvidersUsersAdmin: async function(id, payload) {
        this.uiFlags.isUpdated = true;
        try {
          await ServiceProvidersUsersAdmin.update(id, payload);
          router.push({
            name: "admin-service-provider-users-dashboard",
          });
          toast.success(i18n.global.t("global.actions.edit_success"));
        } catch (error) {
          console.log(error, "error");
          toast.error(i18n.global.t("global.actions.edit_error"));
        } finally {
          this.uiFlags.isUpdated = false;
        }
      },
      deleteServiceProvidersUsersAdmin: async function(id) {
        try {
          await ServiceProvidersUsersAdmin.delete(id);
          this.uiFlags.isDeleted = true;
          toast.success(i18n.global.t("global.actions.delete_success"));
        } catch (error) {
          toast.error(i18n.global.t("global.actions.delete_error"));
        } finally {
          this.uiFlags.isDeleted = false;
        }
      },
    },
  },
);
