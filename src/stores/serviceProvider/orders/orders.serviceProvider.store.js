import { defineStore } from "pinia";
import router from "@/router";
import OrdersServiceProvider from "@/services/serviceProvider/orders/orders.serviceProvider.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useOrdersServiceProviderStore = defineStore(
  "OrdersServiceProvider",
  {
    state: () => ({
      records: [],
      record: {},
      uiFlags: {
        isLoading: false,
      },
    }),
    getters: {},
    actions: {
      getOrdersServiceProvider: async function(params) {
        this.uiFlags.isLoading = true;
        try {
          const { data } = await OrdersServiceProvider.get(params);
          this.records = data;
        } catch (error) {
          console.error(error);
        } finally {
          this.uiFlags.isLoading = false;
        }
      },
      showOrdersServiceProvider: async function(id) {
        this.uiFlags.isLoading = true;
        try {
          const { data } = await OrdersServiceProvider.show(id);
          this.record = data.data;
        } catch (error) {
          console.error(error);
        } finally {
          this.uiFlags.isLoading = false;
        }
      },
    },
  },
);
