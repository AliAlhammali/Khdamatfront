import { defineStore } from "pinia";
import router from "@/router";
import ServicesAdminService from "@/services/admin/services/services.admin.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useServicesAdminStore = defineStore("ServicesAdmin", {
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
    getServicesAdmin: async function (params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await ServicesAdminService.get(params);
        this.records = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showServicesAdmin: async function (id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await ServicesAdminService.show(id);
        this.record = data.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createServicesAdmin: async function (payload) {
      this.uiFlags.isCreated = true;
      try {
        await ServicesAdminService.create(payload);
        router.push({ name: "users-service-dashboard" });
        toast.success(i18n.global.t("global.actions.add_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
      } finally {
        this.uiFlags.isCreated = false;
      }
    },
    updateServicesAdmin: async function (payload) {
      this.uiFlags.isUpdated = true;
      try {
        await ServicesAdminService.update(payload.id, payload);
        router.push({ name: "users-service-dashboard" });
        toast.success(i18n.global.t("global.actions.edit_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
      } finally {
        this.uiFlags.isUpdated = false;
      }
    },
    deleteServicesAdmin: async function (id) {
      this.uiFlags.isDeleted = true;
      try {
        await ServicesAdminService.delete(id);
        this.getServicesAdmin();
        toast.success(i18n.global.t("global.actions.delete_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.delete_error"));
      } finally {
        this.uiFlags.isDeleted = false;
      }
    }
  }
});
