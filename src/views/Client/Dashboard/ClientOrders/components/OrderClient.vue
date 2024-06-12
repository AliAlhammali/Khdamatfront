<template>
  <div class="border my-4 pa-4">
    <v-row class="mb-4">
      <v-col md="6" cols="12">
        <filed-input
          :label="$t('admin_merchant.fields.merchant_reference')"
          v-model="orderData.merchant_reference"
          :value="orderData.merchant_reference"
          :required="false"
        />
      </v-col>
      <v-col md="6" cols="12">
        <p class="d-flex align-center ga-2 mb-3 filed__label">
          {{ $t("admin_merchant.fields.merchant_reference_file") }}
        </p>
        <label class="filed__input d-flex align-center ga-2 pa-2 rounded-lg">
          <input
            type="file"
            @input="upload($event, 'merchant_reference_file')"
          />
        </label>
      </v-col>
    </v-row>
    <h3 class="mb-3">
      {{ $t("orders.client_info") }}
    </h3>
    <v-row>
      <v-col md="6" cols="12">
        <div
          class="border bg-white pa-2 rounded d-flex w-100 ga-2 align-center"
        >
          <span class="mdi mdi-24px mdi-account-outline"></span>
          <span>{{ selectClient?.name }}</span>
        </div>
      </v-col>
      <v-col md="6" cols="12">
        <div
          class="border bg-white pa-2 rounded d-flex w-100 ga-2 align-center"
        >
          <span class="mdi mdi-24px mdi-phone-outline"></span>
          <span>
            {{ selectClient?.phone }}
          </span>
        </div>
      </v-col>
      <v-col md="12" cols="12">
        <div
          class="border rounded-lg pa-2"
          v-if="selectClient?.location?.coordinates"
        >
          <MapsView
            v-if="selectClient?.location?.coordinates"
            :key="selectClient?.location?.coordinates"
            :center="selectClient?.location?.coordinates"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { useClientsMerchantStore } from "@/stores/merchant/clients/clients.merchant.store";
import { mapActions, mapState } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import FiledInput from "@/components/common/FiledInput.vue";
import { useGlobalActionsStore } from "@/stores/actions/upload.store";
import Maps from "@/components/common/Maps.vue";
import MapsView from "@/components/common/MapsView.vue";
export default {
  components: { FiledInput, Maps, MapsView },
  props: {
    orderData: {
      type: Object,
      default: () => ({}),
    },
    selectClient: {
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

  data() {
    return {
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
      files: {},
      timer: null,
    };
  },
  async mounted() {
    await this.getClientsMerchant();
  },
  computed: {
    ...mapState(useClientsMerchantStore, ["records", "uiFlags"]),
    recordsClients() {
      return this.records?.data || [];
    },
  },
  methods: {
    ...mapActions(useClientsMerchantStore, [
      "getClientsMerchant",
      "createClientsMerchant",
    ]),
    ...mapActions(useGlobalActionsStore, ["uploadFile"]),

    async createClient() {
      this.v$.clientObj.$touch();
      if (this.v$.clientObj.$error) return;
      const { data } = await this.createClientsMerchant(
        { ...this.clientObj },
        false,
      );
      this.selectClient = data;
      this.showClient = false;
    },
    getLocation(address) {
      this.clientObj.address = address.title;
      this.clientObj.location = {
        lat: address.lat,
        long: address.long,
      };
    },
    updateClientLocation(address) {
      this.orderData.address.address = address.title;
      this.orderData.address.location = {
        lat: address.lat,
        long: address.long,
      };
    },
    async upload(event, key) {
      const file = event.target.files[0];
      const { data } = await this.uploadFile(file);
      this.files[key] = file; // Update the file property in Vue.js
      this.orderData[key] = data.data.path;
    },
  },

  watch: {},
};
</script>
<style lang="scss" scoped></style>
