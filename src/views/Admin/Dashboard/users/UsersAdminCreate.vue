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
import { useUsersAdminStore } from "@/stores/admin/users/users.admin.store";
import { mapActions, mapState } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
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
    };
  },
  data() {
    return {
      merchant: {
        name: null,
        email: null,
        password: null,
      },
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

    actionBtn() {
      this.v$.$touch();
      if (this.v$.$error) return;
      if (this.isEditMerchant) {
        const data = updateToPatchData(this.merchant, this.record);
        this.updateUsersAdmin(this.record.id, data);
        return;
      } else {
        this.createUsersAdmin({ ...this.merchant });
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
