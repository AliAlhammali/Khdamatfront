<template>
  <div>
    <data-table
      :title="$t('admin_navbar_links.orders')"
      :placeholder="$t('admin_merchant.search_placeholder_orders')"
      :headers="headers"
      :slots-items="['actions']"
      :isLoading="uiFlags?.isLoading"
      :items="items"
      :meta="records?.meta"
      @changePage="changePage"
      @changePerPage="changePerPage"
      @search="search"
      :hasFilter="true"
      :isMobile="isMobile"
      :createPage="`/client/orders/create`"
    >
      <template #filter>
        <v-row>
          <v-col md="4" cols="12">
            <div class="d-flex align-center ga-2">
              <p>{{ $t("global.started_from") }}</p>
              <date-picker
                :editable="false"
                :placeholder="$t('global.started_from')"
                v-model="filtersParams['filter[started_from]']"
                v-model:value="filtersParams['filter[started_from]']"
                type="date"
                class="mb-2 w-100"
                value-type="format"
                format="YYYY-MM-DD"
                @change="(val) => filterOrderBy(val, 'filter[started_from]')"
              />
            </div>
          </v-col>
          <v-col md="4" cols="12">
            <div class="d-flex align-center ga-2">
              <p>{{ $t("global.started_to") }}</p>
              <date-picker
                :editable="false"
                :placeholder="$t('global.started_to')"
                v-model="filtersParams['filter[started_to]']"
                v-model:value="filtersParams['filter[started_to]']"
                type="date"
                class="mb-2 w-100"
                value-type="format"
                format="YYYY-MM-DD"
                @change="(val) => filterOrderBy(val, 'filter[started_to]')"
              />
            </div>
          </v-col>
          <!-- <v-col md="3" cols="12">
            <v-autocomplete
              :placeholder="$t('admin_merchant.fields.service_provider')"
              :label="$t('admin_merchant.fields.service_provider')"
              v-model="filtersParams['filter[service_provider_id]']"
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl mb-2 w-100"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              outlined
              :items="SPList"
              item-title="title"
              item-value="value"
              @update:model-value="
                (val) => filterOrderBy(val, 'filter[service_provider_id]')
              "
            ></v-autocomplete>
          </v-col> -->

          <v-col md="4" cols="12">
            <!-- Main Category -->
            <v-autocomplete
              :placeholder="$t('global.main_category')"
              :label="$t('global.main_category')"
              v-model="main_category_id"
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl mb-2 w-100"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              outlined
              :items="mainCategoriesList"
              item-title="title"
              item-value="value"
              @update:model-value="
                (val) =>
                  getCategoriesClient({
                    'filter[parent_id]': val,
                    listing: 1,
                  })
              "
            ></v-autocomplete>
          </v-col>

          <v-col md="3" cols="12">
            <v-autocomplete
              :placeholder="$t('admin_navbar_links.categories')"
              :label="$t('admin_navbar_links.categories')"
              v-model="filtersParams['filter[main_category_id]']"
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl mb-2 w-100"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              outlined
              :items="categoriesList"
              item-title="title"
              item-value="value"
              @update:model-value="
                (val) => filterOrderBy(val, 'filter[main_category_id]')
              "
              :disabled="!main_category_id"
            ></v-autocomplete>
          </v-col>

          <!-- <v-col md="3" cols="12">
            <v-autocomplete
              :placeholder="$t('global.client_name')"
              :label="$t('global.client_name')"
              v-model="filtersParams['filter[merchant_client_id]']"
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl mb-2 w-100"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              outlined
              :items="clientsList"
              item-title="title"
              item-value="value"
              @update:model-value="
                (val) => filterOrderBy(val, 'filter[merchant_client_id]')
              "
            ></v-autocomplete>
          </v-col> -->

          <!-- <v-col md="3" cols="12">
            <v-autocomplete
              :placeholder="$t('admin_navbar_links.branches')"
              :label="$t('admin_navbar_links.branches')"
              v-model="filtersParams['filter[merchant_branch_id]']"
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl mb-2 w-100"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              outlined
              :items="branchesList"
              item-title="title"
              item-value="value"
              @update:model-value="
                (val) => filterOrderBy(val, 'filter[merchant_branch_id]')
              "
            ></v-autocomplete>
          </v-col> -->

          <v-col md="3" cols="12">
            <!-- Status -->
            <v-select
              :placeholder="$t('admin_merchant.fields.status')"
              :label="$t('admin_merchant.fields.status')"
              v-model="filtersParams['filter[status]']"
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl mb-2 w-100"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              outlined
              :items="orderStatus"
              item-title="text"
              item-value="value"
              @update:model-value="
                (val) => filterOrderBy(val, 'filter[status]')
              "
            ></v-select>
          </v-col>
          <v-col cols="2">
            <button
              class="pa-3 rounded border text-error"
              @click="clearFilter"
              :disabled="
                !filtersParams['filter[started_from]'] &&
                !filtersParams['filter[started_to]'] &&
                !filtersParams['filter[service_provider_id]'] &&
                !filtersParams['filter[status]'] &&
                !filtersParams['filter[merchant_client_id]'] &&
                !filtersParams['filter[main_category_id]'] &&
                !filtersParams['filter[merchant_branch_id]'] &&
                !filtersParams['filter[merchant_client_id]']
              "
            >
              <v-icon size="24">mdi mdi-filter-variant-remove</v-icon>
            </button>
          </v-col>
        </v-row>
      </template>

      <template v-slot:actions="{ item }">
        <router-link
          :to="`/client/orders/${item.item.id}`"
          class="button button--edit px-2 rounded"
        >
          <v-tooltip :text="$t('global.actions.show')">
            <template v-slot:activator="{ props }">
              <span v-bind="props" class="mdi mdi-24px mdi-eye-outline"></span>
            </template>
          </v-tooltip>
        </router-link>
      </template>

      <template #cards>
        <CardItem :items="recordsScroll" @load="load">
          <template #items>
            <v-row>
              <v-col
                cols="12"
                v-for="(item, index) in itemsMobile"
                :key="index"
              >
                <div class="border pa-2 rounded-lg">
                  <div class="mb-2"># {{ item.id }}</div>
                  <div class="mb-2">
                    <v-icon size="20">mdi mdi-calendar</v-icon>
                    {{ item.started_at }}
                  </div>
                  <div class="mb-2">
                    <v-icon size="20">mdi mdi-account</v-icon>
                    {{ item.client_name }}
                  </div>
                  <div>
                    <router-link
                      :to="`/client/orders/${item.id}`"
                      class="button button--edit px-2 rounded w-100 d-flex justify-center"
                    >
                      <v-tooltip :text="$t('global.actions.show')">
                        <template v-slot:activator="{ props }">
                          <span
                            v-bind="props"
                            class="mdi mdi-24px mdi-eye-outline"
                          ></span>
                        </template>
                      </v-tooltip>
                    </router-link>
                  </div>
                </div>
              </v-col>
            </v-row>
          </template>
        </CardItem>
      </template>
    </data-table>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import DataTable from "@/components/common/DataTable.vue";

