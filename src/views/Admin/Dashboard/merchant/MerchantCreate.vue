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
            :error="v$.merchant.owner.name.$error"
            :error-text="
              v$.merchant.owner.name.required.$invalid && $t('errors.required')
            "
            @blur="v$.merchant.owner.name.$touch()"
          />
        </v-col>
        <v-col cols="12" md="6">
          <filed-input
            :label="$t('admin_merchant.fields.owner.email')"
            v-model="merchant.owner.email"
            :value="merchant.owner.email"
            type="email"
            :error="v$.merchant.owner.email.$error"
            :error-text="
              (v$.merchant.owner.email.required?.$invalid &&
                $t('errors.required')) ||
              (v$.merchant.owner.email.email?.$invalid && $t('errors.email'))
            "
            @blur="v$.merchant.owner.email.$touch()"
          />
        </v-col>
      </template>
      <!-- <v-select
        :items="['Foo', 'Bar', 'Fizz', 'Buzz']"
        density="compact"
        variant="outlined"
        hide-details
        hide-spin-buttons
        hide-no-data
        menu-icon="mdi mdi-chevron-down"
      ></v-select> -->

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
          :type="item.type"
          :error="v$.merchant[item.name].$error"
          :error-text="item.errorText"
          @blur="v$.merchant[item.name].$touch()"
        />
      </v-col>

      <!--  Files -->
      <!-- <upload-file
        :title="$t('admin_merchant.fields.logo')"
        :error="v$.merchant.logo.$error"
        :error-text="
          v$.merchant.logo.required.$invalid && $t('errors.required')
        "
        :key="merchant.logo"
        @upload="upload($event, 'logo')"
      >
        <template #icon>
          <span class="mdi mdi-24px mdi-upload"></span>
        </template>
      </upload-file> -->
      <v-col cols="12" md="6">
        <filed-input
          :label="$t('admin_merchant.fields.logo')"
          v-model="merchant.logo"
          :value="merchant.logo"
          type="file"
          :error="v$.merchant.logo.$error"
          :error-text="
            v$.merchant.logo.required.$invalid && $t('errors.required')
          "
          @input="upload($event, 'logo')"
          @blur="v$.merchant.logo.$touch()"
        />
      </v-col>
      <v-col cols="12" md="6">
        <filed-input
          :label="$t('admin_merchant.fields.vat_file')"
          v-model="merchant.vat_file"
          :value="merchant.vat_file"
          type="file"
          :error="v$.merchant.vat_file.$error"
          :error-text="
            v$.merchant.vat_file.required.$invalid && $t('errors.required')
          "
          @blur="v$.merchant.vat_file.$touch()"
          @input="upload($event, 'vat_file')"
        />
      </v-col>
      <v-col cols="12" md="6">
        <filed-input
          :label="$t('admin_merchant.fields.cr_file')"
          v-model="merchant.cr_file"
          :value="merchant.cr_file"
          type="file"
          :error="v$.merchant.cr_file.$error"
          :error-text="
            v$.merchant.cr_file.required.$invalid && $t('errors.required')
          "
          @blur="v$.merchant.cr_file.$touch()"
          @input="upload($event, 'cr_file')"
        />
      </v-col>

      <v-col cols="12" md="6">
        <filed-input
          :label="$t('admin_merchant.fields.sales_agreement_file')"
          v-model="merchant.sales_agreement_file"
          :value="merchant.sales_agreement_file"
          type="file"
          :error="v$.merchant.sales_agreement_file.$error"
          :error-text="
            v$.merchant.sales_agreement_file.required.$invalid &&
            $t('errors.required')
          "
          @blur="v$.merchant.sales_agreement_file.$touch()"
          @input="upload($event, 'sales_agreement_file')"
        />
      </v-col>

      <v-col cols="12">
        <v-btn
          class="w-100"
          color="primary"
          size="large"
          @click="actionBtn"
          :loading="uiFlags.isCreating"
          :disabled="uiFlags.isCreating || v$.$error"
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
import { useGlobalActionsStore } from "@/stores/actions/upload.store";
import { mapActions, mapState } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import UploadFile from "@/components/common/UploadFile.vue";
export default {
  components: { FiledInput, UploadFile },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      merchant: {
        title: { required },
        description: { required },
        address: { required },
        status: { required },
        email: { required, email },
        phone: { required },
        logo: { required },
        vat_file: { required },
        cr_file: { required },
        sales_agreement_file: { required },
        cr_number: { required },
        vat_number: { required },
        owner: {
          name: { required },
          email: { required, email },
        },
      },
    };
  },
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
      this.merchant.logo = null;
      this.merchant.vat_file = null;
      this.merchant.cr_file = null;
      this.merchant.sales_agreement_file = null;
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
          error: "v$.merchant.title.$error",
          errorText:
            this.v$.merchant.title.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.merchant.title.$touch()",
        },
        {
          name: "description",
          type: "text",
          label: this.$t("admin_merchant.fields.description"),
          error: "v$.merchant.description.$error",
          errorText:
            this.v$.merchant.description.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.merchant.description.$touch()",
        },
        {
          name: "address",
          type: "text",
          label: this.$t("admin_merchant.fields.address"),
          error: "v$.merchant.address.$error",
          errorText:
            this.v$.merchant.address.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.merchant.address.$touch()",
        },
        {
          name: "status",
          type: "text",
          label: this.$t("admin_merchant.fields.status"),
          error: "v$.merchant.status.$error",
          errorText:
            this.v$.merchant.status.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.merchant.status.$touch()",
        },
        {
          name: "email",
          type: "email",
          label: this.$t("admin_merchant.fields.email"),
          error: "v$.merchant.email.$error",
          errorText:
            (this.v$.merchant.email.required.$invalid &&
              this.$t("errors.required")) ||
            (this.v$.merchant.email.email.$invalid && this.$t("errors.email")),
          blur: "v$.merchant.email.$touch()",
        },
        {
          name: "phone",
          type: "text",
          label: this.$t("admin_merchant.fields.phone"),
          error: "v$.merchant.phone.$error",
          errorText:
            this.v$.merchant.phone.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.merchant.phone.$touch()",
        },
        {
          name: "cr_number",
          type: "text",
          label: this.$t("admin_merchant.fields.cr_number"),
          error: "v$.merchant.cr_number.$error",
          errorText:
            this.v$.merchant.cr_number.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.merchant.cr_number.$touch()",
        },
        {
          name: "vat_number",
          type: "text",
          label: this.$t("admin_merchant.fields.vat_number"),
          error: "v$.merchant.vat_number.$error",
          errorText:
            this.v$.merchant.vat_number.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.merchant.vat_number.$touch()",
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

    ...mapActions(useGlobalActionsStore, ["uploadFile"]),

    actionBtn() {
      this.v$.$touch();
      if (this.v$.$error) return;
      if (this.isEditMerchant) {
        this.updateMerchantAdmin({ ...this.merchant });
        return;
      } else {
        this.createMerchantAdmin({ ...this.merchant });
      }
    },
    async upload(event, key) {
      const file = event.target.files[0];
      const { data } = await this.uploadFile(file);
      this.merchant[key] = data.data.path;
    },
  },
};
</script>
<style lang="scss" scoped></style>
