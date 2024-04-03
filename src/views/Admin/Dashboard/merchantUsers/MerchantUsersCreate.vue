<template>
  <div class="content">
    <div class="d-flex border-b mb-4 pb-4 justify-space-between">
      <h2 class="">
        {{
          isEditMerchant
            ? $t("admin_merchant.edit_user_title")
            : $t("admin_merchant.add_new_user")
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
      <v-col cols="12" md="6">
        <p class="d-flex align-center ga-2 mb-3 filed__label">
          <span> {{ $t("admin_merchant.title") }}</span>
          <span class="text-red">*</span>
        </p>
        <v-select
          v-model="merchant.merchant_id"
          :items="merchants.data"
          item-text="name"
          item-value="id"
          menu-icon="mdi mdi-chevron-down"
          class="w-100"
          outlined
        />
      </v-col>
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
          :type="item.type"
          :error="v$.merchant[item.name].$error"
          :error-text="item.errorText"
          @blur="v$.merchant[item.name].$touch()"
        />
      </v-col>

      <v-col cols="12">
        <v-btn
          class="w-100"
          color="primary"
          size="large"
          @click="actionBtn"
          :loading="uiFlags.isCreating || uiFlags.isUpdated"
          :disabled="
            uiFlags.isCreating || uiFlags.isUpdated || v$.merchant.$error
          "
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
import { useMerchantUsersAdminStore } from "@/stores/admin/merchant/merchantUsers.admin.store";
import { mapActions, mapState } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useMerchantAdminStore } from "@/stores/admin/merchant/merchant.admin.store";

export default {
  components: { FiledInput },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      merchant: {
        name: { required },
        email: { required, email },
        merchant_id: { required },
      },
    };
  },
  data() {
    return {
      merchant: {
        name: null,
        email: null,
        merchant_id: null,
      },
    };
  },
  async mounted() {
    if (this.isEditMerchant) {
      const id = this.$route.params.id;
      await this.showMerchantUsersAdmin(id);
      this.merchant = { ...this.record };
    }
    await this.getMerchantAdmin();
  },
  computed: {
    ...mapState(useMerchantAdminStore, {
      merchants: "records",
      merchantsUiFlags: "uiFlags",
    }),
    ...mapState(useMerchantUsersAdminStore, ["uiFlags", "record"]),
    isEditMerchant() {
      return this.$route.name === "admin-merchant-edit";
    },
    merchantData() {
      return [
        {
          name: "name",
          type: "text",
          label: this.$t("admin_merchant.fields.name"),
          error: "v$.merchant.name.$error",
          errorText:
            this.v$.merchant.name.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.merchant.name.$touch()",
        },
        {
          name: "email",
          type: "email",
          label: this.$t("admin_merchant.fields.email"),
          error: "v$.merchant.email.$error",
          errorText:
            this.v$.merchant.email.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.merchant.email.$touch()",
        },
      ];
    },
  },
  methods: {
    ...mapActions(useMerchantUsersAdminStore, [
      "createMerchantUsersAdmin",
      "showMerchantUsersAdmin",
      "updateMerchantUsersAdmin",
    ]),
    ...mapActions(useMerchantAdminStore, ["getMerchantAdmin"]),

    actionBtn() {
      this.v$.$touch();
      if (this.v$.$error) return;
      if (this.isEditMerchant) {
        this.updateMerchantUsersAdmin({ ...this.merchant });
        return;
      } else {
        this.createMerchantUsersAdmin({ ...this.merchant });
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
