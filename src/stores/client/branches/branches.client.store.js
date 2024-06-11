import { defineStore } from "pinia";
import router from "@/router";
import BranchesClient from "@/services/client/branches/branches.client.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useBranchesClientStore = defineStore("BranchesClient", {
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
    getBranchesClient: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await BranchesClient.get(params);
        this.records = data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    showBranchesClient: async function(id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await BranchesClient.show(id);
        this.record = data.data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createBranchesClient: async function(payload, goList = true) {
      this.uiFlags.isCreated = true;
      try {
        const { data } = await BranchesClient.create(payload);
        if (goList) {
          router.push({ name: "branches-Client-dashboard" });
        }
        toast.success(i18n.global.t("global.actions.add_success"));
        return data;
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
        return error;
      } finally {
        this.uiFlags.isCreated = false;
      }
    },
    updateBranchesClient: async function(id, payload) {
      this.uiFlags.isUpdated = true;
      try {
        await BranchesClient.update(id, payload);
        router.push({ name: "branches-Client-dashboard" });
        toast.success(i18n.global.t("global.actions.edit_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
        return error;
      } finally {
        this.uiFlags.isUpdated = false;
      }
    },
    deleteBranchesClient: async function(id) {
      this.uiFlags.isDeleted = true;
      try {
        await BranchesClient.delete(id);
        this.getBranchesClient();
        toast.success(i18n.global.t("global.actions.delete_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.delete_error"));
        return error;
      } finally {
        this.uiFlags.isDeleted = false;
      }
    },
  },
});
