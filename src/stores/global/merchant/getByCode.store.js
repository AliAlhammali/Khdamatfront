import { defineStore } from "pinia";
import GetMerchantByCode from "@/services/publicAPIs/merchant/getByCode.service.js";
import router from "@/router";

export const useGetMerchantByCodeStore = defineStore("GetMerchantByCode", {
  state: () => ({
    record: {},
    uiFlags: {
      isLoading: false,
    },
  }),
  getters: {},
  actions: {
    getMerchantByCode: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await GetMerchantByCode.get(params);
        this.record = data.data;
      } catch (error) {
        // error 404
        this.record = {};
        router.push({ name: "404" });
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
  },
});
