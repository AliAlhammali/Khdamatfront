import { defineStore } from "pinia";
import router from "@/router";
import BranchesMerchant from "@/services/merchant/branches/branches.merchant.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useBranchesMerchantStore = defineStore("BranchesMerchant", {
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
    getBranchesMerchant: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await BranchesMerchant.get(params);
        this.records = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showBranchesMerchant: async function(id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await BranchesMerchant.show(id);
        this.record = data.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createBranchesMerchant: async function(payload) {
      this.uiFlags.isCreated = true;
      try {
        await BranchesMerchant.create(payload);
        router.push({ name: "branches-merchant-dashboard" });
        toast.success(i18n.global.t("global.actions.add_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
      } finally {
        this.uiFlags.isCreated = false;
      }
    },
    updateBranchesMerchant: async function(id, payload) {
      this.uiFlags.isUpdated = true;
      try {
        await BranchesMerchant.update(id, payload);
        router.push({ name: "branches-merchant-dashboard" });
        toast.success(i18n.global.t("global.actions.edit_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
      } finally {
        this.uiFlags.isUpdated = false;
      }
    },
    deleteBranchesMerchant: async function(id) {
      this.uiFlags.isDeleted = true;
      try {
        await BranchesMerchant.delete(id);
        this.getBranchesMerchant();
        toast.success(i18n.global.t("global.actions.delete_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.delete_error"));
      } finally {
        this.uiFlags.isDeleted = false;
      }
    },
  },
});
