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
            <span> {{ $t("admin_navbar_links.services_providers") }}</span>
            <span class="text-red">*</span>
          </p>
          <v-select
            v-model="merchant.service_provider_id"
            :items="merchants?.data"
            item-text="name"
            item-value="id"
            menu-icon="mdi mdi-chevron-down"
            class="w-100"
            outlined
            :error="
              v$.merchant.service_provider_id.$dirty &&
              v$.merchant.service_provider_id.required.$invalid
            "
            :no-data-text="$t('global.actions.no_data')"
            hide-details
            clearable
          />
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="
              v$.merchant.service_provider_id.$dirty &&
              v$.merchant.service_provider_id.required.$invalid
            "
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
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

        <v-col md="6" cols="12" v-if="!isEditMerchant">
          <filed-input
            :label="$t('admin_merchant.fields.password')"
            v-model="merchant.password"
            :value="merchant.password"
            type="password"
            :error="v$.merchant.password.$error"
            :error-text="
              v$.merchant.password.required.$invalid && $t('errors.required')
            "
            :show-password="showPassword"
            @show-password="showPassword = !showPassword"
            @blur="v$.merchant.password.$touch()"
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
    </template>
  </div>
</template>
<script>
import FiledInput from "@/components/common/FiledInput.vue";
import { mapActions, mapState } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import Loader from "@/components/common/Loader.vue";

import { useServiceProvidersUsersAdminStore } from "@/stores/admin/serviceProviders/serviceProviderUsers.admin.store";
import { useServiceProvidersAdminStore } from "@/stores/admin/serviceProviders/serviceProviders.admin.store";
import { updateToPatchData } from "@/helper/update.inputs.helper";

export default {
  components: { FiledInput, Loader },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      merchant: {
        name: { required },
        email: { required, email },
        service_provider_id: { required },
        password: { required },
      },
    };
  },
  data() {
    return {
      merchant: {
        name: null,
        email: null,
        service_provider_id: null,
        password: null,
      },
      showPassword: false,
    };
  },
  async created() {
    await this.getServiceProvidersAdmin({
      listing: 1,
    });
  },
  async mounted() {
    if (this.isEditMerchant) {
      const id = this.$route.params.id;
      await this.showServiceProvidersUsersAdmin(id);
      this.merchant = { ...this.record };
      this.merchant.service_provider_id = this.merchants.data.find(
        (item) => item.id === this.record.service_provider_id
      );
    }
  },
  computed: {
    ...mapState(useServiceProvidersAdminStore, {
      merchants: "records",
      merchantsUiFlags: "uiFlags",
    }),
    ...mapState(useServiceProvidersUsersAdminStore, ["uiFlags", "record"]),
    isEditMerchant() {
      return this.$route.name === "admin-service-provider-users-edit";
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
            (this.v$.merchant.email.required.$invalid &&
              this.$t("errors.required")) ||
            (this.v$.merchant.email.email.$invalid && this.$t("errors.email")),
          blur: "v$.merchant.email.$touch()",
        },
      ];
    },
  },
  methods: {
    ...mapActions(useServiceProvidersUsersAdminStore, [
      "createServiceProvidersUsersAdmin",
      "showServiceProvidersUsersAdmin",
      "updateServiceProvidersUsersAdmin",
    ]),
    ...mapActions(useServiceProvidersAdminStore, ["getServiceProvidersAdmin"]),

    actionBtn() {
      this.v$.$touch();
      if (this.v$.$error) return;
      if (this.isEditMerchant) {
        const data = updateToPatchData(this.merchant, this.record);
        this.updateServiceProvidersUsersAdmin(this.record.id, data);
        return;
      } else {
        this.createServiceProvidersUsersAdmin({ ...this.merchant });
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
