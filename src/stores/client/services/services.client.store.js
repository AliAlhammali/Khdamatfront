import { defineStore } from "pinia";
import ServicesClient from "@/services/client/services/services.client.service";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useServicesClientStore = defineStore("ServicesClient", {
  state: () => ({
    records: [],
    record: {},
    uiFlags: {
      isLoading: false,
      isCreated: false,
      isUpdated: false,
      isDeleted: false,
    },
  }),
  getters: {},
  actions: {
    getServicesClient: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await ServicesClient.get(params);
        this.records = data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
  },
});
