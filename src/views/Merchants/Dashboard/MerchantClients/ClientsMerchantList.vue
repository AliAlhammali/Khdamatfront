<template>
  <div class="">
    <data-table
      :title="$t('admin_navbar_links.clients')"
      :placeholder="$t('merchant.clients.search_placeholder')"
      :create-page="'/merchant/clients/create'"
      :headers="headers"
      :slots-items="['actions', 'is_active']"
      :isLoading="uiFlags?.isLoading"
      :items="items"
      :meta="records?.meta"
      @changePage="changePage"
      @changePerPage="changePerPage"
      @search="search"
    >
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
            :to="`/merchant/clients/${item.item.id}/edit`"
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
import { useClientsMerchantStore } from "@/stores/merchant/clients/clients.merchant.store";

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
    await this.getClientsMerchant(this.params);
  },
  computed: {
    ...mapState(useClientsMerchantStore, ["records", "uiFlags"]),
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
          phone: item.phone ? item.phone : "---",
          email: item.email ? item.email : "---",
        };
      });
    },
  },
  methods: {
    ...mapActions(useClientsMerchantStore, [
      "getClientsMerchant",
      "deleteClientsMerchant",
    ]),

    async deleteRecord(item) {
      const result = await showConfirmationDialog({
        title: this.$t("global.actions.delete"),
        text: this.$t("global.actions.delete_confirmation") + item.name,
        confirmButtonText: this.$t("global.actions.delete"),
        cancelButtonText: this.$t("global.actions.cancel"),
      });
      if (result.isConfirmed) {
        await this.deleteClientsMerchant(item.id);
      }
    },

    changePage(page) {
      this.params.page = page;
      this.getClientsMerchant(this.params);
    },
    changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      this.getClientsMerchant(this.params);
    },
    search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      this.getClientsMerchant(key);
    },
  },
};
</script>
<style lang="scss" scoped></style>
