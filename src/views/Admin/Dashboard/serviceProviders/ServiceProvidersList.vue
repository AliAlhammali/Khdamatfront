<template>
  <div class="">
    <div>
      <data-table
        :title="$t('admin_navbar_links.services_providers')"
        :placeholder="$t('service_providers.search_placeholder')"
        :create-page="'/admin/service-provider/create'"
        :headers="headers"
        :slots-items="['actions', 'status']"
        :isLoading="uiFlags?.isLoading"
        :items="items"
        :meta="records?.meta"
        @changePage="changePage"
        @changePerPage="changePerPage"
        @search="search"
      >
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
              :to="`/admin/service-provider-users?service_provider_id=${item.item.id}`"
              class="button button--edit px-2 rounded"
            >
              <v-tooltip
                :text="$t('admin_navbar_links.services_providers_users')"
              >
                <template v-slot:activator="{ props }">
                  <span
                    v-bind="props"
                    class="mdi mdi-24px mdi-account-group"
                  ></span>
                </template>
              </v-tooltip>
            </router-link>
            <router-link
              :to="`/admin/service-provider/${item.item.id}/edit`"
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
        perPage: 10,
        page: 1,
      },
    };
  },
  async mounted() {
    await this.getServiceProvidersAdmin(this.params);
  },
  computed: {
    ...mapState(useServiceProvidersAdminStore, ["records", "uiFlags"]),
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
      return this.records?.data.map((item) => {
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
    ...mapActions(useServiceProvidersAdminStore, [
      "getServiceProvidersAdmin",
      "deleteServiceProvidersAdmin",
    ]),

    async deleteRecord(item) {
      const result = await showConfirmationDialog({
        title: this.$t("global.actions.delete"),
        text: this.$t("global.actions.delete_confirmation") + item.title,
        confirmButtonText: this.$t("global.actions.delete"),
        cancelButtonText: this.$t("global.actions.cancel"),
      });
      if (result.isConfirmed) {
        await this.deleteServiceProvidersAdmin(item.id);
      }
    },

    changePage(page) {
      this.params.page = page;
      this.getServiceProvidersAdmin(this.params);
    },
    changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      this.getServiceProvidersAdmin(this.params);
    },
    search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      this.getServiceProvidersAdmin(key);
    },
  },
};
</script>
<style lang="scss" scoped></style>
