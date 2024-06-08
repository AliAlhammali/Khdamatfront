<template >
  <div>
    <div class="bg-white pa-4 rounded border rounded-lg">
      <h2 class="mb-4 border-b pb-4">
        {{ $t("orders.add_new") }}
      </h2>
      <order-client
        :order-data="objData"
        :error-client="v$.objData.merchant_client_id.$error"
      />
      <v-row>
        <v-col md="6" cols="12">
          <date-picker
            :editable="false"
            :placeholder="$t('global.show_order.order_creation_date')"
            v-model="objData.started_at"
            v-model:value="objData.started_at"
            type="datetime"
            class="mb-2 w-100"
            value-type="format"
            format="YYYY-MM-DD HH:mm:ss"
            @change="getDate"
            confirm
            :confirm-text="$t('global.actions.save')"
          >
          </date-picker>
        </v-col>
        <v-col md="6" cols="12">
          <v-select
            v-model="objData.pick_up_type"
            :placeholder="$t('global.order_type.label')"
            :label="$t('global.order_type.label')"
            :items="pickList"
            item-title="text"
            item-value="value"
            menu-icon="mdi mdi-chevron-down"
            class="w-100"
            outlined
            :no-data-text="$t('global.actions.no_data')"
          />
        </v-col>
      </v-row>

      <div class="" v-if="objData.pick_up_type !== 'delivered'">
        <order-branch
          :order-data="objData"
          :error-branch="v$.objData.merchant_branch_id.$error"
        />
      </div>

      <order-items :order-data="objData" :errors="v$.objData" />
      <div class="mt-4">
        <v-btn
          @click="createOrder"
          class="w-100"
          color="primary"
          size="large"
          :loading="uiFlags.isCreated"
          :disabled="v$.objData.$error"
        >
          {{ $t("global.actions.add") }}
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { useOrdersMerchantStore } from "@/stores/merchant/orders/orders.merchant.store";
import { mapActions, mapState } from "pinia";
import OrderClient from "./components/OrderClient.vue";
import OrderBranch from "./components/OrderBranch.vue";
import OrderItems from "./components/OrderItems.vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  helpers,
  minLength,
  requiredIf,
} from "@vuelidate/validators";

export default {
  components: { OrderClient, OrderBranch, OrderItems },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      objData: {
        main_category_id: { required },
        items: {
          required,
          minLength: minLength(1),
          $each: helpers.forEach({
            item_id: { required },
            quantity: { required },
            category_id: { required },
          }),
        },
        merchant_client_id: { required },
        address: {
          name: { required },
          // phone: { required },
          address: { required },
          location: {
            lat: { required },
            long: { required },
          },
          pick_up_location: {
            lat: { required },
            long: { required },
          },
        },
        started_at: { required },
        pick_up_type: { required },
        merchant_branch_id: {
          required: requiredIf(function () {
            return this.objData.pick_up_type === "from_branch";
          }),
        },
      },
    };
  },
  data() {
    return {
      objData: {
        main_category_id: null,
        items: [],
        merchant_client_id: null,
        address: {
          name: null,
          phone: null,
          address: null,
          location: {
            lat: null,
            long: null,
          },
          pick_up_location: {
            lat: null,
            long: null,
          },
        },
        started_at: new Date().toISOString().substr(0, 10),
        pick_up_type: "delivered", // from_branch
        merchant_branch_id: null,
        merchant_reference: null,
        merchant_reference_file: null,
        openTime: false,
      },
      pickList: [
        {
          text: this.$t("global.order_type.delivered"),
          value: "delivered",
        },
        {
          text: this.$t("global.order_type.from_branch"),
          value: "from_branch",
        },
      ],
    };
  },
  async mounted() {},
  computed: {
    ...mapState(useOrdersMerchantStore, ["uiFlags"]),
  },
  methods: {
    ...mapActions(useOrdersMerchantStore, ["createOrdersMerchant"]),
    getDate(date) {
      this.objData.started_at = date;
    },

    closeTime() {
      this.openTime = false;
    },

    createOrder() {
      this.v$.objData.$touch();
      this.createOrdersMerchant(this.objData);
    },
  },
};
</script>
<style lang="">
</style>