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
        <router-link
          :to="`/service-provider/orders/${item.item.id}`"
          class="button button--edit px-2 rounded"
        >
          <v-tooltip :text="$t('global.actions.show')">
            <template v-slot:activator="{ props }">
              <span v-bind="props" class="mdi mdi-24px mdi-eye-outline"></span>
            </template>
          </v-tooltip>
        </router-link>
      </template>
    </data-table>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import DataTable from "@/components/common/DataTable.vue";
import { useOrdersServiceProviderStore } from "@/stores/serviceProvider/orders/orders.serviceProvider.store";
export default {
  components: { DataTable },
  data() {
    return {
      params: {
        "filter[keyword]": null,
        "filter[merchant_id]": null,
        perPage: 10,
        page: 1,
      },
    };
  },
  async mounted() {
    await this.getOrdersServiceProvider(this.params);
  },
  computed: {
    ...mapState(useOrdersServiceProviderStore, ["records", "uiFlags"]),
    headers() {
      return [
        {
          title: "#",
          align: "start",
          sortable: true,
          key: "id",
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
        {
          title: this.$t("admin_merchant.fields.started_at"),
          align: "start",
          sortable: true,
          key: "started_at",
        },
        {
          title: this.$t("admin_merchant.fields.pick_up_type"),
          align: "start",
          sortable: true,
          key: "pick_up_type",
        },
        {
          title: this.$t("admin_merchant.fields.status"),
          align: "start",
          sortable: true,
          key: "status",
        },

        {
          title: this.$t("admin_merchant.fields.total"),
          align: "start",
          sortable: true,
          key: "totals.total",
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
          status: item.status
            ? this.$t(`global.order_status.${item.status}`)
            : "---",
          pick_up_type: item.pick_up_type
            ? this.$t(`global.order_type.${item.pick_up_type}`)
            : "---",
        };
      });
    },
  },
  methods: {
    ...mapActions(useOrdersServiceProviderStore, ["getOrdersServiceProvider"]),
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
  },
};
</script>
<style lang="scss" scoped>
</style>