<template >
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
            <!-- start at  -->
            <date-picker
              :editable="false"
              :placeholder="$t('global.start_at')"
              v-model="filtersParams['filter[started_at]']"
              v-model:value="filtersParams['filter[started_at]']"
              :default-value="filtersParams['filter[started_at]']"
              type="date"
              class="mb-2 w-100"
              value-type="format"
              format="YYYY-MM-DD"
              @change="(val) => filterOrderBy(val, 'filter[started_at]')"
            ></date-picker>
            <!-- :disabled-date="beforeToday" -->
          </v-col>
          <v-col md="3" cols="12">
            <!-- Main Category -->
            <v-autocomplete
              v-model="main_category_id"
              :placeholder="$t('global.main_category')"
              :label="$t('global.main_category')"
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl mb-2 w-100"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              outlined
              :items="mainCategoriesList"
              item-title="title"
              item-value="id"
              @update:model-value="(val) => getSubCategoriesSP(val)"
            />
          </v-col>
          <v-col md="3" cols="12">
            <!-- Category -->
            <v-autocomplete
              :placeholder="$t('global.show_order.category')"
              :label="$t('global.show_order.category')"
              v-model="filtersParams['filter[category_id]']"
              v-model:value="filtersParams['filter[category_id]']"
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl mb-2 w-100"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              outlined
              :items="subCategoriesList"
              item-title="title"
              item-value="id"
              @update:model-value="
                (val) => filterOrderBy(val, 'filter[category_id]')
              "
              :disabled="!main_category_id"
            />
          </v-col>
          <v-col md="3" cols="12">
            <!-- Staff -->
            <v-autocomplete
              :placeholder="$t('admin_navbar_links.users')"
              :label="$t('admin_navbar_links.users')"
              v-model="filtersParams['filter[service_provider_user_id]']"
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl mb-2 w-100"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              outlined
              :items="users.data"
              item-title="name"
              item-value="id"
              @update:model-value="
                (val) => filterOrderBy(val, 'filter[service_provider_user_id]')
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
                !filtersParams['filter[started_at]'] &&
                !filtersParams['filter[status]'] &&
                !filtersParams['filter[category_id]'] &&
                !filtersParams['filter[service_provider_user_id]']
              "
            >
              <v-icon size="24">mdi mdi-filter-variant-remove</v-icon>
            </button>
          </v-col>
        </v-row>
      </template>
      <template v-slot:actions="{ item }">
        <div class="d-flex align-center ga-2">
          <v-btn
            v-if="isAdmin"
            class="button button--edit px-2 rounded"
            @click="showModal(item.item.id)"
          >
            <v-tooltip :text="$t('global.actions.add_sp_user')">
              <template v-slot:activator="{ props }">
                <span
                  v-bind="props"
                  class="mdi mdi-24px mdi-account-group-outline"
                ></span>
              </template>
            </v-tooltip>
          </v-btn>
          <router-link
            :to="`/service-provider/orders/${item.item.id}`"
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
        </div>
      </template>
    </data-table>

    <v-dialog v-model="showUsers" width="auto">
      <v-card min-width="400" class="pa-4">
        <h3 class="mb-4">
          {{ $t("global.role.Staff") }}
        </h3>
        <v-select
          v-model="userSelected"
          :items="users.data"
          :item-title="'name'"
          :item-value="'id'"
          :label="$t('admin_navbar_links.users')"
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
import { useOrdersServiceProviderStore } from "@/stores/serviceProvider/orders/orders.serviceProvider.store";
import { useUsersServiceProviderStore } from "@/stores/serviceProvider/users/users.serviceProvider.store";
import { useCategoriesServiceProviderStore } from "@/stores/serviceProvider/categories/categories.serviceProvider.store";

