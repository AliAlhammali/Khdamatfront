<template>
  <div class="bg-white rounded-lg">
    <div class="d-flex align-center justify-space-between mb-4 pa-4 border-b">
      <div class="">
        <h2>
          {{ $t("admin_merchant.title") }}
        </h2>
      </div>

      <div class="d-flex align-center ga-2">
        <label class="border d-flex align-center ga-2 pa-2 rounded">
          <button
            @click="searchItems"
            class="d-flex align-center justify-center"
          >
            <span class="fa fa-search"></span>
          </button>
          <input
            type="text"
            :placeholder="$t('admin_merchant.search_placeholder')"
          />
        </label>
        <router-link
          to="/admin/merchant/create"
          class="button button--outline pa-2"
        >
          <span class="fa fa-plus"></span>
          <span>
            {{ $t("global.actions.add") }}
          </span>
        </router-link>
      </div>
    </div>
    <!-- <confirm-dialog /> -->
    <div>
      <data-table
        :headers="headers"
        :slots-items="['actions']"
        :isLoading="uiFlags?.isLoading"
        :items="records?.data"
        :meta="records?.meta"
        @changePage="changePage"
        @changePerPage="changePerPage"
        @search="search"
      >
        <template #actions="{ item }">
          <div class="d-flex ga-2 align-center">
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
import { showAlert, showConfirmationDialog } from "@/helper/showAlert.helper";
export default {
  components: { DataTable, ConfirmDialog },
  async mounted() {
    await this.getMerchantAdmin();
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
        // {
        //   title: "address",
        //   align: "start",
        //   sortable: true,
        //   key: "address"
        // },
        // {
        //   title: "cr_file",
        //   align: "start",
        //   sortable: true,
        //   key: "cr_file"
        // },
        // {
        //   title: "cr_number",
        //   align: "start",
        //   sortable: true,
        //   key: "cr_number"
        // },
        // {
        //   title: "description",
        //   align: "start",
        //   sortable: true,
        //   key: "description"
        // },
        // {
        //   title: "logo",
        //   align: "start",
        //   sortable: true,
        //   key: "logo"
        // },

        // {
        //   title: "sales_agreement_file",
        //   align: "start",
        //   sortable: true,
        //   key: "sales_agreement_file"
        // },

        // {
        //   title: "vat_file",
        //   align: "start",
        //   sortable: true,
        //   key: "vat_file"
        // },
        // {
        //   title: "vat_number",
        //   align: "start",
        //   sortable: true,
        //   key: "vat_number"
        // }
      ];
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
        showAlert({
          title: this.$t("global.actions.delete"),
          text: this.$t("global.actions.delete_success"),
          icon: "success",
          confirmButtonText: this.$t("global.actions.close"),
        });
      }
      // await this.deleteMerchantAdmin(id);
    },

    changePage(page) {
      console.log(page);
      // this.getMerchantAdmin({ page });
    },
    changePerPage(perPage) {
      console.log(perPage);
      // this.getMerchantAdmin({ perPage });
    },
    search(search) {
      console.log(search);
      // this.getMerchantAdmin({ search });
    },
  },
};
</script>
<style lang="scss" scoped></style>
