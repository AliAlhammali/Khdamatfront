import { defineStore } from "pinia";
import router from "@/router";
import MerchantAdminService from "@/services/admin/merchant/merchant.admin.service";
export const useMerchantAdminStore = defineStore("MerchantAdmin", {
  state: () => ({
    records: null,
    record: {},
    uiFlags: {
      isLoading: false,
      isCreated: false,
      isUpdated: false,
      isDeleted: false
    }
  }),
  getters: {},
  actions: {
    getMerchantAdmin: async function () {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await MerchantAdminService.get();
        this.records = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showMerchantAdmin: async function (id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await MerchantAdminService.show(id);
        this.record = data.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createMerchantAdmin: async function (payload) {
      this.uiFlags.isLoading = true;
      try {
        await MerchantAdminService.create(payload);
        this.uiFlags.isCreated = true;
        router.push({ name: "admin-merchant-dashboard" });
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    updateMerchantAdmin: async function (payload) {
      this.uiFlags.isLoading = true;
      try {
        await MerchantAdminService.update(payload.id, payload);
        this.uiFlags.isUpdated = true;
        router.push({ name: "admin-merchant-dashboard" });
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    deleteMerchantAdmin: async function (id) {
      this.uiFlags.isLoading = true;
      try {
        await MerchantAdminService.delete(id);
        this.uiFlags.isDeleted = true;
        this.getMerchantAdmin();
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    }
  }
});
