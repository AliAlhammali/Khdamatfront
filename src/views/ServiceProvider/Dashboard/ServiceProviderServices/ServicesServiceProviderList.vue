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
        <v-select
          :placeholder="$t('admin_navbar_links.categories')"
          :label="$t('admin_navbar_links.categories')"
          v-model="params['filter[category_id]']"
          :items="listCategories"
          item-value="id"
          menu-icon="mdi mdi-chevron-down"
          class="w-100"
          outlined
          :loader="uiFlagsCategories?.isLoading"
          @update:modelValue="getServicesServiceProvider(params)"
          :no-data-text="$t('global.actions.no_data')"
          hide-details
          hide-selected
        >
        </v-select>
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
import { useServicesServiceProviderStore } from "@/stores/serviceProvider/services/services.serviceProvider.store";
import { useCategoriesServiceProviderStore } from "@/stores/serviceProvider/categories/categories.serviceProvider.store";

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
    };
  },
  async mounted() {
    if (this.$route.query.category_id) {
      this.params["filter[category_id]"] = this.listCategories.find(
        (item) => item.id == this.$route.query.category_id
      ).id;
    }
    await this.getCategoriesServiceProvider(this.paramsCategories);
    await this.getServicesServiceProvider(this.params);
  },
  computed: {
    ...mapState(useServicesServiceProviderStore, ["records", "uiFlags"]),
    ...mapState(useCategoriesServiceProviderStore, {
      categories: "records",
      uiFlagsCategories: "uiFlags",
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
          title: this.$t("admin_merchant.fields.sp_price"),
          align: "start",
          sortable: true,
          key: "sp_price",
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
  },
  methods: {
    ...mapActions(useServicesServiceProviderStore, [
      "getServicesServiceProvider",
    ]),
    ...mapActions(useCategoriesServiceProviderStore, [
      "getCategoriesServiceProvider",
    ]),
    changePage(page) {
      this.params.page = page;
      this.getServicesServiceProvider(this.params);
    },
    changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      this.getServicesServiceProvider(this.params);
    },
    search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      this.getServicesServiceProvider(key);
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
      this.getServicesServiceProvider(this.params);
    },
  },
};
</script>
<style lang="scss" scoped></style>
