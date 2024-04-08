<template>
  <div class="">
    <data-table
      :title="$t('admin_navbar_links.services')"
      :placeholder="$t('admin_services.search_services')"
      :headers="headers"
      :slots-items="['title', 'status', 'category']"
      :isLoading="uiFlags?.isLoading"
      :items="items"
      :meta="records?.meta"
      @changePage="changePage"
      @changePerPage="changePerPage"
      @search="search"
    >
      <template #filter>
        <!-- {{ categories?.data[0].title[$i18n.locale] }} -->
        <!-- <v-select
          :placeholder="$t('admin_navbar_links.categories')"
          :label="$t('admin_navbar_links.categories')"
          v-model="params['filter[category_id]']"
          :items="categories?.data"
          item-value="id"
          menu-icon="mdi mdi-chevron-down"
          class="w-100"
          outlined
          :loader="uiFlagsCategories?.isLoading"
          @update:modelValue="getServicesServiceProvider(params)"
          return-object
        >
          <template #item="{ item }">
            <button @click="()=> params['filter[category_id]'] = item.props.value  " class="d-flex align-center">
              <span>{{ item.props.title[$i18n.locale] }}</span>
            </button>
          </template>
        </v-select> -->
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
      <template #category="{ item }">
        <p>
          {{ item.item.category.title.ar }}
        </p>
        <p>
          {{ item.item.category.title.en }}
        </p>
      </template>
      <template #title="{ item }">
        <p>{{ item.item.title.ar }}</p>
        <p>{{ item.item.title.en }}</p>
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
      this.params["filter[category_id]"] = this.$route.query.category_id;
      await this.getCategoriesServiceProvider(this.paramsCategories);
    }
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
          title: item.title ? item.title : "---",
          email: item.email ? item.email : "---",
          status: item.status ? item.status : "---",
          merchant: item.category ? item.category : "---",
        };
      });
    },
  },
  methods: {
    ...mapActions(useServicesServiceProviderStore, [
      "getServicesServiceProvider",
    ]),
    ...mapActions(useCategoriesServiceProviderStore, ["getCategoriesServiceProvider"]),
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
};
</script>
<style lang="scss" scoped></style>
