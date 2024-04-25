<template >
  <div class="border my-4 pa-4">
    <h3 class="mb-3">
      {{ $t("orders.select_client") }}
    </h3>
    <v-row>
      <v-col md="4" cols="12">
        <div class="w-100 d-flex ga-2">
          <v-btn
            flat
            class="d-flex align-center justify-center px-4"
            size="md"
            @click="showClient = true"
          >
            <span class="mdi mdi-plus"></span>
          </v-btn>
          <v-select
            v-model="selectClient"
            :placeholder="$t('admin_navbar_links.clients')"
            :items="recordsClients"
            item-title="name"
            item-value="id"
            menu-icon="mdi mdi-chevron-down"
            class="w-100"
            outlined
            return-object
            :no-data-text="$t('global.actions.no_data')"
            :error="errorClient"
          />
        </div>
        <p class="text-error mt-2 d-flex ga-2 align-center" v-if="errorClient">
          <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
          <span>{{ $t("errors.required") }}</span>
        </p>
      </v-col>
      <v-col md="8" cols="12">
        <div class="d-flex w-100 ga-2 align-center">
          <div
            class="border bg-white pa-2 rounded d-flex w-100 ga-2 align-center"
          >
            <span class="mdi mdi-24px mdi-account-outline"></span>
            <span>{{ selectClient?.name }}</span>
          </div>
          <div
            class="border bg-white pa-2 rounded d-flex w-100 ga-2 align-center"
          >
            <span class="mdi mdi-24px mdi-phone-outline"></span>
            <span>
              {{ selectClient?.phone }}
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="showClient" width="80%">
      <template v-slot:default="{ isActive }">
        <div class="bg-white rounded pa-4 overflow-auto">
          <div
            class="d-flex align-center justify-space-between pb-4 mb-4 border-b"
          >
            <h4>{{ $t("merchant.clients.add_new") }}</h4>
            <button @click="isActive.value = false">
              <span class="mdi mdi-24px mdi-close"></span>
            </button>
          </div>
          <v-row>
            <!-- data -->
            <v-col
              cols="12"
              md="6"
              v-for="(item, index) in clientObjData"
              :key="index"
            >
              <filed-input
                :label="item.label"
                v-model="clientObj[item.name]"
                :value="clientObj[item.name]"
                :type="item.type"
                :error="v$.clientObj[item.name].$error"
                :error-text="item.errorText"
                @blur="v$.clientObj[item.name].$touch()"
              />
            </v-col>

            <v-col cols="12">
              <img src="/map.png" alt="" />
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="clientObj.is_active"
                :label="$t('global.status.active')"
                :error="v$.clientObj.is_active.$error"
                @blur="v$.clientObj.is_active.$touch()"
                hide-details
              />
            </v-col>

            <v-col cols="12">
              <v-btn
                class="w-100"
                color="primary"
                size="large"
                @click="createClient"
                :loading="uiFlags.isCreating"
                :disabled="uiFlags.isCreating || v$.clientObj.$error"
              >
                {{ $t("global.actions.add") }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-dialog>
  </div>
</template>
<script>
import { useClientsMerchantStore } from "@/stores/merchant/clients/clients.merchant.store";
import { mapActions, mapState } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import FiledInput from "@/components/common/FiledInput.vue";
export default {
  components: { FiledInput },
  props: {
    orderData: {
      type: Object,
      default: () => ({}),
    },
    errorClient: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      clientObj: {
        name: { required },
        email: { required, email },
        address: { required },
        phone: { required },
        location: {
          lat: { required },
          long: { required },
        },
        is_active: { required },
      },
    };
  },
  data() {
    return {
      selectClient: null,
      showClient: false,
      clientObj: {
        name: null,
        email: null,
        address: null,
        phone: null,
        location: {
          lat: null,
          long: null,
        },
        is_active: null,
      },
    };
  },
  async mounted() {
    await this.getClientsMerchant();
    this.getLocation();
  },
  computed: {
    ...mapState(useClientsMerchantStore, ["records", "uiFlags"]),
    recordsClients() {
      return this.records?.data || [];
    },
    clientObjData() {
      return [
        {
          name: "name",
          type: "text",
          label: this.$t("admin_merchant.fields.name"),
          error: "v$.clientObj.name.$error",
          errorText:
            this.v$.clientObj.name.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.clientObj.name.$touch()",
        },
        {
          name: "email",
          type: "email",
          label: this.$t("admin_merchant.fields.email"),
          error: "v$.clientObj.email.$error",
          errorText:
            (this.v$.clientObj.email.required.$invalid &&
              this.$t("errors.required")) ||
            (this.v$.clientObj.email.email.$invalid && this.$t("errors.email")),
          blur: "v$.clientObj.email.$touch()",
        },
        {
          name: "address",
          type: "text",
          label: this.$t("admin_merchant.fields.address"),
          error: "v$.clientObj.address.$error",
          errorText:
            this.v$.clientObj.address.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.clientObj.address.$touch()",
        },
        {
          name: "phone",
          type: "text",
          label: this.$t("admin_merchant.fields.phone"),
          error: "v$.clientObj.phone.$error",
          errorText:
            this.v$.clientObj.phone.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.clientObj.phone.$touch()",
        },
      ];
    },
  },
  methods: {
    ...mapActions(useClientsMerchantStore, [
      "getClientsMerchant",
      "createClientsMerchant",
    ]),
    async createClient() {
      this.v$.clientObj.$touch();
      if (this.v$.clientObj.$error) return;
      const { data } = await this.createClientsMerchant(
        { ...this.clientObj },
        false
      );
      this.selectClient = data;
      this.showClient = false;
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.clientObj.location = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
        });
      }
    },
  },

  watch: {
    selectClient: {
      handler(val) {
        if (!val) return;

        this.orderData.merchant_client_id = val?.id;
        this.orderData.address.name = val?.name;
        this.orderData.address.phone = val?.phone;
        this.orderData.address.address = val?.address;
        this.orderData.address.location.lat = val.location.coordinates[0];
        this.orderData.address.location.long = val.location.coordinates[1];
        if (this.orderData.pick_up_type == "delivered") {
          this.orderData.address.pick_up_location.lat =
            val.location.coordinates[0];
          this.orderData.address.pick_up_location.long =
            val.location.coordinates[1];
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
</style>