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
    >
      <template #filter>
        <v-row>
          <v-col md="3" cols="12">
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
          <v-col md="3" cols="12">
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
          <v-col md="3" cols="12">
            <v-autocomplete
              v-model="filtersParams['filter[service_provider_id]']"
              :placeholder="$t('admin_merchant.fields.service_provider')"
              :label="$t('admin_merchant.fields.service_provider')"
              :items="SPList.data"
              :item-title="'title'"
              :item-value="'id'"
              outlined
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              @update:model-value="
                (val) => filterOrderBy(val, 'filter[service_provider_id]')
              "
            />
          </v-col>
          <v-col md="3" cols="12">
            <v-autocomplete
              v-model="filtersParams['filter[merchant_id]']"
              :placeholder="$t('admin_merchant.fields.merchant')"
              :label="$t('admin_merchant.fields.merchant')"
              :items="merchants.data"
              :item-title="'title'"
              :item-value="'id'"
              outlined
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              @update:model-value="
                (val) => filterOrderBy(val, 'filter[merchant_id]')
              "
            />
          </v-col>
          <v-col md="3" cols="12">
            <v-autocomplete
              v-model="filtersParams['filter[merchant_client_id]']"
              :placeholder="$t('global.client_name')"
              :label="$t('global.client_name')"
              :items="merchants.data"
              :item-title="'title'"
              :item-value="'id'"
              outlined
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              @update:model-value="
                (val) => filterOrderBy(val, 'filter[merchant_client_id]')
              "
            />
          </v-col>
          <v-col md="3" cols="12">
            <v-autocomplete
              v-model="filtersParams['filter[main_category_id]']"
              :placeholder="$t('global.main_category')"
              :label="$t('global.main_category')"
              :items="mainCategoriesList"
              :item-title="'title'"
              :item-value="'id'"
              outlined
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              @update:model-value="(val) => getSubCategories(val)"
            />
          </v-col>
          <v-col md="3" cols="12">
            <v-autocomplete
              v-model="filtersParams['filter[category_id]']"
              :placeholder="$t('global.show_order.category')"
              :label="$t('global.show_order.category')"
              :items="categoriesList"
              :item-title="'title'"
              :item-value="'id'"
              outlined
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              :disabled="!filtersParams['filter[main_category_id]']"
              @update:model-value="
                (val) => filterOrderBy(val, 'filter[category_id]')
              "
            />
          </v-col>
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
            />
          </v-col>
          <v-col cols="2">
            <button
              class="pa-3 rounded border text-error"
              @click="clearFilter"
              :disabled="
                !filtersParams['filter[status]'] &&
                !filtersParams['filter[merchant_id]'] &&
                !filtersParams['filter[service_provider_id]'] &&
                !filtersParams['filter[merchant_client_id]'] &&
                !filtersParams['filter[main_category_id]'] &&
                !filtersParams['filter[category_id]'] &&
                !filtersParams['filter[started_from]'] &&
                !filtersParams['filter[started_to]']
              "
            >
              <v-icon size="24">mdi mdi-filter-variant-remove</v-icon>
            </button>
          </v-col>
        </v-row>
      </template>
      <template v-slot:actions="{ item }">
        <div class="d-flex align-center ga-2">
          <router-link
            :to="`/admin/orders/${item.item.id}`"
            class="button button--edit px-2 rounded"
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
          <v-btn
            class="button button--edit px-2 rounded"
            @click="showModal(item.item.id)"
            v-if="
              item?.item?.status_key !== 'completed' &&
              item?.item?.status_key !== 'canceled'
            "
          >
            <v-tooltip :text="$t('global.actions.add_sp')">
              <template v-slot:activator="{ props }">
                <span
                  v-bind="props"
                  class="mdi mdi-24px mdi-account-group-outline"
                ></span>
              </template>
            </v-tooltip>
          </v-btn>
        </div>
      </template>
    </data-table>

    <v-dialog v-model="showUsers" width="auto">
      <v-card min-width="400" class="pa-4">
        <h3 class="mb-4">
          {{ $t("global.role.service_provider") }}
        </h3>
        <v-select
          v-model="userSelected"
          :items="SPList.data"
          :item-title="'title'"
          :item-value="'id'"
          :label="$t('admin_navbar_links.services_providers')"
          outlined
          menu-icon="mdi mdi-chevron-down"
          class="text-capitalize rounded-xl"
        />
        <v-btn
          class="w-100 mt-4"
          color="primary"
          size="large"
          @click="updateStaff"
        >
          {{ $t("global.actions.edit") }}
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import DataTable from "@/components/common/DataTable.vue";
import { useOrdersAdminStore } from "@/stores/admin/orders/orders.admin.store.js";
import { useServiceProvidersAdminStore } from "@/stores/admin/serviceProviders/serviceProviders.admin.store";
import { useCategoriesAdminStore } from "@/stores/admin/categories/categories.admin.store";
import { useMerchantAdminStore } from "@/stores/admin/merchant/merchant.admin.store";

