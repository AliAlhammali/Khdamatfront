<template>
  <div class="border mt-4 pa-4">
    <h3 class="mb-3">
      {{ $t("orders.select_branch") }}
    </h3>
    <v-row>
      <v-col md="6" cols="12">
        <div class="w-100 d-flex ga-2">
          <v-btn
            flat
            class="d-flex align-center justify-center px-4"
            size="md"
            @click="showBranch = true"
          >
            <span class="mdi mdi-plus"></span>
          </v-btn>
          <v-select
            v-model="selectBranch"
            :placeholder="$t('admin_navbar_links.branches')"
            :items="recordsBranches?.data"
            item-title="name"
            item-value="id"
            menu-icon="mdi mdi-chevron-down"
            class="w-100"
            outlined
            return-object
            :no-data-text="$t('global.actions.no_data')"
            :error="errorBranch"
          />
        </div>
        <p class="text-error mt-2 d-flex ga-2 align-center" v-if="errorBranch">
          <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
          <span>{{ $t("errors.required") }}</span>
        </p>
      </v-col>
      <v-col md="12" cols="12">
        <div class="d-flex w-100 ga-2 align-center">
          <div
            class="border bg-white pa-2 rounded d-flex w-100 ga-2 align-center"
            v-if="selectBranch"
          >
            <GoogleMap
              :key="selectBranch.location"
              :viewMode="true"
              :mapLocation="selectBranch.location"
            />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="showBranch" width="80%">
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
            <v-col
              cols="12"
              md="6"
              v-for="(item, index) in branchesObjData"
              :key="index"
            >
              <filed-input
                :label="item.label"
                v-model="branchesObj[item.name]"
                :value="branchesObj[item.name]"
                :type="item.type"
                :error="v$.branchesObj[item.name].$error"
                :error-text="item.errorText"
                @blur="v$.branchesObj[item.name].$touch()"
              />
            </v-col>

            <v-col cols="12">
              <!-- <Maps
                :editMode="false"
                :lat="branchesObj?.location?.lat"
                :long="branchesObj?.location?.long"
                @getLocation="getLocation"
              /> -->
              <GoogleMap
                v-if="branchesObj.location"
                @getLocation="getLocation"
              />
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="branchesObj.is_active"
                :label="$t('global.status.active')"
                :error="v$.branchesObj.is_active.$error"
                @blur="v$.branchesObj.is_active.$touch()"
                hide-details
              />
            </v-col>

            <v-col cols="12">
              <v-btn
                class="w-100"
                color="primary"
                size="large"
                @click="createBranch"
                :loading="uiFlagsBranches.isCreating"
                :disabled="uiFlagsBranches.isCreating || v$.branchesObj.$error"
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
import FiledInput from "@/components/common/FiledInput.vue";
import Maps from "@/components/common/Maps.vue";
import MapsView from "@/components/common/MapsView.vue";
import { useBranchesMerchantStore } from "@/stores/merchant/branches/branches.merchant.store";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapState } from "pinia";
import GoogleMap from "../../../../../components/common/GoogleMap.vue";

export default {
  components: { FiledInput, Maps, MapsView, GoogleMap },
  props: {
    orderData: {
      type: Object,
      default: () => ({}),
    },
    errorBranch: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      branchesObj: {
        name: { required },
        address: { required },
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
      showBranch: false,
      selectBranch: null,
      branchesObj: {
        name: null,
        address: null,
        location: {
          lat: null,
          long: null,
        },
        is_active: null,
      },
    };
  },
  async mounted() {
    await this.getBranchesMerchant();
  },
  computed: {
    ...mapState(useBranchesMerchantStore, {
      recordsBranches: "records",
      uiFlagsBranches: "uiFlags",
    }),
    branchesObjData() {
      return [
        {
          name: "name",
          type: "text",
          label: this.$t("admin_merchant.fields.name"),
          error: "v$.branchesObj.name.$error",
          errorText:
            this.v$.branchesObj.name.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.branchesObj.name.$touch()",
        },

        {
          name: "address",
          type: "text",
          label: this.$t("admin_merchant.fields.address"),
          error: "v$.branchesObj.address.$error",
          errorText:
            this.v$.branchesObj.address.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.branchesObj.address.$touch()",
        },
      ];
    },
  },

  methods: {
    ...mapActions(useBranchesMerchantStore, [
      "getBranchesMerchant",
      "createBranchesMerchant",
    ]),
    getLocation(address) {
      this.branchesObj.address = address.title;
      this.branchesObj.location = {
        lat: address.lat,
        long: address.long,
      };
    },
    async createBranch() {
      this.v$.branchesObj.$touch();
      if (this.v$.branchesObj.$error) return;
      const { data } = await this.createBranchesMerchant(
        { ...this.branchesObj },
        false,
      );
      this.selectBranch = data;
      this.showBranch = false;
    },
  },

  watch: {
    selectBranch: {
      handler(val) {
        if (!val) return;
        this.orderData.address.pick_up_location.lat =
          val.location.coordinates[0];
        this.orderData.address.pick_up_location.long =
          val.location.coordinates[1];
        this.orderData.merchant_branch_id = val.id;
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped></style>
