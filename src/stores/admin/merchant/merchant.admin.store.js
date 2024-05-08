import { defineStore } from "pinia";
import router from "@/router";
import MerchantAdminService from "@/services/admin/merchant/merchant.admin.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useMerchantAdminStore = defineStore("MerchantAdmin", {
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
    getMerchantAdmin: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await MerchantAdminService.get(params);
        this.records = data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showMerchantAdmin: async function(id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await MerchantAdminService.show(id);
        this.record = data.data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createMerchantAdmin: async function(payload) {
      this.uiFlags.isCreated = true;
      try {
        await MerchantAdminService.create(payload);
        router.push({ name: "admin-merchant-dashboard" });
        toast.success(i18n.global.t("global.actions.add_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
        return error;
      } finally {
        this.uiFlags.isCreated = false;
      }
    },
    updateMerchantAdmin: async function(id, payload) {
      this.uiFlags.isUpdated = true;
      try {
        await MerchantAdminService.update(id, payload);
        router.push({ name: "admin-merchant-dashboard" });
        toast.success(i18n.global.t("global.actions.edit_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
        return error;
      } finally {
        this.uiFlags.isUpdated = false;
      }
    },
    deleteMerchantAdmin: async function(id) {
      this.uiFlags.isDeleted = true;
      try {
        await MerchantAdminService.delete(id);
        this.getMerchantAdmin();
        toast.success(i18n.global.t("global.actions.delete_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.delete_error"));
        return error;
      } finally {
        this.uiFlags.isDeleted = false;
      }
    },
  },
});
