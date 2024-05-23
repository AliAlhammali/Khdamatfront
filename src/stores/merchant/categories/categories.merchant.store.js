import { defineStore } from "pinia";
import router from "@/router";
import CategoriesMerchant from "@/services/merchant/categories/categories.merchant.service";
import { useToast } from "vue-toastification";
import { i18n } from "@/plugins/I18n";

const toast = useToast();

export const useCategoriesMerchantStore = defineStore("CategoriesMerchant", {
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
    mainCategories: [],
    uiFlagsMain: {
      isLoading: false,
      isCreated: false,
      isUpdated: false,
      isDeleted: false,
    },
  }),
  getters: {},
  actions: {
    getCategoriesMerchant: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await CategoriesMerchant.get(params);
        this.records = data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    getMainCategoriesMerchant: async function(params) {
      this.uiFlagsMain.isLoading = true;
      try {
        const { data } = await CategoriesMerchant.get(params);
        this.mainCategories = data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlagsMain.isLoading = false;
      }
    },
    getSubCategoriesMerchant: async function(params) {
      this.uiFlagsSub.isLoading = true;
      try {
        const { data } = await CategoriesMerchant.get(params);
        this.subCategories = data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlagsSub.isLoading = false;
      }
    },
    // showCategoriesMerchant: async function (id) {
    //   this.uiFlags.isLoading = true;
    //   try {
    //     const { data } = await CategoriesMerchant.show(id);
    //     this.record = data.data;
    //   } catch (error) {
    //     return error;
    //   } finally {
    //     this.uiFlags.isLoading = false;
    //   }
    // },
    // createCategoriesMerchant: async function (payload) {
    //   this.uiFlags.isCreated = true;
    //   try {
    //     await CategoriesMerchant.create(payload);
    //     router.push({ name: "Categories-merchant-dashboard" });
    //     toast.success(i18n.global.t("global.actions.add_success"));
    //   } catch (error) {
    //     toast.error(i18n.global.t("global.actions.add_error"));
    //   } finally {
    //     this.uiFlags.isCreated = false;
    //   }
    // },
    // updateCategoriesMerchant: async function (payload) {
    //   this.uiFlags.isUpdated = true;
    //   try {
    //     await CategoriesMerchant.update(payload.id, payload);
    //     router.push({ name: "Categories-merchant-dashboard" });
    //     toast.success(i18n.global.t("global.actions.edit_success"));
    //   } catch (error) {
    //     toast.error(i18n.global.t("global.actions.edit_error"));
    //   } finally {
    //     this.uiFlags.isUpdated = false;
    //   }
    // },
    // deleteCategoriesMerchant: async function (id) {
    //   this.uiFlags.isDeleted = true;
    //   try {
    //     await CategoriesMerchant.delete(id);
    //     this.getCategoriesMerchant();
    //     toast.success(i18n.global.t("global.actions.delete_success"));
    //   } catch (error) {
    //     toast.error(i18n.global.t("global.actions.delete_error"));
    //   } finally {
    //     this.uiFlags.isDeleted = false;
    //   }
    // }
  },
});
