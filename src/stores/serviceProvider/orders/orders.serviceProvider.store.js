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
        isUpdating: false,
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
      showOrdersServiceProvider: async function(id, params) {
        this.uiFlags.isLoading = true;
        try {
          const { data } = await OrdersServiceProvider.show(id, params);
          this.record = data.data;
        } catch (error) {
          console.error(error);
        } finally {
          this.uiFlags.isLoading = false;
        }
      },
      updateOrdersServiceProvider: async function(id, params) {
        this.uiFlags.isUpdating = true;
        try {
          await OrdersServiceProvider.update(id, params);
          toast.success(i18n.global.t("global.actions.edit_success"));
          // await this.getOrdersServiceProvider();
        } catch (error) {
          toast.error(i18n.global.t("global.actions.edit_error"));
        } finally {
          this.uiFlags.isUpdating = false;
        }
      },
    },
  },
);
