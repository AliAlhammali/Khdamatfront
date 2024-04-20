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
          @update:modelValue="getServicesMerchant(params)"
          :no-data-text="$t('global.actions.no_data')"
          hide-details
          clearable
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
    };
  },
  async mounted() {
    if (this.$route.query.category_id) {
      this.params["filter[category_id]"] = this.listCategories.find(
        (item) => item.id == this.$route.query.category_id
      ).id;
    }
    await this.getCategoriesMerchant(this.paramsCategories);
    await this.getServicesMerchant(this.params);
  },
  computed: {
    ...mapState(useServicesMerchantStore, ["records", "uiFlags"]),
    ...mapState(useCategoriesMerchantStore, {
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
  },
  methods: {
    ...mapActions(useServicesMerchantStore, ["getServicesMerchant"]),
    ...mapActions(useCategoriesMerchantStore, ["getCategoriesMerchant"]),
    changePage(page) {
      this.params.page = page;
      this.getServicesMerchant(this.params);
    },
    changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      this.getServicesMerchant(this.params);
    },
    search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      this.getServicesMerchant(key);
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
  },
};
</script>
<style lang="scss" scoped></style>
