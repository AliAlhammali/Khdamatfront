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
      },
      showModel: false,
      changePassword: {
        password: null,
        confirmPassword: null,
      },
      showPassword: false,
      showConfirmPassword: false,
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
      ];
    },
  },
  methods: {
    ...mapActions(useUsersAdminStore, [
      "createUsersAdmin",
      "showUsersAdmin",
      "updateUsersAdmin",
    ]),

    async actionBtn() {
      this.v$.$touch();
      if (this.v$.$error) return;
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
  },
};
</script>
<style lang="scss" scoped></style>