export default {
  components: { DataTable },
  data() {
    return {
      params: {
        "filter[keyword]": null,
        "filter[merchant_id]": null,
        perPage: 10,
        page: 1,
        includeOrderMainCategory: 1,
        includeOrderMerchantClient: 1,
        includeOrderMerchant: 1,
        includeOrderSP: 1,
      },
      filtersParams: {
        "filter[started_from]": null,
        "filter[started_to]": null,
        "filter[service_provider_id]": null,
        "filter[merchant_id]": null,
        "filter[status]": null,
        "filter[merchant_client_id]": null,
        "filter[main_category_id]": null,
        "filter[category_id]": null,
      },
      showUsers: false,
      userSelected: null,
      orderSelected: null,
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
    };
  },
  async mounted() {
    await this.getOrdersAdmin(this.params);
    await this.getServiceProvidersAdmin({
      listing: 1,
    });

    await this.getCategoriesAdmin({
      listing: 1,
    });
    await this.getMainCategoriesAdmin({
      listing: 1,
      "filter[isParent]": 1,
    });
    await this.getMerchantAdmin({
      listing: 1,
    });
  },
  computed: {
    ...mapState(useOrdersAdminStore, ["records", "uiFlags"]),
    ...mapState(useServiceProvidersAdminStore, {
      SPList: "records",
    }),
    ...mapState(useCategoriesAdminStore, {
      categories: "records",
      mainCategories: "mainCategories",
    }),
    ...mapState(useMerchantAdminStore, {
      merchants: "records",
    }),
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
        {
          title: this.$t("admin_merchant.fields.merchant"),
          align: "start",
          sortable: true,
          key: "merchant_title",
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
        {
          title: this.$t("admin_merchant.fields.service_provider"),
          align: "start",
          sortable: true,
          key: "service_provider",
        },

        {
          title: this.$t("admin_merchant.fields.total"),
          align: "start",
          sortable: true,
          key: "totals.total",
        },
        {
          title: this.$t("global.numbers.sp_total"),
          align: "start",
          sortable: true,
          key: "totals.sp_total",
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
          status: item.status
            ? this.$t(`global.order_status.${item.status}`)
            : "---",
          pick_up_type: item.pick_up_type
            ? this.$t(`global.order_type.${item.pick_up_type}`)
            : "---",
          status_key: item.status,
          service_provider: item.service_provider
            ? item.service_provider.title
            : "---",
        };
      });
    },
    categoriesList() {
      return this.categories?.data?.map((item) => {
        return {
          ...item,
          title: item?.title ? item.title[this.$i18n.locale] : "---",
        };
      });
    },
    mainCategoriesList() {
      return this.mainCategories?.map((item) => {
        return {
          ...item,
          title: item?.title ? item.title[this.$i18n.locale] : "---",
        };
      });
    },
  },
  methods: {
    ...mapActions(useOrdersAdminStore, ["getOrdersAdmin", "updateOrdersAdmin"]),
    ...mapActions(useServiceProvidersAdminStore, ["getServiceProvidersAdmin"]),
    ...mapActions(useCategoriesAdminStore, [
      "getCategoriesAdmin",
      "getMainCategoriesAdmin",
    ]),
    ...mapActions(useMerchantAdminStore, ["getMerchantAdmin"]),

    async changePage(page) {
      this.params.page = page;
      await this.getOrdersAdmin(this.params);
    },
    async changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      await this.getOrdersAdmin(this.params);
    },
    async search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      await this.getOrdersAdmin(key);
    },

    async updateStaff() {
      const data = {
        service_provider_id: this.userSelected,
      };
      await this.updateOrdersAdmin(this.orderSelected, data);
      this.showUsers = false;
      this.userSelected = null;
    },
    showModal(id) {
      this.orderSelected = id;
      this.showUsers = true;
    },

    async filterOrderBy(value, key) {
      this.filtersParams[key] = value;

      await this.getOrdersAdmin({
        ...this.filtersParams,
        ...this.params,
      });
    },

    async clearFilter() {
      this.filtersParams["filter[status]"] = null;
      this.filtersParams["filter[merchant_id]"] = null;
      this.filtersParams["filter[service_provider_id]"] = null;
      this.filtersParams["filter[merchant_client_id]"] = null;
      this.filtersParams["filter[main_category_id]"] = null;
      this.filtersParams["filter[category_id]"] = null;
      this.filtersParams["filter[started_from]"] = null;
      this.filtersParams["filter[started_to]"] = null;
      await this.getOrdersAdmin(this.params);
    },

    async getSubCategories(val) {
      this.filtersParams["filter[category_id]"] = null;

      await this.getCategoriesAdmin({
        listing: 1,
        "filter[parent_id]": val,
      });
    },

    async clearFilter() {
      this.filtersParams["filter[status]"] = null;
      this.filtersParams["filter[merchant_id]"] = null;
      this.filtersParams["filter[service_provider_id]"] = null;
      this.filtersParams["filter[merchant_client_id]"] = null;
      this.filtersParams["filter[main_category_id]"] = null;
      this.filtersParams["filter[category_id]"] = null;
      this.filtersParams["filter[started_from]"] = null;
      this.filtersParams["filter[started_to]"] = null;
      await this.getOrdersAdmin(this.params);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>