<template>
  <div class="">
    <!-- :create-page="'/admin/service-provider-users/create'" -->

    <data-table
      :title="$t('admin_navbar_links.services_providers_users')"
      :placeholder="$t('admin_merchant.search_placeholder_users')"
      :headers="headers"
      :slots-items="['status', 'role']"
      :isLoading="uiFlags?.isLoading"
      :items="items"
      :meta="records?.meta"
      :has-filter="true"
      @changePage="changePage"
      @changePerPage="changePerPage"
      @search="search"
    >
      <template #filter>
        <v-row>
          <v-col md="4" cols="12">
            <v-select
              :placeholder="$t('admin_navbar_links.services_providers')"
              :label="$t('admin_navbar_links.services_providers')"
              v-model="params['filter[service_provider_id]']"
              :items="merchants?.data"
              item-text="name"
              item-value="id"
              menu-icon="mdi mdi-chevron-down"
              class="w-100"
              outlined
              :loader="merchantsUiFlags?.isLoading"
              @update:modelValue="
                (val) => filterOrderBy(val, 'filter[service_provider_id]')
              "
              :no-data-text="$t('global.actions.no_data')"
              hide-details
            />
          </v-col>
          <v-col md="4" cols="12">
            <v-select
              v-model="params['filter[status]']"
              :label="$t('admin_merchant.fields.status')"
              :placeholder="$t('admin_merchant.fields.status')"
              :items="listStatus"
              :item-title="'text'"
              :item-value="'value'"
              outlined
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl"
              :no-data-text="$t('global.actions.no_data')"
              hide-details
              @update:modelValue="(val) => filterOrderBy(val, 'filter[status]')"
            />
          </v-col>
          <v-col cols="2">
            <button
              class="pa-3 rounded border text-error"
              @click="clearFilter"
              :disabled="
                !params['filter[service_provider_id]'] &&
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

      <template #role="{ item }">
        <span class="badge badge--status">
          {{ $t(`global.role.${item.item.role}`) }}
        </span>
      </template>
      <!-- <template #actions="{ item }">
        <div class="d-flex ga-2 align-center">
          <router-link
            :to="`/admin/service-provider-users/${item.item.id}/edit`"
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
import { useServiceProvidersUsersAdminStore } from "@/stores/admin/serviceProviders/serviceProviderUsers.admin.store";
import { useServiceProvidersAdminStore } from "@/stores/admin/serviceProviders/serviceProviders.admin.store";
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
        "filter[service_provider_id]": null,
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
    await this.getServiceProvidersAdmin({
      listing: 1,
    });
    if (this.$route.query.service_provider_id) {
      this.params["filter[service_provider_id]"] = this.merchants.data.find(
        (item) => item.id == this.$route.query.service_provider_id
      ).id;
    }
    await this.getServiceProvidersUsersAdmin(this.params);
  },
  computed: {
    ...mapState(useServiceProvidersUsersAdminStore, ["records", "uiFlags"]),
    ...mapState(useServiceProvidersAdminStore, {
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
          title: this.$t("admin_merchant.fields.service_provider"),
          align: "start",
          sortable: true,
          key: "service_provider.title",
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
    ...mapActions(useServiceProvidersUsersAdminStore, [
      "getServiceProvidersUsersAdmin",
      "deleteServiceProvidersUsersAdmin",
    ]),

    ...mapActions(useServiceProvidersAdminStore, ["getServiceProvidersAdmin"]),

    async deleteRecord(item) {
      const result = await showConfirmationDialog({
        title: this.$t("global.actions.delete"),
        text: this.$t("global.actions.delete_confirmation") + item.name,
        confirmButtonText: this.$t("global.actions.delete"),
        cancelButtonText: this.$t("global.actions.cancel"),
      });
      if (result.isConfirmed) {
        await this.deleteServiceProvidersUsersAdmin(item.id);
        await this.getServiceProvidersUsersAdmin(this.params);
      }
    },

    async changePage(page) {
      this.params.page = page;
      await this.getServiceProvidersUsersAdmin(this.params);
    },
    async changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      await this.getServiceProvidersUsersAdmin(this.params);
    },
    async search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      await this.getServiceProvidersUsersAdmin(key);
    },

    async filterOrderBy(value, key) {
      this.params[key] = value;
      await this.getServiceProvidersUsersAdmin(this.params);
    },
    async clearFilter() {
      this.params["filter[service_provider_id]"] = null;
      this.params["filter[status]"] = null;
      await this.getServiceProvidersUsersAdmin(this.params);
    },
  },
  watch: {
    async $route(to, from) {
      if (to.query.service_provider_id) {
        this.params["filter[service_provider_id]"] = this.merchants.data.find(
          (item) => item.id == to.query.service_provider_id
        ).id;
      } else {
        this.params["filter[service_provider_id]"] = null;
      }
      await this.getServiceProvidersUsersAdmin(this.params);
    },
  },
};
</script>
<style lang="scss" scoped></style>
