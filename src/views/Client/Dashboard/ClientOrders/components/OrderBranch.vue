<template>
  <div class="border mt-4 pa-4">
    <h3 class="mb-3">
      {{ $t("orders.select_branch") }}
    </h3>
    <v-row>
      <v-col md="6" cols="12">
        <div class="w-100 d-flex ga-2">
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
            <MapsView
              v-if="selectBranch?.location.coordinates"
              :key="selectBranch?.location.coordinates"
              :center="selectBranch?.location.coordinates"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import FiledInput from "@/components/common/FiledInput.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { mapActions, mapState } from "pinia";
import Maps from "@/components/common/Maps.vue";
import MapsView from "@/components/common/MapsView.vue";
import { useBranchesClientStore } from "@/stores/client/branches/branches.client.store";

export default {
  components: { FiledInput, Maps, MapsView },
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
    await this.getBranchesClient();
  },
  computed: {
    ...mapState(useBranchesClientStore, {
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
    ...mapActions(useBranchesClientStore, ["getBranchesClient"]),
    getLocation(address) {
      this.branchesObj.address = address.title;
      this.branchesObj.location = {
        lat: address.lat,
        long: address.long,
      };
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
