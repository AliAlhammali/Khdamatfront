<template>
  <div class="auth">
    <v-container>
      <v-row class="justify-center">
        <v-col md="6" cols="12">
          <div class="content pa-8">
            <div class="border-b pb-4 mb-4 text-center">
              <h1>الشعار</h1>
            </div>
            <div class="mb-4 border-b pb-4 mb-4">
              <h1>{{ $t("admin_auth.title") }}</h1>
              <p class="text-gray mt-2">{{ $t("admin_auth.text") }}</p>
            </div>
            <div class="mb-4">
              <filed-input
                :label="$t('admin_auth.email')"
                v-model="admin.email"
                :value="admin.email"
                :error="v$.admin.email.$error"
                :error-text="
                  (v$.admin.email.required?.$invalid &&
                    $t('errors.required')) ||
                  (v$.admin.email.email?.$invalid && $t('errors.email'))
                "
                type="email"
                @blur="v$.admin.email.$touch()"
              />
            </div>
            <div class="mb-4">
              <filed-input
                :label="$t('admin_auth.password')"
                v-model="admin.password"
                :value="admin.password"
                :error="v$.admin.password.$error"
                :error-text="
                  v$.admin.password.required?.$invalid && $t('errors.required')
                "
                type="password"
                @blur="v$.admin.password.$touch()"
                @show-password="showPassword = !showPassword"
                :show-password="showPassword"
              />
            </div>

            <v-btn
              class="w-100"
              color="primary"
              size="large"
              @click="login"
              :disabled="v$.admin.$error"
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
import { useAuthAdminStore } from "@/stores/admin/auth/auth.admin.store";
export default {
  components: { FiledInput },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      admin: {
        email: { required, email },
        password: { required },
      },
    };
  },
  data() {
    return {
      admin: {
        email: "",
        password: "",
      },
      showPassword: false,
    };
  },
  computed: {
    ...mapState(useAuthAdminStore, ["isLoading"]),
  },
  methods: {
    ...mapActions(useAuthAdminStore, ["loginAdmin"]),
    login() {
      this.v$.admin.$touch();
      if (this.v$.admin.$error) return;
      this.loginAdmin(this.admin);
    },
  },
};
</script>
<style lang="scss" scoped>
.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba($primary, 0.1);
}
</style>
