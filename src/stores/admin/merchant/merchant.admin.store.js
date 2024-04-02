import { defineStore } from "pinia";
import router from "@/router";
import MerchantAdminService from "@/services/admin/merchant/merchant.admin.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useMerchantAdminStore = defineStore("MerchantAdmin", {
  state: () => ({
    records: null,
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
    getMerchantAdmin: async function (params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await MerchantAdminService.get(params);
        this.records = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showMerchantAdmin: async function (id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await MerchantAdminService.show(id);
        this.record = data.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createMerchantAdmin: async function (payload) {
      this.uiFlags.isLoading = true;
      try {
        await MerchantAdminService.create(payload);
        this.uiFlags.isCreated = true;
        router.push({ name: "admin-merchant-dashboard" });
        toast.success(i18n.global.t("global.actions.add_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    updateMerchantAdmin: async function (payload) {
      this.uiFlags.isLoading = true;
      try {
        await MerchantAdminService.update(payload.id, payload);
        this.uiFlags.isUpdated = true;
        router.push({ name: "admin-merchant-dashboard" });
        toast.success(i18n.global.t("global.actions.edit_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    deleteMerchantAdmin: async function (id) {
      this.uiFlags.isLoading = true;
      try {
        await MerchantAdminService.delete(id);
        this.uiFlags.isDeleted = true;
        this.getMerchantAdmin();
        toast.success(i18n.global.t("global.actions.delete_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.delete_error"));
      } finally {
        this.uiFlags.isLoading = false;
      }
    }
  }
});
