<template>
  <div class="">
    <!-- :create-page="'/admin/merchant-users/create'" -->
    <data-table
      :title="$t('admin_navbar_links.merchant_users')"
      :placeholder="$t('admin_merchant.search_placeholder_users')"
      :headers="headers"
      :slots-items="['', 'status', 'role']"
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
          :placeholder="$t('admin_merchant.title')"
          :label="$t('admin_merchant.title')"
          v-model="params['filter[merchant_id]']"
          :items="merchants?.data"
          item-text="name"
          item-value="id"
          menu-icon="mdi mdi-chevron-down"
          class="w-100"
          outlined
          :loader="merchantsUiFlags?.isLoading"
          @update:modelValue="getMerchantUsersAdmin(params)"
          :no-data-text="$t('global.actions.no_data')"
          hide-details
        />
      </template>
      <template #role="{ item }">
        <span class="badge badge--status">
          {{ $t(`global.role.${item.item.role}`) }}
        </span>
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
      <!-- <template #actions="{ item }">
        <div class="d-flex ga-2 align-center">
          <router-link
            :to="`/admin/merchant-users/${item.item.id}/edit`"
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
      </template> -->
    </data-table>
  </div>
</template>
<script>
import { useMerchantUsersAdminStore } from "@/stores/admin/merchant/merchantUsers.admin.store";
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
        "filter[merchant_id]": null,
        perPage: 10,
        page: 1,
      },
    };
  },
  async mounted() {
    await this.getMerchantAdmin({
      listing: 1,
    });
    if (this.$route.query.merchant_id) {
      this.params["filter[merchant_id]"] = this.merchants.data.find(
        (item) => item.id == this.$route.query.merchant_id
      ).id;
    }
    await this.getMerchantUsersAdmin(this.params);
  },
  computed: {
    ...mapState(useMerchantUsersAdminStore, ["records", "uiFlags"]),
    ...mapState(useMerchantAdminStore, {
      merchants: "records",
      merchantsUiFlags: "uiFlags",
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
          title: this.$t("admin_merchant.fields.merchant"),
          align: "start",
          sortable: true,
          key: "merchant.title",
        },
        {
          title: this.$t("admin_merchant.fields.role"),
          align: "start",
          sortable: true,
          key: "role",
        },
        {
          title: this.$t("admin_merchant.fields.status"),
          align: "start",
          sortable: true,
          key: "status",
        },
        // {
        //   title: "#",
        //   align: "start",
        //   sortable: false,
        //   key: "actions",
        // },
      ];
    },
    items() {
      return this.records?.data.map((item) => {
        return {
          ...item,
          address: item.address ? item.address : "---",
          phone: item.phone ? item.phone : "---",
          email: item.email ? item.email : "---",
          status: item.status ? item.status : "---",
          role: item.role ? item.role : "---",
        };
      });
    },
  },
  methods: {
    ...mapActions(useMerchantUsersAdminStore, [
      "getMerchantUsersAdmin",
      "deleteMerchantUsersAdmin",
    ]),

    ...mapActions(useMerchantAdminStore, ["getMerchantAdmin"]),

    async deleteRecord(item) {
      const result = await showConfirmationDialog({
        title: this.$t("global.actions.delete"),
        text: this.$t("global.actions.delete_confirmation") + item.name,
        confirmButtonText: this.$t("global.actions.delete"),
        cancelButtonText: this.$t("global.actions.cancel"),
      });
      if (result.isConfirmed) {
        await this.deleteMerchantUsersAdmin(item.id);
        await this.getMerchantUsersAdmin(this.params);
      }
    },

    changePage(page) {
      this.params.page = page;
      this.getMerchantUsersAdmin(this.params);
    },
    changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      this.getMerchantUsersAdmin(this.params);
    },
    search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      this.getMerchantUsersAdmin(key);
    },
  },
  watch: {
    $route(to, from) {
      if (to.query.merchant_id) {
        this.params["filter[merchant_id]"] = this.merchants.data.find(
          (item) => item.id == to.query.merchant_id
        ).id;
      } else {
        this.params["filter[merchant_id]"] = null;
      }
      this.getMerchantUsersAdmin(this.params);
    },
  },
};
</script>
<style lang="scss" scoped></style>
