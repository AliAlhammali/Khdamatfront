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
      isUpdating: false,
    },
    recordsScroll: [],
  }),
  getters: {},
  actions: {
    getOrdersAdmin: async function(params, isFilterApplied = false) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await OrdersAdmin.get(params);
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
    showOrdersAdmin: async function(id, params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await OrdersAdmin.show(id, params);
        this.record = data.data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    updateOrdersAdmin: async function(id, params) {
      this.uiFlags.isUpdating = true;
      try {
        await OrdersAdmin.update(id, params);
        toast.success(i18n.global.t("global.actions.edit_success"));
        // await this.getOrdersAdmin();
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
        return error;
      } finally {
        this.uiFlags.isUpdating = false;
      }
    },
  },
});
