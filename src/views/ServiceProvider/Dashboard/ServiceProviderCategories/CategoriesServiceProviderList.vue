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
      @changePage="changePage"
      @changePerPage="changePerPage"
      @search="search"
    >
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
              path: `/service-provider/services`,
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
import { useCategoriesServiceProviderStore } from "@/stores/serviceProvider/categories/categories.serviceProvider.store";

export default {
  components: { DataTable, ConfirmDialog },
  data() {
    return {
      params: {
        "filter[keyword]": null,
        perPage: 10,
        page: 1,
      },
    };
  },
  async mounted() {
    await this.getCategoriesServiceProvider(this.params);
  },
  computed: {
    ...mapState(useCategoriesServiceProviderStore, ["records", "uiFlags"]),
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
  },
  methods: {
    ...mapActions(useCategoriesServiceProviderStore, [
      "getCategoriesServiceProvider",
    ]),

    changePage(page) {
      this.params.page = page;
      this.getCategoriesServiceProvider(this.params);
    },
    changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      this.getCategoriesServiceProvider(this.params);
    },
    search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      this.getCategoriesServiceProvider(key);
    },
  },
};
</script>
<style lang="scss" scoped></style>
