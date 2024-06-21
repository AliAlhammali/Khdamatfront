<template>
  <div class="border my-4 pa-4">
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
          <!-- <MapsView
            v-if="selectClient?.location?.coordinates"
            :key="selectClient?.location?.coordinates"
            :center="selectClient?.location?.coordinates"
          /> -->

          <Maps
            :key="clientObj?.location?.lat"
            :editMode="false"
            :lat="clientObj?.location?.lat"
            :long="clientObj?.location?.long"
            @getLocation="getLocation"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
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
  computed: {
    recordsClients() {
      return this.records?.data || [];
    },
  },
  methods: {
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

  watch: {
    selectClient: {
      handler(val) {
        if (!val) return;

        this.orderData.address.name = val?.name;
        this.orderData.address.phone = val?.phone;
        this.orderData.address.address = val?.address;
        this.orderData.address.location.lat = val?.location?.coordinates[0];
        this.orderData.address.location.long = val?.location?.coordinates[1];

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
<style lang="scss" scoped></style>
