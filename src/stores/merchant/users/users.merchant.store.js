import { defineStore } from "pinia";
import router from "@/router";
import UsersMerchant from "@/services/merchant/users/users.merchant.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useUsersMerchantStore = defineStore("UsersMerchant", {
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
    getUsersMerchant: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await UsersMerchant.get(params);
        this.records = data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showUsersMerchant: async function(id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await UsersMerchant.show(id);
        this.record = data.data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createUsersMerchant: async function(payload) {
      this.uiFlags.isCreated = true;
      try {
        await UsersMerchant.create(payload);
        router.push({ name: "users-merchant-dashboard" });
        toast.success(i18n.global.t("global.actions.add_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
        return error;
      } finally {
        this.uiFlags.isCreated = false;
      }
    },
    updateUsersMerchant: async function(id, payload) {
      this.uiFlags.isUpdated = true;
      try {
        await UsersMerchant.update(id, payload);
        router.push({ name: "users-merchant-dashboard" });
        toast.success(i18n.global.t("global.actions.edit_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
        return error;
      } finally {
        this.uiFlags.isUpdated = false;
      }
    },
    deleteUsersMerchant: async function(id) {
      this.uiFlags.isDeleted = true;
      try {
        await UsersMerchant.delete(id);
        this.getUsersMerchant();
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
