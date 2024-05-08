import { defineStore } from "pinia";
import router from "@/router";
import ServiceProvidersAdmin from "@/services/admin/serviceProvidersAdmin/service.providers.admin.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useServiceProvidersAdminStore = defineStore(
  "ServiceProvidersAdmin",
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
      getServiceProvidersAdmin: async function(params) {
        this.uiFlags.isLoading = true;
        try {
          const { data } = await ServiceProvidersAdmin.get(params);
          this.records = data;
        } catch (error) {
          return error;
        } finally {
          this.uiFlags.isLoading = false;
        }
      },
      showServiceProvidersAdmin: async function(id) {
        this.uiFlags.isLoading = true;
        try {
          const { data } = await ServiceProvidersAdmin.show(id);
          this.record = data.data;
        } catch (error) {
          return error;
        } finally {
          this.uiFlags.isLoading = false;
        }
      },
      createServiceProvidersAdmin: async function(payload) {
        this.uiFlags.isCreated = true;
        try {
          await ServiceProvidersAdmin.create(payload);
          router.push({
            name: "admin-service-provider-dashboard",
          });
          toast.success(i18n.global.t("global.actions.add_success"));
        } catch (error) {
          toast.error(i18n.global.t("global.actions.add_error"));
          return error;
        } finally {
          this.uiFlags.isCreated = false;
        }
      },
      updateServiceProvidersAdmin: async function(id, payload) {
        this.uiFlags.isUpdated = true;
        try {
          await ServiceProvidersAdmin.update(id, payload);
          router.push({
            name: "admin-service-provider-dashboard",
          });
          toast.success(i18n.global.t("global.actions.edit_success"));
        } catch (error) {
          toast.error(i18n.global.t("global.actions.edit_error"));
          return error;
        } finally {
          this.uiFlags.isUpdated = false;
        }
      },
      deleteServiceProvidersAdmin: async function(id) {
        this.uiFlags.isDeleted = true;
        try {
          await ServiceProvidersAdmin.delete(id);
          this.getServiceProvidersAdmin();
          toast.success(i18n.global.t("global.actions.delete_success"));
        } catch (error) {
          toast.error(i18n.global.t("global.actions.delete_error"));
          return error;
        } finally {
          this.uiFlags.isDeleted = false;
        }
      },
    },
  },
);