export default {
  components: { DataTable },
  data() {
    return {
      params: {
        "filter[keyword]": null,
        "filter[merchant_id]": null,
        perPage: 10,
        page: 1,
        includeOrderMerchant: 1,
        includeOrderMerchantUser: 1,
        includeOrderMerchantClient: 1,
        includeOrderMainCategory: 1,
        includeOrderAddress: 1,
        includeOrderItems: 1,
        sortAsc: 1,
      },
      filtersParams: {
        "filter[started_at]": null,
        "filter[status]": null,
        "filter[category_id]": null,
        "filter[service_provider_user_id]": null,
      },
      showUsers: false,
      userSelected: null,
      orderSelected: null,
      main_category_id: null,
    };
  },
  async mounted() {
    await this.getOrdersServiceProvider(this.params);
    await this.getUsersServiceProvider({
      listing: 1,
      "filter[role]": "Staff",
    });

    await this.getCategoriesServiceProvider({
      listing: 1,
      "filter[isParent]": 1,
    });
  },
  computed: {
    ...mapState(useOrdersServiceProviderStore, ["records", "uiFlags"]),
    ...mapState(useUsersServiceProviderStore, {
      users: "records",
    }),
    ...mapState(useCategoriesServiceProviderStore, {
      mainCategories: "records",
      uiFlagsMainCategories: "uiFlags",
      subCategories: "subCategories",
      uiFlagsSubCategories: "uiFlagsSubCategories",
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
          title: this.$t("admin_merchant.fields.merchant"),
          align: "start",
          sortable: true,
          key: "merchant_title",
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

        {
          title: this.$t("admin_merchant.fields.total"),
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
          completed_at: item.completed_at ? item.completed_at : "---",
          status: item.status
            ? this.$t(`global.order_status.${item.status}`)
            : "---",
          pick_up_type: item.pick_up_type
            ? this.$t(`global.order_type.${item.pick_up_type}`)
            : "---",
        };
      });
    },
    isAdmin() {
      return (
        this.$cookies
          .get("service_provider_khadamat_user")
          .role.toLowerCase() === "admin"
      );
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
    mainCategoriesList() {
      return this.mainCategories?.data?.map((item) => {
        return {
          ...item,
          title: item.title ? item.title[this.$i18n.locale] : "---",
        };
      });
    },
    subCategoriesList() {
      return this.subCategories?.data?.map((item) => {
        return {
          ...item,
          title: item.title ? item.title[this.$i18n.locale] : "---",
        };
      });
    },
  },
  methods: {
    ...mapActions(useOrdersServiceProviderStore, [
      "getOrdersServiceProvider",
      "updateOrdersServiceProvider",
    ]),
    ...mapActions(useCategoriesServiceProviderStore, [
      "getCategoriesServiceProvider",
      "getSubCategoriesServiceProvider",
    ]),
    ...mapActions(useUsersServiceProviderStore, ["getUsersServiceProvider"]),
    async changePage(page) {
      this.params.page = page;
      await this.getOrdersServiceProvider(this.params);
    },
    async changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      await this.getOrdersServiceProvider(this.params);
    },
    async search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      await this.getOrdersServiceProvider(key);
    },
    async updateStaff() {
      const data = {
        service_provider_user_id: this.userSelected,
      };
      await this.updateOrdersServiceProvider(this.orderSelected, data);
      this.showUsers = false;
      this.userSelected = null;
    },
    showModal(id) {
      this.orderSelected = id;
      this.showUsers = true;
    },

    async filterOrderBy(value, key) {
      this.filtersParams[key] = value;
      this.params = {
        ...this.params,
        ...this.filtersParams,
      };
      await this.getOrdersServiceProvider(this.params);
    },
    async clearFilter() {
      this.filtersParams = {
        "filter[started_at]": null,
        "filter[status]": null,
        "filter[main_category_id]": null,
        "filter[category_id]": null,
        "filter[service_provider_user_id]": null,
      };
      this.main_category_id = null;
      this.params = {
        ...this.params,
        ...this.filtersParams,
      };
      await this.getOrdersServiceProvider(this.params);
    },

    async getSubCategoriesSP(val) {
      // empty filter category_id
      this.filtersParams["filter[category_id]"] = null;

      await this.getSubCategoriesServiceProvider({
        listing: 1,
        "filter[parent_id]": val,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>