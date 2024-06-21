import { defineStore } from "pinia";
import PublicSettingsService from "@/services/publicAPIs/settings/settings.public.service.js";

export const usePublicSettingsStore = defineStore("PublicSettings", {
  state: () => ({
    general: {
      records: {},
      uiFlags: {
        isLoading: false,
        isCreated: false,
        isUpdated: false,
        isDeleted: false,
      },
    },
  }),
  getters: {},
  actions: {
    getGeneralSettings: async function(params) {
      this.general.uiFlags.isLoading = true;
      try {
        const { data } = await PublicSettingsService.get("general", params);
        this.general.records = data.data;
      } catch (error) {
        return error;
      } finally {
        this.general.uiFlags.isLoading = false;
      }
    },
  },
});
