import { defineStore } from "pinia";
import SettingsAdminService from "@/services/admin/settings/settings.admin.service.js";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useSettingsAdminStore = defineStore("SettingsAdmin", {
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
    taxes: {
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
        const { data } = await SettingsAdminService.get("general", params);
        this.general.records = data.data;
      } catch (error) {
        return error;
      } finally {
        this.general.uiFlags.isLoading = false;
      }
    },
    updateGeneralSettings: async function(payload) {
      this.general.uiFlags.isUpdated = true;
      try {
        await SettingsAdminService.update("general", payload);
        toast.success(i18n.global.t("global.actions.edit_success"));
        await this.getGeneralSettings();
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
        return error;
      } finally {
        this.general.uiFlags.isUpdated = false;
      }
    },
    getTaxesSettings: async function(params) {
      this.taxes.uiFlags.isLoading = true;
      try {
        const { data } = await SettingsAdminService.get("taxes", params);
        this.taxes.records = data.data;
      } catch (error) {
        return error;
      } finally {
        this.taxes.uiFlags.isLoading = false;
      }
    },
    updateTaxesSettings: async function(payload) {
      this.taxes.uiFlags.isUpdated = true;
      try {
        await SettingsAdminService.update("taxes", payload);
        toast.success(i18n.global.t("global.actions.edit_success"));
        await this.getTaxesSettings();
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
        return error;
      } finally {
        this.taxes.uiFlags.isUpdated = false;
      }
    },
  },
});