import CardItem from "@/components/ui/CardItem.vue";

import { useCategoriesClientStore } from "@/stores/client/categories/categories.client.store";
import { useServicesClientStore } from "@/stores/client/services/services.client.store";
import { useBranchesClientStore } from "@/stores/client/branches/branches.client.store";
import { useOrdersClientStore } from "@/stores/client/orders/orders.client.store";
export default {
  components: { DataTable, CardItem },
  data() {
    return {
      params: {
        "filter[keyword]": null,
        perPage: 10,
        page: 1,
        includeOrderMerchant: 1,
        includeOrderSP: 1,
        includeOrderMerchantUser: 1,
        includeOrderMerchantClient: 1,
        includeOrderMainCategory: 1,
        includeOrderAddress: 1,
        includeOrderItems: 1,
        sortAsc: 1,
      },
      filtersParams: {
        "filter[started_to]": null,
        "filter[started_from]": null,
        "filter[service_provider_id]": null,
        "filter[status]": null,
        "filter[merchant_client_id]": null,
        "filter[main_category_id]": null,
        "filter[merchant_branch_id]": null,
      },
      main_category_id: null,
    };
  },
  async mounted() {
    await this.getOrdersClient(this.params);
    await this.getServicesClient();
    await this.getMainCategoriesClient({ "filter[isParent]": 1, listing: 1 });
    await this.getBranchesClient();
  },
  computed: {
    ...mapState(useOrdersClientStore, ["records", "uiFlags", "recordsScroll"]),
    ...mapState(useServicesClientStore, {
      servicesMerchant: "records",
      uiFlagsServices: "uiFlags",
    }),
    ...mapState(useCategoriesClientStore, {
      categoriesMerchant: "records",
      mainCategoriesMerchant: "mainCategories",
    }),

    ...mapState(useBranchesClientStore, {
      branchesMerchant: "records",
      uiFlagsBranches: "uiFlags",
    }),

    headers() {
      return [
        {
          title: this.$t("global.order_number"),
          align: "start",
          sortable: true,
          key: "id",
        },
        {
          title: this.$t("global.created_at"),
          align: "start",
          sortable: true,
          key: "created_at",
        },
        {
          title: this.$t("global.main_category"),
          align: "start",
          sortable: true,
          key: "main_category",
        },
        // {
        //   title: this.$t("admin_merchant.fields.title"),
        //   align: "start",
        //   sortable: true,
        //   key: "address[0].name",
        // },
        // {
        //   title: this.$t("admin_merchant.fields.phone"),
        //   align: "start",
        //   sortable: true,
        //   key: "address[0].phone",
        // },
        {
          title: this.$t("global.client_name"),
          align: "start",
          sortable: true,
          key: "client_name",
        },
        {
          title: this.$t("global.client_phone"),
          align: "start",
          sortable: true,
          key: "client_phone",
        },
        // {
        //   title: this.$t("admin_merchant.fields.service_provider"),
        //   align: "start",
        //   sortable: true,
        //   key: "service_provider",
        // },
        {
          title: this.$t("global.completed_at"),
          align: "start",
          sortable: true,
          key: "completed_at",
        },

        {
          title: this.$t("admin_merchant.fields.total"),
          align: "start",
          sortable: true,
          key: "totals.total",
        },

        {
          title: this.$t("admin_merchant.fields.status"),
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
          main_category: item.main_category.title
            ? item.main_category.title[this.$i18n.locale]
            : "---",
          merchant_title: item.merchant ? item.merchant.title : "---",
          client_name: item.merchant_client ? item.merchant_client.name : "---",
          client_phone: item.merchant_client
            ? item.merchant_client.phone
            : "---",
          completed_at: item.completed_at ? item.completed_at : "---",
          status: item.status
            ? this.$t(`global.order_status.${item.status}`)
            : "---",
          pick_up_type: item.pick_up_type
            ? this.$t(`global.order_type.${item.pick_up_type}`)
            : "---",
          service_provider: item.service_provider
            ? item.service_provider.title
            : "---",
        };
      });
    },
    itemsMobile() {
      return this.recordsScroll?.map((item) => {
        return {
          id: item.id,
          started_at: item.started_at,
          client_name: item.merchant_client ? item.merchant_client.name : "---",
        };
      });
    },
    orderStatus() {
      return [
        { value: "new", text: this.$t("global.order_status.new") },
        {
          value: "confirmed",
          text: this.$t("global.order_status.confirmed"),
        },
        {
          value: "on_the_way",
          text: this.$t("global.order_status.on_the_way"),
        },
        {
          value: "in_progress",
          text: this.$t("global.order_status.in_progress"),
        },
        {
          value: "completed",
          text: this.$t("global.order_status.completed"),
        },
        {
          value: "canceled",
          text: this.$t("global.order_status.canceled"),
        },
      ];
    },
    SPList() {
      return (
        this.servicesMerchant?.data?.map((item) => {
          return {
            value: item.id,
            title: item.title ? item.title[this.$i18n.locale] : "---",
          };
        }) || []
      );
    },
    categoriesList() {
      return (
        this.categoriesMerchant?.data?.map((item) => {
          return {
            value: item.id,
            title: item.title ? item.title[this.$i18n.locale] : "---",
          };
        }) || []
      );
    },
    mainCategoriesList() {
      return (
        this.mainCategoriesMerchant?.data?.map((item) => {
          return {
            value: item.id,
            title: item.title ? item.title[this.$i18n.locale] : "---",
          };
        }) || []
      );
    },

    branchesList() {
      return (
        this.branchesMerchant?.data?.map((item) => {
          return {
            value: item.id,
            title: item.name,
          };
        }) || []
      );
    },
    isMobile() {
      return window.innerWidth < 768;
    },
  },
  methods: {
    ...mapActions(useOrdersClientStore, ["getOrdersClient"]),
    ...mapActions(useServicesClientStore, ["getServicesClient"]),
    ...mapActions(useCategoriesClientStore, [
      "getCategoriesClient",
      "getMainCategoriesClient",
    ]),
    ...mapActions(useBranchesClientStore, ["getBranchesClient"]),

    async filterOrderBy(value, key) {
      this.filtersParams[key] = value;
      await this.getOrdersClient(
        {
          ...this.filtersParams,
          ...this.params,
        },
        true,
      );
    },

    async clearFilter() {
      this.filtersParams = {
        "filter[started_to]": null,
        "filter[started_from]": null,
        "filter[service_provider_id]": null,
        "filter[status]": null,
        "filter[merchant_client_id]": null,
        "filter[main_category_id]": null,
        "filter[merchant_branch_id]": null,
        "filter[merchant_client_id]": null,
      };
      this.main_category_id = null;

      await this.getOrdersClient({ ...this.params }, true);
    },

    async changePage(page) {
      this.params.page = page;
      await this.getOrdersClient(this.params);
    },
    async changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      await this.getOrdersClient(this.params);
    },
    async search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      await this.getOrdersClient(key, true);
    },

    beforeToday(date) {
      return date && date > new Date();
    },
    afterToday(date) {
      return date && date < new Date();
    },

    async load({ done }) {
      if (this.records?.meta?.currentPage < this.records?.meta?.lastPage) {
        this.params.page = this.records?.meta?.currentPage + 1;
        await this.getOrdersClient(this.params);
        await done("ok");
      } else {
        await done("empty");
      }
    },
  },
  watch: {
    main_category_id: {
      handler() {
        //  empty
        this.filtersParams["filter[main_category_id]"] = null;
      },
    },
  },
};
</script>
<style lang="scss" scoped></style>
