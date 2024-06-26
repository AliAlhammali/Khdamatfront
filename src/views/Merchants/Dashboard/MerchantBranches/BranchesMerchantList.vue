<template>
  <div class="">
    <data-table
      :title="$t('admin_navbar_links.branches')"
      :placeholder="$t('merchant.branches.search_placeholder')"
      :create-page="'/merchant/branches/create'"
      :headers="headers"
      :slots-items="['actions', 'is_active']"
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
          <v-col md="4" cols="12">
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
              @update:modelValue="(val) => filterByStatus(val)"
            />
          </v-col>
          <v-col cols="2">
            <button
              class="pa-3 rounded border text-error"
              @click="clearFilter"
              :disabled="filterStatus !== null"
            >
              <v-icon size="24">mdi mdi-filter-variant-remove</v-icon>
            </button>
          </v-col>
        </v-row>
      </template>
      <template #is_active="{ item }">
        <span
          class="badge badge--status"
          :class="item.item.is_active ? 'badge--success' : 'badge--danger'"
        >
          {{
            item.item.is_active
              ? $t(`global.status.active`)
              : $t(`global.status.inactive`)
          }}
        </span>
      </template>

      <template #actions="{ item }">
        <div class="d-flex ga-2 align-center">
          <router-link
            :to="`/merchant/branches/${item.item.id}/edit`"
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
import { mapActions, mapState } from "pinia";
import DataTable from "@/components/common/DataTable.vue";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import { showConfirmationDialog } from "@/helper/showAlert.helper";
import { useBranchesMerchantStore } from "@/stores/merchant/branches/branches.merchant.store";

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
          value: 1,
        },
        {
          text: this.$t("global.status.inactive"),
          value: 0,
        },
      ],
      filterStatus: null,
    };
  },
  async mounted() {
    await this.getBranchesMerchant(this.params);
  },
  computed: {
    ...mapState(useBranchesMerchantStore, ["records", "uiFlags"]),
    headers() {
      return [
        {
          title: "#",
          align: "start",
          sortable: true,
          key: "id",
        },
        {
          title: this.$t("admin_merchant.fields.name"),
          align: "start",
          sortable: true,
          key: "name",
        },
        {
          title: this.$t("admin_merchant.fields.address"),
          align: "start",
          sortable: true,
          key: "address",
        },
        {
          title: this.$t("admin_merchant.fields.status"),
          align: "start",
          sortable: true,
          key: "is_active",
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
          name: item.name ? item.name : "---",
        };
      });
    },
  },
  methods: {
    ...mapActions(useBranchesMerchantStore, [
      "getBranchesMerchant",
      "deleteBranchesMerchant",
    ]),

    async deleteRecord(item) {
      const result = await showConfirmationDialog({
        title: this.$t("global.actions.delete"),
        text: this.$t("global.actions.delete_confirmation") + item.name,
        confirmButtonText: this.$t("global.actions.delete"),
        cancelButtonText: this.$t("global.actions.cancel"),
      });
      if (result.isConfirmed) {
        await this.deleteBranchesMerchant(item.id);
      }
    },

    async filterByStatus(status) {
      this.params["filter[is_active]"] = status;
      await this.getBranchesMerchant(this.params);
    },

    async clearFilter() {
      this.filterStatus = null;
      this.params["filter[is_active]"] = null;
      await this.getBranchesMerchant(this.params);
    },

    async changePage(page) {
      this.params.page = page;
      await this.getBranchesMerchant(this.params);
    },
    async changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      await this.getBranchesMerchant(this.params);
    },
    async search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      await this.getBranchesMerchant(key);
    },
  },
};
</script>
<style lang="scss" scoped></style>
