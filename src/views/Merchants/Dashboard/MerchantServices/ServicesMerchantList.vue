<template>
  <div class="">
    <data-table
      :title="$t('admin_navbar_links.services')"
      :placeholder="$t('admin_services.search_services')"
      :headers="headers"
      :slots-items="['status']"
      :isLoading="uiFlags?.isLoading"
      :items="items"
      :meta="records?.meta"
      :has-filter="true"
      @changePage="changePage"
      @changePerPage="changePerPage"
      @search="search"
    >
      <template #filter>
        <v-row>
          <v-col md="4" cols="12">
            <v-autocomplete
              v-model="filterMainCategory"
              :placeholder="$t('admin_categories.fields.main_category')"
              :label="$t('admin_categories.fields.main_category')"
              :items="mainCategoriesList"
              :item-title="'text'"
              :item-value="'value'"
              outlined
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              @update:modelValue="
                getCategoriesMerchant({
                  'filter[main_category_id]': filterMainCategory,
                })
              "
            />
          </v-col>
          <v-col md="4" cols="12">
            <v-autocomplete
              :placeholder="$t('admin_navbar_links.categories')"
              :label="$t('admin_navbar_links.categories')"
              v-model="filterCategory"
              :items="listCategories"
              item-value="id"
              menu-icon="mdi mdi-chevron-down"
              class="w-100"
              outlined
              :loader="uiFlagsCategories?.isLoading"
              @update:modelValue="(val) => filterByCategory(val)"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              :disabled="!filterMainCategory"
            />
          </v-col>

          <v-col md="4" cols="12">
            <div class="d-flex align-center ga-3">
              <v-select
                v-model="filterStatus"
                :placeholder="$t('admin_merchant.fields.status')"
                :items="listStatus"
                :item-title="'text'"
                :item-value="'value'"
                outlined
                menu-icon="mdi mdi-chevron-down"
                class="text-capitalize rounded-xl"
                :no-data-text="$t('global.actions.no_data')"
                hide-details
                @update:modelValue="(val) => filterByStatus(val)"
              />
              <button
                class="pa-2 rounded border text-error"
                @click="clearFilter"
                :disabled="
                  !filterStatus &&
                  !filterMainCategory &&
                  !params['filter[category_id]']
                "
              >
                <v-icon size="30">mdi mdi-filter-variant-remove</v-icon>
              </button>
            </div>
          </v-col>
        </v-row>
      </template>
      <template #status="{ item }">
        <span
          class="badge badge--status"
          :class="
            item.item.status === 'active' ? 'badge--success' : 'badge--danger'
          "
        >
          {{ $t(`global.status.${item.item.status}`) }}
        </span>
      </template>
    </data-table>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import DataTable from "@/components/common/DataTable.vue";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import { useServicesMerchantStore } from "@/stores/merchant/services/services.merchant.store";
import { useCategoriesMerchantStore } from "@/stores/merchant/categories/categories.merchant.store";

export default {
  components: { DataTable, ConfirmDialog },
  data() {
    return {
      params: {
        "filter[keyword]": null,
        "filter[category_id]": null,
        perPage: 10,
        page: 1,
      },
      paramsCategories: {
        listing: 1,
      },

      listStatus: [
        {
          text: this.$t("global.status.active"),
          value: "active",
        },
        {
          text: this.$t("global.status.inactive"),
          value: "inactive",
        },
      ],
      filterStatus: null,
      filterMainCategory: null,
      filterCategory: null,
    };
  },
  async mounted() {
    // if (this.$route.query.category_id) {
    //   this.params["filter[category_id]"] = this.listCategories.find(
    //     (item) => item.id == this.$route.query.category_id
    //   ).id;
    // }
    // await this.getCategoriesMerchant(this.paramsCategories);
    await this.getMainCategoriesMerchant({ "filter[isParent]": 1, listing: 1 });

    await this.getServicesMerchant(this.params);
  },
  computed: {
    ...mapState(useServicesMerchantStore, ["records", "uiFlags"]),
    ...mapState(useCategoriesMerchantStore, {
      categories: "records",
      uiFlagsCategories: "uiFlags",
      mainCategories: "mainCategories",
      uiFlagsMainCategories: "uiFlags",
    }),
    headers() {
      return [
        {
          title: "#",
          align: "start",
          sortable: true,
          key: "id",
        },
        {
          title: this.$t("admin_categories.fields.title"),
          align: "start",
          sortable: true,
          key: "title",
        },
        {
          title: this.$t("admin_merchant.fields.category"),
          align: "start",
          sortable: true,
          key: "category",
        },
        {
          title: this.$t("admin_merchant.fields.price"),
          align: "start",
          sortable: true,
          key: "price",
        },
        {
          title: this.$t("admin_categories.fields.status"),
          align: "start",
          sortable: true,
          key: "status",
        },
      ];
    },
    items() {
      return this.records?.data?.map((item) => {
        return {
          ...item,
          title: item.title ? item.title[this.$i18n.locale] : "---",
          email: item.email ? item.email : "---",
          status: item.status ? item.status : "---",
          category: item.category
            ? item.category.title[this.$i18n.locale]
            : "---",
        };
      });
    },
    listCategories() {
      return this.categories?.data?.map((item) => {
        return {
          ...item,
          title: item.title ? item.title[this.$i18n.locale] : "---",
        };
      });
    },
    mainCategoriesList() {
      return this.mainCategories?.data?.map((item) => {
        return {
          text: item.title[this.$i18n.locale],
          value: item.id,
        };
      });
    },
  },
  methods: {
    ...mapActions(useServicesMerchantStore, ["getServicesMerchant"]),
    ...mapActions(useCategoriesMerchantStore, [
      "getCategoriesMerchant",
      "getMainCategoriesMerchant",
    ]),

    async filterByStatus(status) {
      this.params["filter[status]"] = status;
      await this.getServicesMerchant(this.params);
    },

    async filterByMainCategory(categoryId) {
      this.params["filter[main_category_id]"] = categoryId;
      await this.getServicesMerchant(this.params);
    },

    async filterByCategory(categoryId) {
      this.params["filter[category_id]"] = categoryId;
      await this.getServicesMerchant(this.params);
    },

    async clearFilter() {
      this.filterStatus = null;
      this.filterMainCategory = null;
      this.filterCategory = null;
      this.params["filter[category_id]"] = null;
      this.params["filter[status]"] = null;
      this.params["filter[main_category_id]"] = null;
      await this.getServicesMerchant(this.params);
    },

    async changePage(page) {
      this.params.page = page;
      await this.getServicesMerchant(this.params);
    },
    async changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      await this.getServicesMerchant(this.params);
    },
    async search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      await this.getServicesMerchant(key);
    },
  },
  watch: {
    $route(to, from) {
      if (to.query.category_id) {
        this.params["filter[category_id]"] = this.listCategories.find(
          (item) => item.id == to.query.category_id
        ).id;
      } else {
        this.params["filter[category_id]"] = null;
      }
      this.getServicesMerchant(this.params);
    },
    filterMainCategory() {
      this.filterCategory = null;
    },
  },
};
</script>
<style lang="scss" scoped></style>
