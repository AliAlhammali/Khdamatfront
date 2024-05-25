<template>
  <div class="">
    <div>
      <data-table
        :title="$t('admin_merchant.title')"
        :create-page="'/admin/merchant/create'"
        :placeholder="$t('admin_merchant.search_placeholder')"
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
              <!-- Status -->
              <v-select
                v-model="filterStatus"
                :placeholder="$t('admin_merchant.fields.status')"
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
                :disabled="!filterStatus"
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
              :to="`/admin/merchant-users?merchant_id=${item.item.id}`"
              class="button button--edit px-2 rounded"
            >
              <v-tooltip :text="$t('admin_navbar_links.merchant_users')">
                <template v-slot:activator="{ props }">
                  <span
                    v-bind="props"
                    class="mdi mdi-24px mdi-account-group"
                  ></span>
                </template>
              </v-tooltip>
            </router-link>
            <router-link
              :to="`/admin/merchant/${item.item.id}/edit`"
              class="button button--edit px-2 rounded"
            >
              <v-tooltip :text="$t('global.actions.edit')">
                <template v-slot:activator="{ props }">
                  <span v-bind="props" class="mdi mdi-24px mdi-pencil"></span>
                </template>
              </v-tooltip>
            </router-link>
            <router-link
              :to="{
                path: `/admin/service/create`,
                query: { merchant_id: item.item.id },
              }"
              class="button button--edit px-2 rounded"
            >
              <v-tooltip :text="$t('admin_services.add_title_service')">
                <template v-slot:activator="{ props }">
                  <span v-bind="props" class="mdi mdi-24px mdi-plus"></span>
                </template>
              </v-tooltip>
            </router-link>
            <router-link
              :to="{
                path: `/admin/categories/create`,
                query: { merchant_id: item.item.id },
              }"
              class="button button--edit px-2 rounded"
            >
              <v-tooltip :text="$t('admin_categories.add_title_category')">
                <template v-slot:activator="{ props }">
                  <span v-bind="props" class="mdi mdi-24px mdi-plus"></span>
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
  </div>
</template>
<script>
import { useMerchantAdminStore } from "@/stores/admin/merchant/merchant.admin.store";
import { mapActions, mapState } from "pinia";
import DataTable from "@/components/common/DataTable.vue";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import { showConfirmationDialog } from "@/helper/showAlert.helper";
export default {
  components: { DataTable, ConfirmDialog },
  data() {
    return {
      params: {
        "filter[keyword]": null,
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
      filterStatus: null,
    };
  },
  async mounted() {
    await this.getMerchantAdmin(this.params);
  },
  computed: {
    ...mapState(useMerchantAdminStore, ["records", "uiFlags"]),
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
          key: "title",
        },
        {
          title: this.$t("admin_merchant.fields.phone"),
          align: "start",
          sortable: true,
          key: "phone",
        },
        {
          title: this.$t("admin_merchant.fields.email"),
          align: "start",
          sortable: true,
          key: "email",
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
          address: item.address ? item.address : "---",
          phone: item.phone ? item.phone : "---",
          email: item.email ? item.email : "---",
          status: item.status ? item.status : "---",
        };
      });
    },
  },
  methods: {
    ...mapActions(useMerchantAdminStore, [
      "getMerchantAdmin",
      "deleteMerchantAdmin",
    ]),

    async deleteRecord(item) {
      const result = await showConfirmationDialog({
        title: this.$t("global.actions.delete"),
        text: this.$t("global.actions.delete_confirmation") + item.title,
        confirmButtonText: this.$t("global.actions.delete"),
        cancelButtonText: this.$t("global.actions.cancel"),
      });
      if (result.isConfirmed) {
        await this.deleteMerchantAdmin(item.id);
      }
    },

    async changePage(page) {
      this.params.page = page;
      await this.getMerchantAdmin(this.params);
    },
    async changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      await this.getMerchantAdmin(this.params);
    },
    async search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      await this.getMerchantAdmin(key);
    },

    async filterOrderBy(value, key) {
      this.params[key] = value;
      await this.getMerchantAdmin(this.params);
    },

    async clearFilter() {
      this.filterStatus = null;
      this.params["filter[status]"] = null;
      await this.getMerchantAdmin(this.params);
    },
  },
};
</script>
<style lang="scss" scoped></style>
