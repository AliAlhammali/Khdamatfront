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
      isDeleted: false
    }
  }),
  getters: {},
  actions: {
    getMerchantUsersAdmin: async function (params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await MerchantUsersAdminService.get(params);
        this.records = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showMerchantUsersAdmin: async function (id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await MerchantUsersAdminService.show(id);
        this.record = data.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createMerchantUsersAdmin: async function (payload) {
      this.uiFlags.isCreated = true;
      try {
        await MerchantUsersAdminService.create(payload);
        router.push({ name: "admin-merchant-dashboard" });
        toast.success(i18n.global.t("global.actions.add_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
      } finally {
        this.uiFlags.isCreated = false;
      }
    },
    updateMerchantUsersAdmin: async function (payload) {
      this.uiFlags.isUpdated = true;
      try {
        await MerchantUsersAdminService.update(payload.id, payload);
        router.push({ name: "admin-merchant-dashboard" });
        toast.success(i18n.global.t("global.actions.edit_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
      } finally {
        this.uiFlags.isUpdated = false;
      }
    },
    deleteMerchantUsersAdmin: async function (id) {
      try {
        await MerchantUsersAdminService.delete(id);
        this.uiFlags.isDeleted = true;
        toast.success(i18n.global.t("global.actions.delete_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.delete_error"));
      } finally {
        this.uiFlags.isDeleted = false;
      }
    }
  }
});
