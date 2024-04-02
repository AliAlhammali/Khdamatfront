<template>
  <div class="">
    <div>
      <data-table
        :title="$t('admin_merchant.title')"
        :create-page="'/admin/merchant/create'"
        :headers="headers"
        :slots-items="['actions']"
        :isLoading="uiFlags?.isLoading"
        :items="items"
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
    items() {
      return this.records?.data.map((item) => {
        return {
          ...item,
          address: item.address ? item.address : "---",
          phone: item.phone? item.phone : "---",
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
      this.params.page = page;
      this.getMerchantAdmin(this.params);
    },
    changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      this.getMerchantAdmin(this.params);
    },
    search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      this.getMerchantAdmin(key);
    },
  },
};
</script>
<style lang="scss" scoped></style>
