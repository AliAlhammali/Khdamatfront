<template>
  <div class="">
    <data-table
      :title="$t('admin_navbar_links.services')"
      :placeholder="$t('admin_services.search_services')"
      :create-page="'/admin/service/create'"
      :headers="headers"
      :slots-items="['actions', 'status']"
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
            <!-- Merchant -->
            <v-autocomplete
              v-model="params['filter[merchant_id]']"
              :label="$t('admin_categories.fields.merchant')"
              :placeholder="$t('admin_categories.fields.merchant')"
              :items="merchantsList"
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
            <!-- Main Category -->
            <v-autocomplete
              v-model="params['filter[category_id]']"
              :placeholder="$t('admin_navbar_links.categories')"
              :label="$t('admin_navbar_links.categories')"
              :items="categoriesList"
              :item-title="'title'"
              :item-value="'id'"
              outlined
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              @update:model-value="
                (val) => filterOrderBy(val, 'filter[category_id]')
              "
            />
          </v-col>

          <v-col md="3" cols="12">
            <!-- Status -->
            <v-select
              v-model="params['filter[status]']"
              :placeholder="$t('admin_merchant.fields.status')"
              :label="$t('admin_merchant.fields.status')"
              :items="listStatus"
              :item-title="'text'"
              :item-value="'value'"
              outlined
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
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
                !params['filter[merchant_id]'] &&
                !params['filter[main_category_id]'] &&
                !params['filter[status]']
              "
            >
              <v-icon size="24">mdi mdi-filter-variant-remove</v-icon>
            </button>
          </v-col>
        </v-row>
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
      <template #actions="{ item }">
        <div class="d-flex ga-2 align-center">
          <router-link
            :to="`/admin/service/${item.item.id}/edit`"
            class="button button--edit px-2 rounded"
          >
            <v-tooltip :text="$t('global.actions.edit')">
              <template v-slot:activator="{ props }">
                <span v-bind="props" class="mdi mdi-24px mdi-pencil"></span>
              </template>
            </v-tooltip>
          </router-link>
          <button
            class="button button--delete px-2 rounded"
            @click="deleteRecord(item.item)"
          >
            <v-tooltip :text="$t('global.actions.delete')">
              <template v-slot:activator="{ props }">
                <span v-bind="props" class="mdi mdi-24px mdi-delete"></span>
              </template>
            </v-tooltip>
          </button>
        </div>
      </template>
    </data-table>
  </div>
</template>
<script>
import { useServicesAdminStore } from "@/stores/admin/services/services.admin.store";
import { mapActions, mapState } from "pinia";
import DataTable from "@/components/common/DataTable.vue";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import { showConfirmationDialog } from "@/helper/showAlert.helper";
import { useMerchantAdminStore } from "@/stores/admin/merchant/merchant.admin.store";
import { useCategoriesAdminStore } from "@/stores/admin/categories/categories.admin.store";

export default {
  components: { DataTable, ConfirmDialog },
  data() {
    return {
      params: {
        "filter[keyword]": null,
        "filter[merchant_id]": null,
        "filter[category_id]": null,
        "filter[status]": null,
        perPage: 10,
        page: 1,
      },
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
    await this.getServicesAdmin(this.params);
    await this.getMerchantAdmin({ listing: 1 });
    await this.getCategoriesAdmin({ listing: 1 });
  },
  computed: {
    ...mapState(useServicesAdminStore, ["records", "uiFlags"]),
    ...mapState(useMerchantAdminStore, {
      merchants: "records",
    }),

    ...mapState(useCategoriesAdminStore, {
      categories: "records",
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
          title: this.$t("admin_services.fields.title"),
          align: "start",
          sortable: true,
          key: "title",
        },
        {
          title: this.$t("admin_services.fields.category"),
          align: "start",
          sortable: true,
          key: "categoryTitle",
        },
        {
          title: this.$t("admin_services.fields.merchant"),
          align: "start",
          sortable: true,
          key: "merchant.title",
        },
        {
          title: this.$t("admin_services.fields.price"),
          align: "start",
          sortable: true,
          key: "price",
        },
        {
          title: this.$t("admin_services.fields.cost_price"),
          align: "start",
          sortable: true,
          key: "cost_price",
        },
        {
          title: this.$t("admin_services.fields.sp_price"),
          align: "start",
          sortable: true,
          key: "sp_price",
        },
        {
          title: this.$t("admin_services.fields.status"),
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
          categoryTitle: item.category?.title
            ? item.category.title[this.$i18n.locale]
            : "---",
        };
      });
    },
    merchantsList() {
      return this.merchants?.data?.map((item) => {
        return {
          ...item,
        };
      });
    },
    categoriesList() {
      return this.categories?.data?.map((item) => {
        return {
          ...item,
          title: item.title ? item.title[this.$i18n.locale] : "---",
        };
      });
    },
  },
  methods: {
    ...mapActions(useServicesAdminStore, [
      "getServicesAdmin",
      "deleteServicesAdmin",
    ]),

    ...mapActions(useCategoriesAdminStore, ["getCategoriesAdmin"]),

    ...mapActions(useMerchantAdminStore, ["getMerchantAdmin"]),

    async deleteRecord(item) {
      const result = await showConfirmationDialog({
        title: this.$t("global.actions.delete"),
        text:
          this.$t("global.actions.delete_confirmation") +
          item.title[this.$i18n.locale],
        confirmButtonText: this.$t("global.actions.delete"),
        cancelButtonText: this.$t("global.actions.cancel"),
      });
      if (result.isConfirmed) {
        await this.deleteServicesAdmin(item.id);
      }
    },

    async changePage(page) {
      this.params.page = page;
      await this.getServicesAdmin(this.params);
    },
    async changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      await this.getServicesAdmin(this.params);
    },
    async search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      await this.getServicesAdmin(key);
    },
    async filterOrderBy(value, key) {
      this.params[key] = value;
      await this.getServicesAdmin(this.params);
    },
    async clearFilter() {
      this.params["filter[merchant_id]"] = null;
      this.params["filter[category_id]"] = null;
      this.params["filter[status]"] = null;
      await this.getServicesAdmin(this.params);
    },
  },
};
</script>
<style lang="scss" scoped></style>
