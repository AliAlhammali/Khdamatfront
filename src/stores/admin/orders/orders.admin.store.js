import { defineStore } from "pinia";
import router from "@/router";
import OrdersAdmin from "@/services/admin/orders/orders.admin.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useOrdersAdminStore = defineStore("OrdersAdmin", {
  state: () => ({
    records: [],
    record: {},
    uiFlags: {
      isLoading: false,
    },
  }),
  getters: {},
  actions: {
    getOrdersAdmin: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await OrdersAdmin.get(params);
        this.records = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showOrdersAdmin: async function(id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await OrdersAdmin.show(id);
        this.record = data.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
  },
});
