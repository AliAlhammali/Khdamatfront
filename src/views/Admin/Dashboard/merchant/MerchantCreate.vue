<template>
  <div class="content">
    <div class="d-flex border-b mb-4 pb-4 justify-space-between">
      <h2 class="">
        {{
          isEditMerchant
            ? $t("admin_merchant.edit_title")
            : $t("admin_merchant.add_new")
        }}
      </h2>
      <button class="d-flex ga-2 align-center" @click="$router.go(-1)">
        <span>
          {{ $t("global.actions.back") }}
        </span>
        <span class="fa fa-arrow-left"></span>
      </button>
    </div>
    <v-row>
      <!--  Owner-->
      <template v-if="!isEditMerchant">
        <v-col cols="12" md="6">
          <filed-input
            :label="$t('admin_merchant.fields.owner.name')"
            v-model="merchant.owner.name"
            :value="merchant.owner.name"
            type="text"
          />
        </v-col>
        <v-col cols="12" md="6">
          <filed-input
            :label="$t('admin_merchant.fields.owner.email')"
            v-model="merchant.owner.email"
            :value="merchant.owner.email"
            type="text"
          />
        </v-col>
      </template>

      <!-- data -->
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
          @click="actionBtn"
          :loading="uiFlags.isCreating"
          :disabled="uiFlags.isCreating"
        >
          {{
            isEditMerchant
              ? $t("global.actions.edit")
              : $t("global.actions.add")
          }}
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
          name: null,
          email: null,
        },
      },
    };
  },
  async mounted() {
    if (this.isEditMerchant) {
      const id = this.$route.params.id;
      await this.showMerchantAdmin(id);
      this.merchant = { ...this.record };
    }
  },
  computed: {
    ...mapState(useMerchantAdminStore, ["uiFlags", "record"]),
    isEditMerchant() {
      return this.$route.name === "admin-merchant-edit";
    },
    merchantData() {
      return [
        {
          name: "title",
          type: "text",
          label: this.$t("admin_merchant.fields.title"),
          // error: "v$.merchant.title.$error",
          // errorText:
          //   this.v$.merchant.title.required.$invalid && this.$t("ERRORS.INPUT"),
          // blur: "v$.merchant.title.$touch()",
        },
        {
          name: "description",
          type: "text",
          label: this.$t("admin_merchant.fields.description"),
        },
        {
          name: "address",
          type: "text",
          label: this.$t("admin_merchant.fields.address"),
        },
        {
          name: "status",
          type: "text",
          label: this.$t("admin_merchant.fields.status"),
        },
        {
          name: "email",
          type: "email",
          label: this.$t("admin_merchant.fields.email"),
        },
        {
          name: "phone",
          type: "text",
          label: this.$t("admin_merchant.fields.phone"),
        },
        {
          name: "logo",
          type: "text",
          label: this.$t("admin_merchant.fields.logo"),
        },
        {
          name: "vat_file",
          type: "text",
          label: this.$t("admin_merchant.fields.vat_file"),
        },
        {
          name: "cr_file",
          type: "text",
          label: this.$t("admin_merchant.fields.cr_file"),
        },
        {
          name: "sales_agreement_file",
          type: "text",
          label: this.$t("admin_merchant.fields.sales_agreement_file"),
        },
        {
          name: "cr_number",
          type: "text",
          label: this.$t("admin_merchant.fields.cr_number"),
        },
        {
          name: "vat_number",
          type: "text",
          label: this.$t("admin_merchant.fields.vat_number"),
        },
      ];
    },
  },
  methods: {
    ...mapActions(useMerchantAdminStore, [
      "createMerchantAdmin",
      "showMerchantAdmin",
      "updateMerchantAdmin",
    ]),

    actionBtn() {
      if (this.isEditMerchant) {
        this.updateMerchantAdmin({ ...this.merchant });
        return;
      } else {
        this.createMerchantAdmin({ ...this.merchant });
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
