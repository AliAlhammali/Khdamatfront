<template>
  <div class="border mt-4 pa-4">
    <h3 class="mb-3">
      {{ $t("orders.select_service") }}
    </h3>
    <v-row>
      <v-col md="6" cols="12">
        <v-select
          v-model="main_category_id"
          :placeholder="$t('admin_navbar_links.categories')"
          :label="$t('admin_navbar_links.categories')"
          :items="categoryList"
          :item-title="'title'"
          :item-value="'id'"
          outlined
          menu-icon="mdi mdi-chevron-down"
          class="text-capitalize rounded-xl"
          hide-details
          :no-data-text="$t('global.actions.no_data')"
          @update:model-value="getSubCategory"
          :error="errors?.main_category_id?.$error"
        />
        <p
          class="text-error mt-2 d-flex ga-2 align-center"
          v-if="errors?.main_category_id?.$error"
        >
          <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
          <span>{{ $t("errors.required") }}</span>
        </p>
      </v-col>
      <v-col md="6" cols="12">
        <v-select
          v-model="category_id"
          :placeholder="$t('admin_categories.sub_categories')"
          :label="$t('admin_categories.sub_categories')"
          :items="subCategoryList"
          :item-title="'title'"
          :item-value="'id'"
          outlined
          menu-icon="mdi mdi-chevron-down"
          class="text-capitalize rounded-xl"
          hide-details
          :no-data-text="$t('global.actions.no_data')"
          @update:model-value="getService"
          :error="
            !category_id &&
            errors?.items?.$each.$response.$data[0]?.item_id.$error
          "
        />
        <p
          class="text-error mt-2 d-flex ga-2 align-center"
          v-if="
            !category_id &&
            errors?.items?.$each?.$response?.$data[0]?.item_id.$error
          "
        >
          <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
          <span>{{ $t("errors.required") }}</span>
        </p>
      </v-col>
    </v-row>
    <div class="mt-4" v-for="(item, index) in items" :key="index">
      <v-row class="align-start">
        <v-col md="3" cols="12">
          <v-select
            v-model="items[index]"
            :placeholder="$t('admin_navbar_links.services')"
            :label="$t('admin_navbar_links.services')"
            :items="servicesList"
            :item-title="'title'"
            :item-value="'id'"
            outlined
            menu-icon="mdi mdi-chevron-down"
            class="text-capitalize rounded-xl"
            hide-details
            :no-data-text="$t('global.actions.no_data')"
            return-object
            @update:model-value="(selected) => mapItem(selected, index)"
            :error="
              errors?.items?.$each?.$response?.$data[index]?.item_id?.$error
            "
          />
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="
              errors?.items?.$each?.$response?.$data[index]?.item_id?.$error
            "
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>
        <v-col md="1" cols="12">
          <v-text-field
            :label="$t('orders.price')"
            v-model="item.price"
            outlined
            readonly
          />
        </v-col>
        <v-col md="3" cols="12">
          <v-text-field
            :label="$t('orders.quantity')"
            outlined
            readonly
            v-model="item.quantity"
          >
            <template #prepend-inner>
              <v-btn color="primary me-6" flat @click="item.quantity++">
                <span class="mdi mdi-plus"></span>
              </v-btn>
            </template>

            <template #append-inner>
              <v-btn
                color="primary"
                flat
                @click="item.quantity > 1 && item.quantity--"
              >
                <span class="mdi mdi-minus"></span>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
        <v-col md="2" cols="12">
          <v-text-field
            :label="$t('orders.total')"
            outlined
            readonly
            :value="item.quantity * item.price"
            v-model="items[index].total"
          />
        </v-col>
        <v-col md="2" cols="12">
          <div class="d-flex align-center ga-2">
            <v-btn color="primary" @click="addNewItem">
              <span class="mdi mdi-plus"></span>
            </v-btn>
            <v-btn
              color="error"
              @click="items.splice(index, 1)"
              v-if="index !== 0"
            >
              <span class="mdi mdi-delete"></span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { useCategoriesClientStore } from "@/stores/client/categories/categories.client.store";
import { useServicesClientStore } from "@/stores/client/services/services.client.store";

import { mapActions, mapState } from "pinia";
export default {
  props: {
    orderData: {
      type: Object,
      default: () => ({}),
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      category_id: null,
      main_category_id: null,
      service: null,
      items: [],
      newItem: {
        quantity: 1,
        title: "",
        total: 0,
        price: 0,
      },
    };
  },
  async mounted() {
    await this.getCategoriesClient({ "filter[isParent]": 1, listing: 1 });
  },
  computed: {
    ...mapState(useCategoriesClientStore, {
      categories: "records",
      categoriesUiFlags: "uiFlags",
      subCategories: "subCategories",
      uiFlagsSub: "uiFlagsSub",
    }),
    ...mapState(useServicesClientStore, {
      services: "records",
      uiFlagsServices: "uiFlags",
    }),

    categoryList() {
      return this.categories?.data?.map((item) => {
        return {
          ...item,
          title: item.title[this.$i18n.locale],
        };
      });
    },
    subCategoryList() {
      return this.subCategories?.data?.map((item) => {
        return {
          ...item,
          title: item.title[this.$i18n.locale],
        };
      });
    },
    servicesList() {
      return this.services?.data
        ?.map((item) => {
          return {
            ...item,
            title: item.title[this.$i18n.locale],
          };
        })
        .filter((item) => {
          return !this.items.some((i) => i.id === item.id);
        });
    },
  },
  methods: {
    ...mapActions(useCategoriesClientStore, [
      "getCategoriesClient",
      "getSubCategoriesClient",
    ]),
    ...mapActions(useServicesClientStore, ["getServicesClient"]),
    getService() {
      this.getServicesClient({
        "filter[category_id]": this.category_id,
        forCreatingOrder: 1,
      });
      this.items = [];
      this.items.push({
        ...this.newItem,
        category_id: this.category_id,
      });
    },
    getSubCategory() {
      this.getSubCategoriesClient({
        "filter[parent_id]": this.main_category_id,
        listing: 1,
      });
      this.category_id = null;
      this.service = null;
      this.items = [];
      this.orderData.main_category_id = this.main_category_id;
    },
    mapItem(item, index) {
      const newItem = {
        ...item,
        quantity: 1,
        total: item.quantity * item.price,
      };

      if (this.items[index]) {
        this.items[index] = newItem;
        this.orderData.items = this.items.map((i) => {
          return {
            id: i.id,
            quantity: i.quantity,
            category_id: this.category_id,
          };
        });

        return;
      }
    },
    addNewItem() {
      const newItem = {
        ...this.newItem,
        category_id: this.category_id,
      };
      this.items.push(newItem);
    },
  },

  watch: {
    items: {
      handler() {
        this.orderData.items = this.items.map((i) => {
          return {
            item_id: i.id,
            quantity: i.quantity,
            category_id: this.category_id,
          };
        });
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped></style>
