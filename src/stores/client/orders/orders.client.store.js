import { defineStore } from "pinia";
import router from "@/router";
import OrdersClient from "@/services/client/orders/orders.client.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useOrdersClientStore = defineStore("OrdersClient", {
  state: () => ({
    records: [],
    record: {},
    uiFlags: {
      isLoading: false,
      isCreated: false,
      isUpdated: false,
      isDeleted: false,
    },
    recordsScroll: [],
  }),
  getters: {},
  actions: {
    getOrdersClient: async function(params, isFilterApplied = false) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await OrdersClient.get(params);

        // If filters or search are applied, reset the recordsScroll
        if (isFilterApplied) {
          this.recordsScroll = [];
        }

        // Update records and recordsScroll
        this.records = data;
        this.recordsScroll.push(...data.data);
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showOrdersClient: async function(id, params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await OrdersClient.show(id, params);
        this.record = data.data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createOrdersClient: async function(payload) {
      this.uiFlags.isCreated = true;
      try {
        await OrdersClient.create(payload);
        this.uiFlags.isCreated = true;
        toast.success(i18n.global.t("global.actions.add_success"));
        router.push({ name: "orders-Client-dashboard" });
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
        return error;
      } finally {
        this.uiFlags.isCreated = false;
      }
    },
  },
});
