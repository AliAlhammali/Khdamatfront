import { defineStore } from "pinia";
import Actions from "@/services/actions/upload.services";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";
const toast = useToast();

export const useGlobalActionsStore = defineStore("GlobalActions", {
  state: () => ({
    isLoading: false
  }),
  getters: {},
  actions: {
    uploadFile: async function (file) {
      this.isLoading = true;
      try {
        const data = await Actions.upload_file(file);
        toast.success(i18n.global.t("global.actions.upload_success"));
        return data;
      } catch (error) {
        toast.error(i18n.global.t("global.actions.upload_error"));
      } finally {
        this.isLoading = false;
      }
    }
  }
});
