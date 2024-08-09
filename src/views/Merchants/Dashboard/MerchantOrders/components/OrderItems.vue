<template>
  <div class="border mt-4 pa-4">
    <h3 class="mb-3">
      {{ $t("orders.select_service") }}
    </h3>
    <v-row>
      <v-col md="12" cols="12">
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
    </v-row>
    <!-- {{ orderData.items }} -->
    <div class="mt-4" v-for="(item, index) in orderData.items" :key="index">
      <v-row class="align-start">
        <v-col md="6" cols="12">
          <v-select
            v-model="item.category_id"
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
            @update:model-value="getService(item.category_id)"
            :error="
              errors?.items?.$each?.$response?.$data[index]?.category_id?.$error
            "
          />
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="
              errors?.items?.$each?.$response?.$data[index]?.category_id?.$error
            "
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>
        <v-col md="6" cols="12">
          <v-select
            v-model="item.item_id"
            :placeholder="$t('admin_navbar_links.services')"
            :label="$t('admin_navbar_links.services')"
            :items="getServicesListByCat(item.category_id)"
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
        <v-col md="3" cols="12">
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
        <v-col md="3" cols="12">
          <v-text-field
            :label="$t('orders.total')"
            outlined
            readonly
            :value="item.quantity * item.price"
            v-model="item.total"
          />
        </v-col>
        <v-col md="3" cols="12">
          <div class="d-flex align-center ga-2">
            <v-btn color="primary" @click="addNewItem" class="w-50">
              <span class="mdi mdi-plus"></span>
            </v-btn>
            <v-btn
              color="error"
              class="w-50"
              @click="orderData.items.splice(index, 1)"
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
import { useCategoriesMerchantStore } from "@/stores/merchant/categories/categories.merchant.store";
import { useServicesMerchantStore } from "@/stores/merchant/services/services.merchant.store";
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
        category_id: null,
      },
    };
  },
  async mounted() {
    await this.getCategoriesMerchant({ "filter[isParent]": 1, listing: 1 });
  },
  computed: {
    ...mapState(useCategoriesMerchantStore, {
      categories: "records",
      categoriesUiFlags: "uiFlags",
      subCategories: "subCategories",
      uiFlagsSub: "uiFlagsSub",
    }),
    ...mapState(useServicesMerchantStore, {
      services: "records",
      uiFlagsServices: "uiFlags",
      allServices: "allServices",
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
    ...mapActions(useCategoriesMerchantStore, [
      "getCategoriesMerchant",
      "getSubCategoriesMerchant",
    ]),
    ...mapActions(useServicesMerchantStore, ["getServicesMerchant"]),
    async getService(category_id) {
      await this.getServicesMerchant({
        "filter[category_id]": category_id,
        forCreatingOrder: 1,
      });

      const service = {
        [category_id]: this.servicesList,
      };

      if (this.allServices.find((ser) => ser[category_id]) == undefined) {
        this.allServices.push({ ...service });
      }

      // this.getServicesMerchant({
      //   "filter[main_category_id]": this.main_category_id,
      //   forCreatingOrder: 1,
      // });
      // this.items = [];
      // this.items.push({
      // ...this.newItem,
      // category_id: this.category_id,
      // });
    },
    getServicesListByCat(id) {
      if (this.allServices.find((ser) => ser[id])) {
        return this.allServices.find((ser) => ser[id])[id];
      }
    },
    getSubCategory() {
      this.getSubCategoriesMerchant({
        "filter[parent_id]": this.main_category_id,
        listing: 1,
      });

      // this.category_id = null;
      this.service = null;
      // this.items = [];
      this.orderData.items = [];
      this.orderData.items.push({
        ...this.newItem,
      });
      this.orderData.main_category_id = this.main_category_id;
    },
    mapItem(item, index) {
      const newItem = {
        // ...item,
        quantity: 1,
        total: item.quantity * item.price,
      };
      if (this.orderData.items[index]) {
        this.orderData.items[index] = {
          ...this.orderData.items[index],
          item_id: this.orderData.items[index].item_id.id,
          price: this.orderData.items[index].item_id.price,
        };

        this.orderData.items = this.orderData.items.map((obj) => {
          return {
            category_id: obj.category_id,
            item_id: obj.item_id,
            quantity: obj.quantity,
            price: obj.price,
            total: obj.total,
          };
        });

        return;
      }
    },
    addNewItem() {
      // const newItem = {
      //   ...this.newItem,
      //   category_id: this.category_id,
      // };
      // this.items.push(newItem);

      this.errors.$reset();

      this.orderData.items.push({
        ...this.newItem,
      });
    },
  },

  // watch: {
  //   items: {
  //     handler() {
  //       this.orderData.items = this.items.map((i) => {
  //         console.log(i, "i");

  //         return {
  //           item_id: i.id,
  //           quantity: i.quantity,
  //           category_id: this.category_id,
  //         };
  //       });
  //     },
  //     deep: true,
  //   },
  // },
};
</script>
<style lang="scss" scoped></style>
