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
    >
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
      showUsers: false,
      userSelected: null,
      orderSelected: null,
    };
  },
  async mounted() {
    await this.getOrdersServiceProvider(this.params);
    await this.getUsersServiceProvider({
      listing: 1,
      "filter[role]": "Staff",
    });
  },
  computed: {
    ...mapState(useOrdersServiceProviderStore, ["records", "uiFlags"]),
    ...mapState(useUsersServiceProviderStore, {
      users: "records",
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
        {
          title: this.$t("admin_merchant.fields.title"),
          align: "start",
          sortable: true,
          key: "address[0].name",
        },
        {
          title: this.$t("admin_merchant.fields.phone"),
          align: "start",
          sortable: true,
          key: "address[0].phone",
        },
        // {
        //   title: this.$t("global.client_name"),
        //   align: "start",
        //   sortable: true,
        //   key: "client_name",
        // },
        // {
        //   title: this.$t("global.client_phone"),
        //   align: "start",
        //   sortable: true,
        //   key: "client_phone",
        // },

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
  },
  methods: {
    ...mapActions(useOrdersServiceProviderStore, [
      "getOrdersServiceProvider",
      "updateOrdersServiceProvider",
    ]),
    ...mapActions(useUsersServiceProviderStore, ["getUsersServiceProvider"]),
    changePage(page) {
      this.params.page = page;
      this.getOrdersServiceProvider(this.params);
    },
    changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      this.getOrdersServiceProvider(this.params);
    },
    search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      this.getOrdersServiceProvider(key);
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
  },
};
</script>
<style lang="scss" scoped>
</style>