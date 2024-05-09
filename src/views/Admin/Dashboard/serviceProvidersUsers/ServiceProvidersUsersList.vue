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
          @update:modelValue="getServiceProvidersUsersAdmin(params)"
          :no-data-text="$t('global.actions.no_data')"
          hide-details
        />
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
        perPage: 10,
        page: 1,
      },
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

    changePage(page) {
      this.params.page = page;
      this.getServiceProvidersUsersAdmin(this.params);
    },
    changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      this.getServiceProvidersUsersAdmin(this.params);
    },
    search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      this.getServiceProvidersUsersAdmin(key);
    },
  },
  watch: {
    $route(to, from) {
      if (to.query.service_provider_id) {
        this.params["filter[service_provider_id]"] = this.merchants.data.find(
          (item) => item.id == to.query.service_provider_id
        ).id;
      } else {
        this.params["filter[service_provider_id]"] = null;
      }
      this.getServiceProvidersUsersAdmin(this.params);
    },
  },
};
</script>
<style lang="scss" scoped></style>
