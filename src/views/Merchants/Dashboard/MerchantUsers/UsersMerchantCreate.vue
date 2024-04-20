<template>
  <div class="content">
    <template v-if="uiFlags.isLoading">
      <loader />
    </template>
    <template v-else>
      <div class="d-flex border-b mb-4 pb-4 justify-space-between">
        <h2 class="">
          {{
            isEditDataObj
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
        <!-- data -->
        <v-col
          cols="12"
          md="6"
          v-for="(item, index) in dataObjData"
          :key="index"
        >
          <filed-input
            :label="item.label"
            v-model="dataObj[item.name]"
            :value="dataObj[item.name]"
            :type="item.type"
            :error="v$.dataObj[item.name].$error"
            :error-text="item.errorText"
            @blur="v$.dataObj[item.name].$touch()"
          />
        </v-col>

        <v-col cols="12" md="6">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            <span> {{ $t("admin_merchant.fields.status") }}</span>
            <span class="text-red">*</span>
          </p>

          <v-select
            v-model="dataObj.status"
            :placeholder="$t('admin_merchant.fields.status')"
            :items="listStatus"
            :item-title="'text'"
            :item-value="'value'"
            outlined
            menu-icon="mdi mdi-chevron-down"
            class="text-capitalize rounded-xl"
            @blur="v$.dataObj.status.$touch()"
            :error="
              v$.dataObj.status.$dirty && v$.dataObj.status.required.$invalid
            "
            :no-data-text="$t('global.actions.no_data')"
            hide-details
            hide-selected
          />
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="
              v$.dataObj.status.$dirty && v$.dataObj.status.required.$invalid
            "
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            <span> {{ $t("admin_merchant.fields.role") }}</span>
            <span class="text-red">*</span>
          </p>

          <v-select
            v-model="dataObj.role"
            :placeholder="$t('admin_merchant.fields.role')"
            :items="listRole"
            :item-title="'text'"
            :item-value="'value'"
            outlined
            menu-icon="mdi mdi-chevron-down"
            class="text-capitalize rounded-xl"
            @blur="v$.dataObj.role.$touch()"
            :error="v$.dataObj.role.$dirty && v$.dataObj.role.required.$invalid"
            :no-data-text="$t('global.actions.no_data')"
            hide-details
            hide-selected
          />
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="v$.dataObj.role.$dirty && v$.dataObj.role.required.$invalid"
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>

        <v-col md="6" cols="12" v-if="!isEditDataObj">
          <filed-input
            :label="$t('admin_merchant.fields.password')"
            v-model="dataObj.password"
            :value="dataObj.password"
            type="password"
            :error="v$.dataObj.password.$error"
            :error-text="
              v$.dataObj.password.required.$invalid && $t('errors.required')
            "
            :show-password="showPassword"
            @show-password="showPassword = !showPassword"
            @blur="v$.dataObj.password.$touch()"
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
              uiFlags.isCreating || uiFlags.isUpdated || v$.dataObj.$error
            "
          >
            {{
              isEditDataObj
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

import { useUsersMerchantStore } from "@/stores/merchant/users/users.merchant.store";
import { updateToPatchData } from "@/helper/update.inputs.helper";

export default {
  components: { FiledInput, Loader },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      dataObj: {
        name: { required },
        email: { required, email },
        address: { required },
        phone: { required },
        role: { required },
        password: { required },
        status: { required },
      },
    };
  },
  data() {
    return {
      dataObj: {
        name: null,
        email: null,
        address: null,
        phone: null,
        role: null,
        password: null,
        status: "active",
      },
      showPassword: false,
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
      listRole: [
        {
          text: this.$t("global.role.Admin"),
          value: "Admin",
        },
        {
          text: this.$t("global.role.Staff"),
          value: "Staff",
        },
      ],
    };
  },
  async mounted() {
    if (this.isEditDataObj) {
      const id = this.$route.params.id;
      await this.showUsersMerchant(id);
      this.dataObj = { ...this.record };
    }
  },
  computed: {
    ...mapState(useUsersMerchantStore, ["uiFlags", "record"]),
    isEditDataObj() {
      return this.$route.meta.edit;
    },
    dataObjData() {
      return [
        {
          name: "name",
          type: "text",
          label: this.$t("admin_merchant.fields.title"),
          error: "v$.dataObj.name.$error",
          errorText:
            this.v$.dataObj.name.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.dataObj.name.$touch()",
        },
        {
          name: "email",
          type: "email",
          label: this.$t("admin_merchant.fields.email"),
          error: "v$.dataObj.email.$error",
          errorText:
            (this.v$.dataObj.email.required.$invalid &&
              this.$t("errors.required")) ||
            (this.v$.dataObj.email.email.$invalid && this.$t("errors.email")),
          blur: "v$.dataObj.email.$touch()",
        },
        {
          name: "address",
          type: "text",
          label: this.$t("admin_merchant.fields.address"),
          error: "v$.dataObj.address.$error",
          errorText:
            this.v$.dataObj.address.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.dataObj.address.$touch()",
        },
        {
          name: "phone",
          type: "text",
          label: this.$t("admin_merchant.fields.phone"),
          error: "v$.dataObj.phone.$error",
          errorText:
            this.v$.dataObj.phone.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.dataObj.phone.$touch()",
        },
      ];
    },
  },
  methods: {
    ...mapActions(useUsersMerchantStore, [
      "createUsersMerchant",
      "showUsersMerchant",
      "updateUsersMerchant",
    ]),

    actionBtn() {
      this.v$.$touch();
      if (this.v$.$error) return;
      if (this.isEditDataObj) {
        const data = updateToPatchData(this.dataObj, this.record);
        this.updateUsersMerchant(this.record.id, data);
        return;
      } else {
        this.createUsersMerchant({ ...this.dataObj });
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
