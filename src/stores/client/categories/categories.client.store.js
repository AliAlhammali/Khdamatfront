import { defineStore } from "pinia";
import CategoriesClient from "@/services/client/categories/categories.client.service";

export const useCategoriesClientStore = defineStore("CategoriesClient", {
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
    getCategoriesClient: async function(params) {
      this.uiFlags.isLoading = true;
      try {
        const { data } = await CategoriesClient.get(params);
        this.records = data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    getMainCategoriesClient: async function(params) {
      this.uiFlagsMain.isLoading = true;
      try {
        const { data } = await CategoriesClient.get(params);
        this.mainCategories = data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlagsMain.isLoading = false;
      }
    },
    getSubCategoriesClient: async function(params) {
      this.uiFlagsSub.isLoading = true;
      try {
        const { data } = await CategoriesClient.get(params);
        this.subCategories = data;
      } catch (error) {
        return error;
      } finally {
        this.uiFlagsSub.isLoading = false;
      }
    },
  },
});
