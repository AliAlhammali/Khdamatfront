<template>
  <div class="content">
    <template v-if="uiFlags.isLoading">
      <loader />
    </template>
    <template v-else>
      <div class="d-flex border-b mb-4 pb-4 justify-space-between">
        <h2 class="">
          {{ $t("service_providers.edit_title") }}
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
            <span> {{ $t("admin_merchant.fields.status") }}</span>
            <span class="text-red">*</span>
          </p>
          <v-select
            v-model="record.status"
            :items="listStatus"
            :item-title="'text'"
            :item-value="'value'"
            outlined
            menu-icon="mdi mdi-chevron-down"
            class="text-capitalize rounded-xl"
            @blur="v$.record.status.$touch()"
            :error="
              v$.record.status.$dirty && v$.record.status.required.$invalid
            "
            :no-data-text="$t('global.actions.no_data')"
            hide-details
            clearable
          />
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="v$.record.status.$dirty && v$.record.status.required.$invalid"
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>

        <!-- data -->
        <v-col cols="12" md="6" v-for="(item, index) in objData" :key="index">
          <filed-input
            :label="item.label"
            v-model="record[item.name]"
            :value="record[item.name]"
            :type="item.type"
            :error="v$.record[item.name].$error"
            :error-text="item.errorText"
            @blur="v$.record[item.name].$touch()"
          />
        </v-col>

        <!--  Files -->
        <v-col cols="12" md="6">
          <div class="d-flex align-center justify-space-between mb-3">
            <p class="d-flex align-center ga-2 filed__label">
              {{ $t("admin_merchant.fields.logo") }}
            </p>
            <a :href="record.logo" target="_blank" class="main-color">
              {{ $t("global.actions.view_file") }}
            </a>
          </div>
          <label class="filed__input d-flex align-center ga-2 pa-2 rounded-lg">
            <input type="file" @input="upload($event, 'logo')" />
          </label>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex align-center justify-space-between mb-3">
            <p class="d-flex align-center ga-2 filed__label">
              {{ $t("admin_merchant.fields.vat_file") }}
            </p>
            <a :href="record.vat_file" target="_blank" class="main-color">
              {{ $t("global.actions.view_file") }}
            </a>
          </div>
          <label class="filed__input d-flex align-center ga-2 pa-2 rounded-lg">
            <input type="file" @input="upload($event, 'vat_file')" />
          </label>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex align-center justify-space-between mb-3">
            <p class="d-flex align-center ga-2 filed__label">
              {{ $t("admin_merchant.fields.cr_file") }}
            </p>
            <a :href="record.cr_file" target="_blank" class="main-color">
              {{ $t("global.actions.view_file") }}
            </a>
          </div>
          <label class="filed__input d-flex align-center ga-2 pa-2 rounded-lg">
            <input type="file" @input="upload($event, 'cr_file')" />
          </label>
        </v-col>

        <v-col cols="12" md="6">
          <div class="d-flex align-center justify-space-between mb-3">
            <p class="d-flex align-center ga-2 filed__label">
              {{ $t("admin_merchant.fields.sales_agreement_file") }}
            </p>
            <a
              :href="record.sales_agreement_file"
              target="_blank"
              class="main-color"
            >
              {{ $t("global.actions.view_file") }}
            </a>
          </div>
          <label class="filed__input d-flex align-center ga-2 pa-2 rounded-lg">
            <input
              type="file"
              @input="upload($event, 'sales_agreement_file')"
            />
          </label>
        </v-col>

        <v-col cols="12">
          <v-btn
            class="w-100"
            color="primary"
            size="large"
            @click="actionBtn"
            :loading="uiFlags.isCreating || uiFlags.isUpdated"
            :disabled="
              uiFlags.isCreating || uiFlags.isUpdated || v$.record.$error
            "
          >
            {{ $t("global.actions.edit") }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </div>
</template>
<script>
import FiledInput from "@/components/common/FiledInput.vue";
import { useServiceProvidersAdminStore } from "@/stores/admin/serviceProviders/serviceProviders.admin.store";
import { useGlobalActionsStore } from "@/stores/actions/upload.store";
import { mapActions, mapState } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required, email, requiredIf } from "@vuelidate/validators";
import Loader from "@/components/common/Loader.vue";
import { updateToPatchData } from "@/helper/update.inputs.helper";
export default {
  components: { FiledInput, Loader },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      record: {
        title: { required },
        description: { required },
        address: { required },
        status: { required },
        email: { required, email },
        phone: { required },
        cr_number: { required },
        vat_number: { required },
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
      files: {},
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
    const id = this.$route.params.id;
    await this.showServiceProvidersAdmin(id);
    this.merchant = { ...this.record };
  },
  computed: {
    ...mapState(useServiceProvidersAdminStore, ["uiFlags", "record"]),

    objData() {
      return [
        {
          name: "title",
          type: "text",
          label: this.$t("admin_merchant.fields.title"),
          error: "v$.record.title.$error",
          errorText:
            this.v$.record.title.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.record.title.$touch()",
        },
        {
          name: "description",
          type: "text",
          label: this.$t("admin_merchant.fields.description"),
          error: "v$.record.description.$error",
          errorText:
            this.v$.record.description.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.record.description.$touch()",
        },
        {
          name: "address",
          type: "text",
          label: this.$t("admin_merchant.fields.address"),
          error: "v$.record.address.$error",
          errorText:
            this.v$.record.address.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.record.address.$touch()",
        },
        {
          name: "email",
          type: "email",
          label: this.$t("admin_merchant.fields.email"),
          error: "v$.record.email.$error",
          errorText:
            (this.v$.record.email.required.$invalid &&
              this.$t("errors.required")) ||
            (this.v$.record.email.email.$invalid && this.$t("errors.email")),
          blur: "v$.record.email.$touch()",
        },
        {
          name: "phone",
          type: "text",
          label: this.$t("admin_merchant.fields.phone"),
          error: "v$.record.phone.$error",
          errorText:
            this.v$.record.phone.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.record.phone.$touch()",
        },
        {
          name: "cr_number",
          type: "text",
          label: this.$t("admin_merchant.fields.cr_number"),
          error: "v$.record.cr_number.$error",
          errorText:
            this.v$.record.cr_number.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.record.cr_number.$touch()",
        },
        {
          name: "vat_number",
          type: "text",
          label: this.$t("admin_merchant.fields.vat_number"),
          error: "v$.record.vat_number.$error",
          errorText:
            this.v$.record.vat_number.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.record.vat_number.$touch()",
        },
      ];
    },
  },
  methods: {
    ...mapActions(useServiceProvidersAdminStore, [
      "createServiceProvidersAdmin",
      "showServiceProvidersAdmin",
      "updateServiceProvidersAdmin",
    ]),

    ...mapActions(useGlobalActionsStore, ["uploadFile"]),

    actionBtn() {
      this.v$.$touch();
      if (this.v$.$error) return;
      const data = updateToPatchData(this.record, this.merchant);
      this.updateServiceProvidersAdmin(this.record.id, data);
    },
    async upload(event, key) {
      const file = event.target.files[0];
      const { data } = await this.uploadFile(file);
      this.files[key] = file;
      this.merchant[key] = data.data.path;
    },
  },
};
</script>
<style lang="scss" scoped></style>
