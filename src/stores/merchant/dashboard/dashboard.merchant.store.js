import { defineStore } from "pinia";
import DashboardMerchant from "@/services/merchant/dashboard/dashboard.merchant.service";

export const useDashboardMerchantStore = defineStore("DashboardMerchant", {
  state: () => ({
    figures: {
      records: [],
      isLoading: false,
    },
    topStaffByOrders: {
      records: [],
      isLoading: false,
    },
    topStaffCompletedOrders: {
      records: [],
      isLoading: false,
    },
    calenderOrders: {
      records: [],
      isLoading: false,
    },
  }),
  getters: {},
  actions: {
    getFigures: async function(params) {
      this.figures.isLoading = true;
      try {
        const { data } = await DashboardMerchant.get_figures(params);
        this.figures.records = data.data;
      } catch (error) {
        return error;
      } finally {
        this.figures.isLoading = false;
      }
    },
    getTopStaffByOrders: async function(params) {
      this.topStaffByOrders.isLoading = true;
      try {
        const { data } = await DashboardMerchant.get_top_staff_by_orders(
          params,
        );
        this.topStaffByOrders.records = data.data;
      } catch (error) {
        return error;
      } finally {
        this.topStaffByOrders.isLoading = false;
      }
    },
    getTopStaffCompletedOrders: async function(params) {
      this.topStaffCompletedOrders.isLoading = true;
      try {
        const { data } = await DashboardMerchant.get_top_staff_completed_orders(
          params,
        );
        this.topStaffCompletedOrders.records = data.data;
      } catch (error) {
        return error;
      } finally {
        this.topStaffCompletedOrders.isLoading = false;
      }
    },
    getCalenderOrders: async function(params) {
      this.calenderOrders.isLoading = true;
      try {
        const { data } = await DashboardMerchant.get_calender_orders(params);
        this.calenderOrders.records = data.data;
      } catch (error) {
        return error;
      } finally {
        this.calenderOrders.isLoading = false;
      }
    },
  },
});
