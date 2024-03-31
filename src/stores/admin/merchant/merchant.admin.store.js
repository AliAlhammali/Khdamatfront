import { defineStore } from "pinia";
import router from "@/router";
import MerchantAdminService from "@/services/admin/merchant/merchant.admin.service";
import Swal from "sweetalert2";
export const useMerchantAdminStore = defineStore("MerchantAdmin", {
  state: () => ({
    records: null,
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
        this.records = data;
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
        router.push({ name: "merchant-dashboard" });
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    updateMerchantAdmin: async function (payload) {
      this.uiFlags.isLoading = true;
      try {
        await MerchantAdminService.update(payload);
        this.uiFlags.isUpdated = true;
        router.push({ name: "merchant-dashboard" });
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
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Merchant has been deleted successfully."
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    }
  }
});
