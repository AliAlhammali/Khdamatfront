<template>
  <div>
    <div class="">
      <router-link to="/admin/merchant/create" class="button button--outline">
        <span class="mdi mdi-24px mdi-plus"></span>
        <span> Create</span>
      </router-link>
    </div>
    <div>
      <data-table
        :headers="headers"
        :title="'merchant Admin'"
        :placeholder="'Search merchant Admin'"
        :slots-items="['']"
        :isLoading="uiFlags?.isLoading"
        :items="records?.data"
        :meta="records?.meta"
        @changePage="changePage"
        @changePerPage="changePerPage"
        @search="search"
      ></data-table>
    </div>
  </div>
</template>
<script>
import { useMerchantAdminStore } from "@/stores/admin/merchant/merchant.admin.store";
import { mapActions, mapState } from "pinia";
import DataTable from "@/components/common/DataTable.vue";
export default {
  components: { DataTable },
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
          key: "id"
        },
        {
          title: "title",
          align: "start",
          sortable: true,
          key: "title"
        },
        {
          title: "phone",
          align: "start",
          sortable: true,
          key: "phone"
        },
        {
          title: "status",
          align: "start",
          sortable: true,
          key: "status"
        }
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
    }
  },
  methods: {
    ...mapActions(useMerchantAdminStore, ["getMerchantAdmin"]),
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
    }
  }
};
</script>
<style lang="scss" scoped></style>
