<template>
  <div class="">
    <data-table
      :title="$t('admin_navbar_links.categories')"
      :placeholder="$t('admin_categories.search_categories')"
      :create-page="'/admin/categories/create'"
      :headers="headers"
      :slots-items="['actions', 'title', 'slug']"
      :isLoading="uiFlags?.isLoading"
      :items="items"
      :meta="records?.meta"
      @changePage="changePage"
      @changePerPage="changePerPage"
      @search="search"
    >
      <template #title="{ item }">
        <p>{{ item.item.title.ar }}</p>
        <p>{{ item.item.title.en }}</p>
      </template>

      <template #slug="{ item }">
        <p>{{ item.item.slug.ar }}</p>
        <p>{{ item.item.slug.en }}</p>
      </template>

      <template #actions="{ item }">
        <div class="d-flex ga-2 align-center">
          <router-link
            :to="`/admin/categories/${item.item.id}/edit`"
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
import { useCategoriesAdminStore } from "@/stores/admin/categories/categories.admin.store";
import { mapActions, mapState } from "pinia";
import DataTable from "@/components/common/DataTable.vue";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import { showConfirmationDialog } from "@/helper/showAlert.helper";
import { useMerchantAdminStore } from "@/stores/admin/merchant/merchant.admin.store";

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
    await this.getCategoriesAdmin(this.params);
    await this.getMerchantAdmin();
  },
  computed: {
    ...mapState(useCategoriesAdminStore, ["records", "uiFlags"]),
    ...mapState(useMerchantAdminStore, {
      merchants: "records",
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
          title: this.$t("admin_categories.fields.title"),
          align: "start",
          sortable: true,
          key: "title",
        },
        // {
        //   title: this.$t("admin_categories.fields.slug"),
        //   align: "start",
        //   sortable: true,
        //   key: "slug",
        // },
        {
          title: this.$t("admin_categories.fields.status"),
          align: "start",
          sortable: true,
          key: "status",
        },
        {
          title: this.$t("admin_categories.fields.merchant_id"),
          align: "start",
          sortable: true,
          key: "merchant_id",
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
          title: item.title ? item.title : "---",
          slug: item.slug ? item.slug : "---",
          email: item.email ? item.email : "---",
          status: item.status ? item.status : "---",
          merchant_id: this.findMerchantName(item.merchant_id),
        };
      });
    },
  },
  methods: {
    ...mapActions(useCategoriesAdminStore, [
      "getCategoriesAdmin",
      "deleteCategoriesAdmin",
    ]),
    ...mapActions(useMerchantAdminStore, ["getMerchantAdmin"]),

    async deleteRecord(item) {
      const result = await showConfirmationDialog({
        title: this.$t("global.actions.delete"),
        text: this.$t("global.actions.delete_confirmation") + item.title[this.$i18n.locale] ,
        confirmButtonText: this.$t("global.actions.delete"),
        cancelButtonText: this.$t("global.actions.cancel"),
      });
      if (result.isConfirmed) {
        await this.deleteCategoriesAdmin(item.id);
      }
    },

    findMerchantName(id) {
      const merchant = this.merchants?.data?.find(
        (merchant) => merchant.id === id
      );
      return merchant ? merchant.title : "---";
    },

    changePage(page) {
      this.params.page = page;
      this.getCategoriesAdmin(this.params);
    },
    changePerPage(perPage) {
      this.params.perPage = perPage;
      this.params.page = 1;
      this.getCategoriesAdmin(this.params);
    },
    search(text) {
      this.params["filter[keyword]"] = text;
      const key = {
        "filter[keyword]": text,
      };
      this.getCategoriesAdmin(key);
    },
  },
};
</script>
<style lang="scss" scoped></style>
