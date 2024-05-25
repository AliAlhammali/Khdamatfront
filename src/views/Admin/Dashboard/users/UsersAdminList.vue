<template>
  <div class="">
    <data-table
      :title="$t('admin_navbar_links.users')"
      :placeholder="$t('admin_merchant.search_placeholder_users')"
      :create-page="'/admin/users/create'"
      :headers="headers"
      :slots-items="['actions', 'status', 'role']"
      :isLoading="uiFlags?.isLoading"
      :items="items"
      :meta="records?.meta"
      @changePage="changePage"
      @changePerPage="changePerPage"
      :hasFilter="true"
      @search="search"
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
          v-if="item.item.status !== '---'"
          class="badge badge--status"
          :class="
            item.item.status === 'active' ? 'badge--success' : 'badge--danger'
          "
        >
          {{ $t(`global.status.${item.item.status}`) }}
        </span>
        <span v-else> {{ item.item.status }} </span>
      </template>

      <template #role="{ item }">
        <span class="badge badge--status" v-if="item.item.role !== '---'">
          {{ $t(`global.role.${item.item.role}`) }}
        </span>
        <span v-else> {{ item.item.role }} </span>
      </template>
      <template #actions="{ item }">
        <div class="d-flex ga-2 align-center">
          <router-link
            :to="`/admin/users/${item.item.id}/edit`"
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

import { useUsersAdminStore } from "@/stores/admin/users/users.admin.store";

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
    await this.getUsersAdmin(this.params);
  },
  computed: {
    ...mapState(useUsersAdminStore, ["records", "uiFlags"]),
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
          role: item.role ? item.role : "---",
        };
      });
    },
  },
  methods: {
    ...mapActions(useUsersAdminStore, ["getUsersAdmin", "deleteUsersAdmin"]),

    async deleteRecord(item) {
      const result = await showConfirmationDialog({
        title: this.$t("global.actions.delete"),
        text: this.$t("global.actions.delete_confirmation") + item.name,
        confirmButtonText: this.$t("global.actions.delete"),
        cancelButtonText: this.$t("global.actions.cancel"),
      });
      if (result.isConfirmed) {
        await this.deleteUsersAdmin(item.id);
      }
    },

    async changePage(page) {
      this.params.page = page;
      await this.getUsersAdmin(this.params);
    },
    async changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      await this.getUsersAdmin(this.params);
    },
    async search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      await this.getUsersAdmin(key);
    },
    async filterOrderBy(value, key) {
      this.params[key] = value;
      await this.getUsersAdmin(this.params);
    },
    async clearFilter() {
      this.filterStatus = null;
      this.params["filter[status]"] = null;
      await this.getUsersAdmin(this.params);
    },
  },
};
</script>
<style lang="scss" scoped></style>
