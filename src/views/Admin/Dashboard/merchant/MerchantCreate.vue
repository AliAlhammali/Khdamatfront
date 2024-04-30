<template>
  <div class="content">
    <template v-if="uiFlags.isLoading">
      <loader />
    </template>
    <template v-else>
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
      <h3 class="mb-4">1. {{ $t("global.owner_info") }}</h3>
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
                v$.merchant.owner.name.required.$invalid &&
                $t('errors.required')
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
          <v-col cols="12" md="6">
            <filed-input
                :label="$t('global.password')"
                v-model="merchant.owner.password"
                :value="merchant.owner.password"
                type="password"
                :error="v$.merchant.owner.password.$error"
                :error-text="
                v$.merchant.owner.password.required.$invalid &&
                $t('errors.required')
              "
                @blur="v$.merchant.owner.password.$touch()"
            />
          </v-col>
        </template>
        <hr>
      </v-row>
      <hr style="    margin: 1rem 0;
    color: #dbdade;
    border: 0;
    border-top:  solid;
    opacity: 1;">
      <h3 class="mb-4">1. {{ $t("global.company_info") }}</h3>
      <v-row>


        <v-col cols="12" md="6">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            <span> {{ $t("admin_merchant.fields.status") }}</span>
            <span class="text-red">*</span>
          </p>

          <v-select
            v-model="merchant.status"
            :items="listStatus"
            :item-title="'text'"
            :item-value="'value'"
            outlined
            menu-icon="mdi mdi-chevron-down"
            class="text-capitalize rounded-xl"
            @blur="v$.merchant.status.$touch()"
            :error="
              v$.merchant.status.$dirty && v$.merchant.status.required.$invalid
            "
            hide-details
            :no-data-text="$t('global.actions.no_data')"
          />
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="
              v$.merchant.status.$dirty && v$.merchant.status.required.$invalid
            "
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>

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
        <v-col cols="12" md="6">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            {{ $t("admin_merchant.fields.logo") }}
          </p>
          <label
            class="filed__input d-flex align-center ga-2 pa-2 rounded-lg"
            :class="{
              error: v$.files.logo.$dirty && v$.files.logo.required.$invalid,
            }"
          >
            <input
              type="file"
              @input="upload($event, 'logo')"
              @blur="v$.files.logo.$touch()"
            />
          </label>
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="v$.files.logo.$dirty && v$.files.logo.required.$invalid"
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            {{ $t("admin_merchant.fields.vat_file") }}
          </p>
          <label
            class="filed__input d-flex align-center ga-2 pa-2 rounded-lg"
            :class="{
              error:
                v$.files.vat_file.$dirty && v$.files.vat_file.required.$invalid,
            }"
          >
            <input
              type="file"
              @input="upload($event, 'vat_file')"
              @blur="v$.files.vat_file.$touch()"
            />
          </label>
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="
              v$.files.vat_file.$dirty && v$.files.vat_file.required.$invalid
            "
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            {{ $t("admin_merchant.fields.cr_file") }}
          </p>
          <label
            class="filed__input d-flex align-center ga-2 pa-2 rounded-lg"
            :class="{
              error:
                v$.files.cr_file.$dirty && v$.files.cr_file.required.$invalid,
            }"
          >
            <input
              type="file"
              @input="upload($event, 'cr_file')"
              @blur="v$.files.cr_file.$touch()"
            />
          </label>
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="v$.files.cr_file.$dirty && v$.files.cr_file.required.$invalid"
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            {{ $t("admin_merchant.fields.sales_agreement_file") }}
          </p>
          <label
            class="filed__input d-flex align-center ga-2 pa-2 rounded-lg"
            :class="{
              error:
                v$.files.sales_agreement_file.$dirty &&
                v$.files.sales_agreement_file.required.$invalid,
            }"
          >
            <input
              type="file"
              @input="upload($event, 'sales_agreement_file')"
              @blur="v$.files.sales_agreement_file.$touch()"
            />
          </label>
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="
              v$.files.sales_agreement_file.$dirty &&
              v$.files.sales_agreement_file.required.$invalid
            "
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
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
    </template>
  </div>
</template>
<script>
import FiledInput from "@/components/common/FiledInput.vue";
import { useMerchantAdminStore } from "@/stores/admin/merchant/merchant.admin.store";
import { useGlobalActionsStore } from "@/stores/actions/upload.store";
import { mapActions, mapState } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required, email, requiredIf } from "@vuelidate/validators";
import Loader from "@/components/common/Loader.vue";
export default {
  components: { FiledInput, Loader },
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
        cr_number: { required },
        vat_number: { required },
        owner: {
          name: {
            required: requiredIf(() => !this.isEditMerchant),
          },
          email: {
            required: requiredIf(() => !this.isEditMerchant),
            email,
          },
          password: {
            required: requiredIf(() => !this.isEditMerchant),
          },
        },
      },
      files: {
        logo: { required: requiredIf(() => !this.isEditMerchant) },
        vat_file: { required: requiredIf(() => !this.isEditMerchant) },
        cr_file: { required: requiredIf(() => !this.isEditMerchant) },
        sales_agreement_file: {
          required: requiredIf(() => !this.isEditMerchant),
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
          password: null,
        },
      },
      files: {
        logo: null,
        vat_file: null,
        cr_file: null,
        sales_agreement_file: null,
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
      this.files[key] = file; // Update the file property in Vue.js
      this.merchant[key] = data.data.path;
    },
  },
};
</script>
<style lang="scss" scoped></style>
