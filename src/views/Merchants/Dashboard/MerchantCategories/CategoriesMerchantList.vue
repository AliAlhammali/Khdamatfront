<template>
  <div class="">
    <data-table
      :title="$t('admin_navbar_links.categories')"
      :placeholder="$t('admin_merchant.search_placeholder_categories')"
      :headers="headers"
      :slots-items="['status', 'actions']"
      :isLoading="uiFlags?.isLoading"
      :items="items"
      :meta="records?.meta"
      :hasFilter="true"
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
              :items="mainCategoriesList"
              :item-title="'text'"
              :item-value="'value'"
              outlined
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              @update:modelValue="(val) => filterByMainCategory(val)"
            />
          </v-col>
          <v-col md="4" cols="12">
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
          </v-col>
          <v-col cols="2">
            <button
              class="pa-3 rounded border text-error"
              @click="clearFilter"
              :disabled="!filterStatus || !filterMainCategory"
            >
              <v-icon size="24">mdi mdi-filter-variant-remove</v-icon>
            </button>
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

      <template #actions="{ item }">
        <div class="d-flex ga-2 align-center">
          <router-link
            :to="{
              path: `/merchant/services`,
              query: { category_id: item.item.id },
            }"
            class="button button--edit px-2 rounded"
          >
            <v-tooltip :text="$t('admin_navbar_links.services')">
              <template v-slot:activator="{ props }">
                <span
                  v-bind="props"
                  class="mdi mdi-24px mdi-account-group"
                ></span>
              </template>
            </v-tooltip>
          </router-link>
        </div>
      </template>
    </data-table>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import DataTable from "@/components/common/DataTable.vue";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import { useCategoriesMerchantStore } from "@/stores/merchant/categories/categories.merchant.store";

export default {
  components: { DataTable, ConfirmDialog },
  data() {
    return {
      params: {
        "filter[keyword]": null,
        perPage: 10,
        page: 1,
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
    };
  },
  async mounted() {
    await this.getCategoriesMerchant(this.params);
    await this.getMainCategoriesMerchant({ "filter[isParent]": 1, listing: 1 });
  },
  computed: {
    ...mapState(useCategoriesMerchantStore, [
      "records",
      "uiFlags",
      "mainCategories",
    ]),
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
          title: this.$t("admin_categories.fields.main_category"),
          align: "start",
          sortable: true,
          key: "parent",
        },
        {
          title: this.$t("admin_categories.fields.status"),
          align: "start",
          sortable: true,
          key: "status",
        },

        {
          title: "#",
          align: "start",
          sortable: false,
          key: "actions",
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
          parent: item.parent ? item.parent.title[this.$i18n.locale] : "---",
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
    ...mapActions(useCategoriesMerchantStore, [
      "getCategoriesMerchant",
      "getMainCategoriesMerchant",
    ]),

    async filterByStatus(status) {
      this.params["filter[status]"] = status;
      await this.getCategoriesMerchant(this.params);
    },

    async filterByMainCategory(categoryId) {
      this.params["filter[main_category_id]"] = categoryId;
      await this.getCategoriesMerchant(this.params);
    },

    async clearFilter() {
      this.filterStatus = null;
      this.filterMainCategory = null;
      this.params["filter[status]"] = null;
      this.params["filter[main_category_id]"] = null;
      await this.getCategoriesMerchant(this.params);
    },

    async changePage(page) {
      this.params.page = page;
      await this.getCategoriesMerchant(this.params);
    },
    async changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      await this.getCategoriesMerchant(this.params);
    },
    async search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      await this.getCategoriesMerchant(key);
    },
  },
};
</script>
<style lang="scss" scoped></style>
