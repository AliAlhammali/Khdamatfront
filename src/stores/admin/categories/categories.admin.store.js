import { defineStore } from "pinia";
import router from "@/router";
import CategoriesAdminService from "@/services/admin/categories/categories.admin.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useCategoriesAdminStore = defineStore("CategoriesAdmin", {
  state: () => ({
    records: [],
    record: {},
    uiFlags: {
      isLoading: false,
      isCreated: false,
      isUpdated: false,
      isDeleted: false,
    },
    subCategories: [],
    uiFlagsSub: {
      isLoading: false,
      isCreated: false,
      isUpdated: false,
      isDeleted: false,
    },
  }),
  getters: {},
  actions: {
    getCategoriesAdmin: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await CategoriesAdminService.get(params);
        this.records = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    getSubCategoriesAdmin: async function(params) {
      this.uiFlagsSub.isLoading = true;
      try {
        const { data } = await CategoriesAdminService.get(params);
        this.subCategories = data.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlagsSub.isLoading = false;
      }
    },
    showCategoriesAdmin: async function(id) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await CategoriesAdminService.show(id);
        this.record = data.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    createCategoriesAdmin: async function(payload) {
      this.uiFlags.isCreated = true;
      try {
        await CategoriesAdminService.create(payload);
        router.push({ name: "admin-categories-dashboard" });
        toast.success(i18n.global.t("global.actions.add_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.add_error"));
      } finally {
        this.uiFlags.isCreated = false;
      }
    },
    updateCategoriesAdmin: async function(id, payload) {
      this.uiFlags.isUpdated = true;
      try {
        await CategoriesAdminService.update(id, payload);
        router.push({ name: "admin-categories-dashboard" });
        toast.success(i18n.global.t("global.actions.edit_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.edit_error"));
      } finally {
        this.uiFlags.isUpdated = false;
      }
    },
    deleteCategoriesAdmin: async function(id) {
      this.uiFlags.isDeleted = true;
      try {
        await CategoriesAdminService.delete(id);
        this.getCategoriesAdmin();
        toast.success(i18n.global.t("global.actions.delete_success"));
      } catch (error) {
        toast.error(i18n.global.t("global.actions.delete_error"));
      } finally {
        this.uiFlags.isDeleted = false;
      }
    },
  },
});
