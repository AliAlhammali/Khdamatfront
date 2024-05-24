import { defineStore } from "pinia";
import router from "@/router";

import CategoriesServiceProvider from "@/services/serviceProvider/categories/categories.serviceProvider.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useCategoriesServiceProviderStore = defineStore(
  "CategoriesServiceProvider",
  {
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
      uiFlagsSubCategories: {
        isLoading: false,
        isCreated: false,
        isUpdated: false,
        isDeleted: false,
      },
    }),
    getters: {},
    actions: {
      getCategoriesServiceProvider: async function(params) {
        this.uiFlags.isLoading = true;
        try {
          const { data } = await CategoriesServiceProvider.get(params);
          this.records = data;
        } catch (error) {
          return error;
        } finally {
          this.uiFlags.isLoading = false;
        }
      },
      getSubCategoriesServiceProvider: async function(params) {
        this.uiFlagsSubCategories.isLoading = true;
        try {
          const { data } = await CategoriesServiceProvider.get(params);
          this.subCategories = data;
        } catch (error) {
          return error;
        } finally {
          this.uiFlagsSubCategories.isLoading = false;
        }
      },
      // showCategoriesServiceProvider: async function (id) {
      //   this.uiFlags.isLoading = true;
      //   try {
      //     const { data } = await CategoriesServiceProvider.show(id);
      //     this.record = data.data;
      //   } catch (error) {
      //     return error;
      //   } finally {
      //     this.uiFlags.isLoading = false;
      //   }
      // },
      // createCategoriesServiceProvider: async function (payload) {
      //   this.uiFlags.isCreated = true;
      //   try {
      //     await CategoriesServiceProvider.create(payload);
      //     router.push({ name: "Categories-ServiceProvider-dashboard" });
      //     toast.success(i18n.global.t("global.actions.add_success"));
      //   } catch (error) {
      //     toast.error(i18n.global.t("global.actions.add_error"));
      //   } finally {
      //     this.uiFlags.isCreated = false;
      //   }
      // },
      // updateCategoriesServiceProvider: async function (payload) {
      //   this.uiFlags.isUpdated = true;
      //   try {
      //     await CategoriesServiceProvider.update(payload.id, payload);
      //     router.push({ name: "Categories-ServiceProvider-dashboard" });
      //     toast.success(i18n.global.t("global.actions.edit_success"));
      //   } catch (error) {
      //     toast.error(i18n.global.t("global.actions.edit_error"));
      //   } finally {
      //     this.uiFlags.isUpdated = false;
      //   }
      // },
      // deleteCategoriesServiceProvider: async function (id) {
      //   this.uiFlags.isDeleted = true;
      //   try {
      //     await CategoriesServiceProvider.delete(id);
      //     this.getCategoriesServiceProvider();
      //     toast.success(i18n.global.t("global.actions.delete_success"));
      //   } catch (error) {
      //     toast.error(i18n.global.t("global.actions.delete_error"));
      //   } finally {
      //     this.uiFlags.isDeleted = false;
      //   }
      // }
    },
  },
);
