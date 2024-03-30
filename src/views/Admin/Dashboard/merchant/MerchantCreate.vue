<template>
  <div class="content">
    <div class="">
      <h2 class="border-b mb-2 pb-2">Create New Merchant</h2>
    </div>
    <v-row>
      <v-col
        cols="12"
        md="6"
        v-for="(item, index) in merchantData"
        :key="index"
      >
        <filed-input
          :label="item.label"
          v-model="merchant[item.name]"
          :value="merchant[item.name]"
          type="text"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          class="w-100"
          color="primary"
          size="large"
          @click="create"
          :loading="uiFlags.isCreating"
          :disabled="uiFlags.isCreating"
        >
          اضافة
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import FiledInput from "@/components/common/FiledInput.vue";
import { useMerchantAdminStore } from "@/stores/admin/merchant/merchant.admin.store";
import { mapActions, mapState } from "pinia";
export default {
  components: { FiledInput },
  data() {
    return {
      merchant: {
        title: null,
        description: null,
        address: null,
        status: null,
        email: null,
        phone: null,
        logo: null,
        vat_file: null,
        cr_file: null,
        sales_agreement_file: null,
        cr_number: null,
        vat_number: null,
        owner: {
          name: "test",
          email: "test@test.com"
        }
      }
    };
  },
  computed: {
    ...mapState(useMerchantAdminStore, ["uiFlags"]),

    merchantData() {
      return [
        {
          name: "title",
          type: "text",
          label: "title"
          // error: "v$.merchant.title.$error",
          // errorText:
          //   this.v$.merchant.title.required.$invalid && this.$t("ERRORS.INPUT"),
          // blur: "v$.merchant.title.$touch()",
        },
        {
          name: "description",
          type: "text",
          label: "description"
        },
        {
          name: "address",
          type: "text",
          label: "address"
        },
        {
          name: "status",
          type: "text",
          label: "status"
        },
        {
          name: "email",
          type: "text",
          label: "email"
        },
        {
          name: "phone",
          type: "text",
          label: "phone"
        },
        {
          name: "logo",
          type: "text",
          label: "logo"
        },
        {
          name: "vat_file",
          type: "text",
          label: "vat_file"
        },
        {
          name: "cr_file",
          type: "text",
          label: "cr_file"
        },
        {
          name: "sales_agreement_file",
          type: "text",
          label: "sales_agreement_file"
        },
        {
          name: "cr_number",
          type: "text",
          label: "cr_number"
        },
        {
          name: "vat_number",
          type: "text",
          label: "vat_number"
        },
        {
          name: "owner.name",
          type: "text",
          label: "owner.name"
        },
        {
          name: "owner.email",
          type: "text",
          label: "owner.email"
        }
      ];
    }
  },
  methods: {
    ...mapActions(useMerchantAdminStore, ["createMerchantAdmin"]),

    create() {
      this.createMerchantAdmin({ ...this.merchant });
    }
  }
};
</script>
<style lang="scss" scoped></style>
