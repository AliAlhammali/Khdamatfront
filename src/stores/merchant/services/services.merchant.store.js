import { defineStore } from "pinia";
import router from "@/router";
import ServicesMerchant from "@/services/merchant/services/services.merchant.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useServicesMerchantStore = defineStore("ServicesMerchant", {
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
    getServicesMerchant: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await ServicesMerchant.get(params);
        this.records = data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    // showServicesMerchant: async function (id) {
    //   this.uiFlags.isLoading = true;
    //   try {
    //     const { data } = await ServicesMerchant.show(id);
    //     this.record = data.data;
    //   } catch (error) {
    //     return error;
    //   } finally {
    //     this.uiFlags.isLoading = false;
    //   }
    // },
    // createServicesMerchant: async function (payload) {
    //   this.uiFlags.isCreated = true;
    //   try {
    //     await ServicesMerchant.create(payload);
    //     router.push({ name: "services-merchant-dashboard" });
    //     toast.success(i18n.global.t("global.actions.add_success"));
    //   } catch (error) {
    //     toast.error(i18n.global.t("global.actions.add_error"));
    //   } finally {
    //     this.uiFlags.isCreated = false;
    //   }
    // },
    // updateServicesMerchant: async function (payload) {
    //   this.uiFlags.isUpdated = true;
    //   try {
    //     await ServicesMerchant.update(payload.id, payload);
    //     router.push({ name: "services-merchant-dashboard" });
    //     toast.success(i18n.global.t("global.actions.edit_success"));
    //   } catch (error) {
    //     toast.error(i18n.global.t("global.actions.edit_error"));
    //   } finally {
    //     this.uiFlags.isUpdated = false;
    //   }
    // },
    // deleteServicesMerchant: async function (id) {
    //   this.uiFlags.isDeleted = true;
    //   try {
    //     await ServicesMerchant.delete(id);
    //     this.getServicesMerchant();
    //     toast.success(i18n.global.t("global.actions.delete_success"));
    //   } catch (error) {
    //     toast.error(i18n.global.t("global.actions.delete_error"));
    //   } finally {
    //     this.uiFlags.isDeleted = false;
    //   }
    // }
  },
});
