<template>
  <div class="auth">
    <div
      v-if="uiFlags.isLoading"
      class="d-flex align-center justify-center fill-height"
    >
      <v-progress-circular
        color="grey-lighten-4"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-container v-else>
      <v-row class="justify-center">
        <v-col md="12" cols="12">
          <div class="content pa-8">
            <div class="border-b pb-4 mb-4 text-center">
              <v-img
                :src="record.logo"
                max-height="120"
                max-width="120"
                class="mx-auto"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                      color="grey-lighten-4"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </template>
                <template v-slot:error>
                  <div>
                    <v-img
                      src="/logo.png"
                      max-height="120"
                      max-width="120"
                      class="mx-auto"
                    ></v-img>
                  </div>
                </template>
              </v-img>
            </div>
            <!-- <div class="mb-4 border-b pb-4 mb-4">
              <h1>{{ $t("admin_auth.title") }}</h1>
              <p class="text-gray mt-2">{{ $t("admin_auth.text") }}</p>
            </div> -->

            <v-row>
              <v-col md="6" cols="12">
                <filed-input
                  :label="$t('admin_auth.name')"
                  v-model="user.name"
                  :value="user.name"
                  :error="v$.user.name.$error || errors.name"
                  :error-text="
                    v$.user.name.required?.$invalid && $t('errors.required')
                  "
                  @blur="v$.user.name.$touch()"
                />
              </v-col>
              <v-col md="6" cols="12">
                <filed-input
                  :label="$t('admin_auth.phone')"
                  v-model="user.phone"
                  :value="user.phone"
                  :error="v$.user.phone.$error || errors.phone"
                  :error-text="
                    v$.user.phone.required?.$invalid && $t('errors.required')
                  "
                  @blur="v$.user.phone.$touch()"
                />
              </v-col>
              <v-col md="6" cols="12">
                <filed-input
                  :label="$t('admin_auth.email')"
                  v-model="user.email"
                  :value="user.email"
                  :error="v$.user.email.$error || errors.email"
                  :error-text="
                    (v$.user.email.required?.$invalid &&
                      $t('errors.required')) ||
                    (v$.user.email.email?.$invalid && $t('errors.email'))
                  "
                  type="email"
                  @blur="v$.user.email.$touch()"
                />
              </v-col>

              <v-col md="6" cols="12">
                <filed-input
                  :label="$t('admin_auth.password')"
                  v-model="user.password"
                  :value="user.password"
                  :error="v$.user.password.$error || errors.password"
                  :error-text="
                    v$.user.password.required?.$invalid && $t('errors.required')
                  "
                  type="password"
                  :showPassword="showPassword"
                  @showPassword="showPassword = !showPassword"
                  @blur="v$.user.password.$touch()"
                />
              </v-col>

              <v-col md="12" cols="12">
                <filed-input
                  :label="$t('admin_merchant.fields.address')"
                  v-model="user.address"
                  :value="user.address"
                  :error="v$.user.address.$error"
                  :error-text="
                    v$.user.address.required?.$invalid && $t('errors.required')
                  "
                  @blur="v$.user.address.$touch()"
                />
              </v-col>

              <v-col cols="12">
                <maps
                  :lat="user?.location?.lat"
                  :long="user?.location?.long"
                  @getLocation="getLocation"
                />
              </v-col>

              <v-col cols="12">
                <v-btn
                  class="w-100"
                  color="primary"
                  size="large"
                  @click="register"
                  :disabled="v$.user.$error || isLoading"
                  :loading="isLoading"
                >
                  {{ $t("admin_auth.register_new_client") }}
                </v-btn>
              </v-col>
            </v-row>
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
import Maps from "@/components/common/Maps.vue";
import { useGetMerchantByCodeStore } from "@/stores/global/merchant/getByCode.store";
import { useAuthClientStore } from "@/stores/client/auth/auth.client.store";
export default {
  components: { FiledInput, Maps },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      user: {
        email: { required, email },
        name: { required },
        phone: { required },
        address: { required },
        password: { required },
      },
    };
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: "",
        location: {
          lat: "",
          long: "",
        },
        address: "",
        password: "",
        merchant_id: null,
        is_active: 1,
      },
      showPassword: false,
      errors: {},
    };
  },
  async mounted() {
    // check router has query
    if (this.$route.query.merchant_code) {
      await this.getMerchantByCode(this.$route.query.merchant_code);
      this.user.merchant_id = this.record.id;
    } else {
      this.$router.push({ name: "404" });
    }
  },
  computed: {
    ...mapState(useGetMerchantByCodeStore, ["uiFlags", "record"]),
    ...mapState(useAuthClientStore, ["isLoading"]),
  },
  methods: {
    ...mapActions(useGetMerchantByCodeStore, ["getMerchantByCode"]),
    ...mapActions(useAuthClientStore, ["registerClient"]),
    async register() {
      this.v$.user.$touch();
      if (this.v$.user.$error) return;
      await this.registerClient(this.user);
    },
    getLocation(address) {
      this.user.address = address.title;
      this.user.location = {
        lat: address.lat,
        long: address.long,
      };
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
