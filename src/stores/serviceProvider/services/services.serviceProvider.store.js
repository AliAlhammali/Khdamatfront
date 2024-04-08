import { defineStore } from "pinia";
import router from "@/router";
import ServicesServiceProvider from "@/services/serviceProvider/services/services.serviceProvider.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useServicesServiceProviderStore = defineStore("ServicesServiceProvider", {
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
    getServicesServiceProvider: async function (params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await ServicesServiceProvider.get(params);
        this.records = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    // showServicesServiceProvider: async function (id) {
    //   this.uiFlags.isLoading = true;
    //   try {
    //     const { data } = await ServicesServiceProvider.show(id);
    //     this.record = data.data;
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     this.uiFlags.isLoading = false;
    //   }
    // },
    // createServicesServiceProvider: async function (payload) {
    //   this.uiFlags.isCreated = true;
    //   try {
    //     await ServicesServiceProvider.create(payload);
    //     router.push({ name: "services-ServiceProvider-dashboard" });
    //     toast.success(i18n.global.t("global.actions.add_success"));
    //   } catch (error) {
    //     toast.error(i18n.global.t("global.actions.add_error"));
    //   } finally {
    //     this.uiFlags.isCreated = false;
    //   }
    // },
    // updateServicesServiceProvider: async function (payload) {
    //   this.uiFlags.isUpdated = true;
    //   try {
    //     await ServicesServiceProvider.update(payload.id, payload);
    //     router.push({ name: "services-ServiceProvider-dashboard" });
    //     toast.success(i18n.global.t("global.actions.edit_success"));
    //   } catch (error) {
    //     toast.error(i18n.global.t("global.actions.edit_error"));
    //   } finally {
    //     this.uiFlags.isUpdated = false;
    //   }
    // },
    // deleteServicesServiceProvider: async function (id) {
    //   this.uiFlags.isDeleted = true;
    //   try {
    //     await ServicesServiceProvider.delete(id);
    //     this.getServicesServiceProvider();
    //     toast.success(i18n.global.t("global.actions.delete_success"));
    //   } catch (error) {
    //     toast.error(i18n.global.t("global.actions.delete_error"));
    //   } finally {
    //     this.uiFlags.isDeleted = false;
    //   }
    // }
  }
});
