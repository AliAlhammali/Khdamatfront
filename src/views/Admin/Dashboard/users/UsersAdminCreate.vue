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
        <v-col md="6" cols="12" v-if="isEditMerchant">
          <v-btn @click="showModel = true">
            {{ $t("global.actions.change_password") }}
          </v-btn>
        </v-col>

        <v-col md="6" cols="12">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            <span> {{ $t("admin_merchant.fields.role") }}</span>
            <span class="text-red">*</span>
          </p>
          <v-select
            v-model="merchant.role"
            :items="rolesList"
            :label="$t('admin_merchant.fields.role')"
            item-title="text"
            item-value="value"
            menu-icon="mdi mdi-chevron-down"
            :error="v$.merchant.role.$error"
            :error-text="
              v$.merchant.role.required.$invalid && $t('errors.required')
            "
            @blur="v$.merchant.role.$touch()"
          />
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="v$.merchant.role.$dirty && v$.merchant.role.required.$invalid"
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            {{ $t("admin_merchant.fields.avatar") }}
          </p>
          <label class="filed__input d-flex align-center ga-2 pa-2 rounded-lg">
            <input type="file" @input="upload($event, 'image')" />
          </label>
        </v-col>

        <v-col cols="12" md="6">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            <span> {{ $t("admin_merchant.fields.status") }}</span>
            <span class="text-red">*</span>
          </p>

          <v-select
            v-model="merchant.status"
            :placeholder="$t('admin_merchant.fields.status')"
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
        {{ v$.merchant.$error }}
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

    <v-dialog v-model="showModel" width="auto" persistent>
      <v-card min-width="400" class="pa-6 rounded-lg">
        <div
          class="d-flex align-center justify-space-between mb-4 border-b pb-4"
        >
          <h3>
            {{ $t("global.actions.change_password") }}
          </h3>
          <v-btn @click="closeModel" icon>
            <v-icon>mdi mdi-close</v-icon>
          </v-btn>
        </div>
        <v-row>
          <v-col cols="12" md="12">
            <filed-input
              :label="$t('global.change_password.password')"
              v-model="changePassword.password"
              :value="changePassword.password"
              type="password"
              :error="v$.changePassword.password.$error"
              :error-text="
                v$.changePassword.password.required.$invalid &&
                $t('errors.required')
              "
              @blur="v$.changePassword.password.$touch()"
              @show-password="showPassword = !showPassword"
              :show-password="showPassword"
            />
          </v-col>
          <v-col cols="12" md="12">
            <filed-input
              :label="$t('global.change_password.confirm_password')"
              v-model="changePassword.confirmPassword"
              :value="changePassword.confirmPassword"
              type="password"
              :error="v$.changePassword.confirmPassword.$error"
              :error-text="
                (v$.changePassword.confirmPassword.required.$invalid &&
                  $t('errors.required')) ||
                (v$.changePassword.confirmPassword.sameAs.$invalid &&
                  $t('errors.password_mismatch'))
              "
              @blur="v$.changePassword.confirmPassword.$touch()"
              @show-password="showConfirmPassword = !showConfirmPassword"
              :show-password="showConfirmPassword"
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              class="w-100"
              color="primary"
              size="large"
              @click="updatePassword"
              :loading="uiFlags.isCreating || uiFlags.isUpdated"
              :disabled="
                uiFlags.isCreating ||
                uiFlags.isUpdated ||
                v$.changePassword.$error
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
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import FiledInput from "@/components/common/FiledInput.vue";
import { useUsersAdminStore } from "@/stores/admin/users/users.admin.store";
import { mapActions, mapState } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import Loader from "@/components/common/Loader.vue";
import { updateToPatchData } from "@/helper/update.inputs.helper";
import { useGlobalActionsStore } from "@/stores/actions/upload.store";
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
        password: { required },
        role: { required },
        status: { required },
        phone: { required },
        address: { required },
      },
      changePassword: {
        password: { required },
        confirmPassword: {
          required,
          sameAs: sameAs(this.changePassword.password),
        },
      },
    };
  },
  data() {
    return {
      merchant: {
        name: null,
        email: null,
        password: null,
        phone: null,
        address: null,
        image: null,
        role: null,
        status: null,
      },
      showModel: false,
      changePassword: {
        password: null,
        confirmPassword: null,
      },
      showPassword: false,
      showConfirmPassword: false,
      rolesList: [
        {
          text: this.$t("global.role.admin"),
          value: "admin",
        },
        {
          text: this.$t("global.role.staff"),
          value: "staff",
        },
      ],
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
      await this.showUsersAdmin(id);
      this.merchant = { ...this.record };
    }
  },
  computed: {
    ...mapState(useUsersAdminStore, ["uiFlags", "record"]),
    isEditMerchant() {
      return this.$route.name === "users-admin-edit";
    },
    merchantData() {
      return [
        {
          name: "name",
          type: "text",
          label: this.$t("admin_merchant.fields.title"),
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
          name: "address",
          type: "text",
          label: this.$t("admin_merchant.fields.address"),
          error: "v$.merchant.address.$error",
          errorText:
            this.v$.merchant.address.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.merchant.address.$touch()",
        },
      ];
    },
  },
  methods: {
    ...mapActions(useUsersAdminStore, [
      "createUsersAdmin",
      "showUsersAdmin",
      "updateUsersAdmin",
    ]),
    ...mapActions(useGlobalActionsStore, ["uploadFile"]),

    async actionBtn() {
      this.v$.$touch();
      if (this.v$.merchant.$error) return;
      if (this.isEditMerchant) {
        const data = updateToPatchData(this.merchant, this.record);
        await this.updateUsersAdmin(this.record.id, data);
        return;
      } else {
        await this.createUsersAdmin({ ...this.merchant });
      }
    },

    async updatePassword() {
      this.v$.changePassword.$touch();
      if (this.v$.changePassword.$error) return;
      await this.updateUsersAdmin(this.record.id, {
        ...this.changePassword,
      });
      this.closeModel();
    },
    closeModel() {
      this.showModel = false;
      this.v$.$reset();
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
