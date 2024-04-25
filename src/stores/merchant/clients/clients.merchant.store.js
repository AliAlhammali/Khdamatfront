import { defineStore } from "pinia";
import router from "@/router";
import ClientsMerchant from "@/services/merchant/clients/clients.merchant.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useClientsMerchantStore = defineStore("ClientsMerchant", {
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
    getClientsMerchant: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await ClientsMerchant.get(params);
        this.records = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showClientsMerchant: async function(id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await ClientsMerchant.show(id);
        this.record = data.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createClientsMerchant: async function(payload, goList = true) {
      this.uiFlags.isCreated = true;
      try {
        const { data } = await ClientsMerchant.create(payload);
        if (goList) {
          router.push({ name: "clients-merchant-dashboard" });
        }
        toast.success(i18n.global.t("global.actions.add_success"));
        return data;
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
      } finally {
        this.uiFlags.isCreated = false;
      }
    },
    updateClientsMerchant: async function(id, payload) {
      this.uiFlags.isUpdated = true;
      try {
        await ClientsMerchant.update(id, payload);
        router.push({ name: "clients-merchant-dashboard" });
        toast.success(i18n.global.t("global.actions.edit_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
      } finally {
        this.uiFlags.isUpdated = false;
      }
    },
    deleteClientsMerchant: async function(id) {
      this.uiFlags.isDeleted = true;
      try {
        await ClientsMerchant.delete(id);
        this.getClientsMerchant();
        toast.success(i18n.global.t("global.actions.delete_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.delete_error"));
      } finally {
        this.uiFlags.isDeleted = false;
      }
    },
  },
});
