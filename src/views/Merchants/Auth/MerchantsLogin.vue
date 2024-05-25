<template>
  <div class="auth">
    <v-container>
      <v-row class="justify-center">
        <v-col md="6" cols="12">
          <div class="content pa-8">
            <div class="border-b pb-4 mb-4 text-center">
              <v-img
                src="/logo.png"
                max-height="150"
                max-width="150"
                class="mx-auto"
              ></v-img>
            </div>
            <div class="mb-4 border-b pb-4 mb-4">
              <h1>{{ $t("admin_auth.title") }}</h1>
              <p class="text-gray mt-2">{{ $t("admin_auth.text") }}</p>
            </div>
            <div class="mb-4">
              <filed-input
                :label="$t('admin_auth.email')"
                v-model="user.email"
                :value="user.email"
                :error="v$.user.email.$error || errors.email"
                :error-text="
                  (v$.user.email.required?.$invalid && $t('errors.required')) ||
                  (v$.user.email.email?.$invalid && $t('errors.email'))
                "
                type="email"
                @blur="v$.user.email.$touch()"
              />
            </div>
            <div class="mb-4">
              <filed-input
                :label="$t('admin_auth.password')"
                v-model="user.password"
                :value="user.password"
                :error="v$.user.password.$error || errors.email"
                :error-text="
                  v$.user.password.required?.$invalid && $t('errors.required')
                "
                type="password"
                @blur="v$.user.password.$touch()"
                @show-password="showPassword = !showPassword"
                :show-password="showPassword"
              />
            </div>

            <div class="mb-4">
              <v-row>
                <v-col cols="12">
                  <v-alert
                    type="error"
                    v-if="errors.email"
                    border="left"
                    elevation="2"
                  >
                    {{ errors.email }}
                  </v-alert>
                </v-col>
              </v-row>
            </div>

            <v-btn
              class="w-100"
              color="primary"
              size="large"
              @click="login"
              :disabled="v$.user.$error"
              :loading="isLoading"
            >
              {{ $t("admin_auth.login") }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import FiledInput from "@/components/common/FiledInput.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { mapActions, mapState } from "pinia";
import { useAuthMerchantStore } from "@/stores/merchant/auth/auth.merchant.store";
export default {
  components: { FiledInput },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      user: {
        email: { required, email },
        password: { required },
      },
    };
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      showPassword: false,
      errors: {},
    };
  },
  computed: {
    ...mapState(useAuthMerchantStore, ["isLoading"]),
  },
  methods: {
    ...mapActions(useAuthMerchantStore, ["loginMerchant"]),
    async login() {
      this.v$.user.$touch();
      if (this.v$.user.$error) return;
      const isLogin = await this.loginMerchant(this.user);
      if (!isLogin) {
        this.errors = { email: this.$t("errors.invalid_email_or_password") };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: rgba($primary, 0.1);
}
</style>
