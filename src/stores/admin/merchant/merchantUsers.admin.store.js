import { defineStore } from "pinia";
import router from "@/router";
import MerchantUsersAdminService from "@/services/admin/merchant/merchantUsers.admin.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useMerchantUsersAdminStore = defineStore("MerchantUsersAdmin", {
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
    getMerchantUsersAdmin: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await MerchantUsersAdminService.get(params);
        this.records = data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showMerchantUsersAdmin: async function(id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await MerchantUsersAdminService.show(id);
        this.record = data.data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createMerchantUsersAdmin: async function(payload) {
      this.uiFlags.isCreated = true;
      try {
        await MerchantUsersAdminService.create(payload);
        router.push({ name: "admin-merchant-users-dashboard" });
        toast.success(i18n.global.t("global.actions.add_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
        return error;
      } finally {
        this.uiFlags.isCreated = false;
      }
    },
    updateMerchantUsersAdmin: async function(id, payload) {
      this.uiFlags.isUpdated = true;
      try {
        await MerchantUsersAdminService.update(id, payload);
        router.push({ name: "admin-merchant-users-dashboard" });
        toast.success(i18n.global.t("global.actions.edit_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
        return error;
      } finally {
        this.uiFlags.isUpdated = false;
      }
    },
    deleteMerchantUsersAdmin: async function(id) {
      try {
        await MerchantUsersAdminService.delete(id);
        this.uiFlags.isDeleted = true;
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
