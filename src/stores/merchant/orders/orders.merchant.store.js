import { defineStore } from "pinia";
import router from "@/router";
import OrdersMerchant from "@/services/merchant/orders/orders.merchant.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useOrdersMerchantStore = defineStore("OrdersMerchant", {
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
    getOrdersMerchant: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await OrdersMerchant.get(params);
        this.records = data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showOrdersMerchant: async function(id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await OrdersMerchant.show(id);
        this.record = data.data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createOrdersMerchant: async function(payload) {
      this.uiFlags.isCreated = true;
      try {
        await OrdersMerchant.create(payload);
        this.uiFlags.isCreated = true;
        toast.success(i18n.global.t("global.actions.add_success"));
        router.push({ name: "orders-merchant-dashboard" });
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
        return error;
      } finally {
        this.uiFlags.isCreated = false;
      }
    },
  },
});
