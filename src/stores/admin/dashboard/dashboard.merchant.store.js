import { defineStore } from "pinia";
import DashboardAdmin from "@/services/admin/dashboard/dashboard.admin.service";

export const useDashboardAdminStore = defineStore("DashboardAdmin", {
  state: () => ({
    figures: {
      records: [],
      isLoading: false,
    },
    topMerchantsByOrders: {
      records: [],
      isLoading: false,
    },
    topSPCompletedByOrders: {
      records: [],
      isLoading: false,
    },
    topServices: {
      records: [],
      isLoading: false,
    },
    topCategories: {
      records: [],
      isLoading: false,
    },
  }),
  getters: {},
  actions: {
    getFigures: async function(params) {
      this.figures.isLoading = true;
      try {
        const { data } = await DashboardAdmin.get_figures(params);
        this.figures.records = data.data;
      } catch (error) {
        return error;
      } finally {
        this.figures.isLoading = false;
      }
    },
    getTopMerchantsByOrders: async function(params) {
      this.topMerchantsByOrders.isLoading = true;
      try {
        const { data } = await DashboardAdmin.get_top_merchants_by_orders(
          params,
        );
        this.topMerchantsByOrders.records = data.data;
      } catch (error) {
        return error;
      } finally {
        this.topMerchantsByOrders.isLoading = false;
      }
    },
    getTopSPCompletedByOrders: async function(params) {
      this.topSPCompletedByOrders.isLoading = true;
      try {
        const { data } = await DashboardAdmin.get_top_sp_completed_by_orders(
          params,
        );
        this.topSPCompletedByOrders.records = data.data;
      } catch (error) {
        return error;
      } finally {
        this.topSPCompletedByOrders.isLoading = false;
      }
    },

    getTopServices: async function(params) {
      this.topServices.isLoading = true;
      try {
        const { data } = await DashboardAdmin.get_top_services(params);
        this.topServices.records = data.data;
      } catch (error) {
        return error;
      } finally {
        this.topServices.isLoading = false;
      }
    },

    getTopCategories: async function(params) {
      this.topCategories.isLoading = true;
      try {
        const { data } = await DashboardAdmin.get_top_categories(params);
        this.topCategories.records = data.data;
      } catch (error) {
        return error;
      } finally {
        this.topCategories.isLoading = false;
      }
    },
  },
});
