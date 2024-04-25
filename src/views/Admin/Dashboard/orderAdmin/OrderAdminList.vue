<template >
  <div>
    <data-table
      :title="$t('admin_navbar_links.orders')"
      :placeholder="$t('admin_merchant.search_placeholder_orders')"
      :createPage="`/merchant/orders-merchant/create`"
      :headers="headers"
      :slots-items="[]"
      :isLoading="uiFlags?.isLoading"
      :items="items"
      :meta="records?.meta"
      @changePage="changePage"
      @changePerPage="changePerPage"
      @search="search"
    >
    </data-table>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import DataTable from "@/components/common/DataTable.vue";
import { useOrdersAdminStore } from "@/stores/admin/orders/orders.admin.store.js";
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
    await this.getOrdersAdmin(this.params);
  },
  computed: {
    ...mapState(useOrdersAdminStore, ["records", "uiFlags"]),
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
          status: item.status === "pending" ? "warning" : "success",
        };
      });
    },
  },
  methods: {
    ...mapActions(useOrdersAdminStore, ["getOrdersAdmin"]),
    changePage(page) {
      this.params.page = page;
      this.getOrdersAdmin(this.params);
    },
    changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      this.getOrdersAdmin(this.params);
    },
    search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      this.getOrdersAdmin(key);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>