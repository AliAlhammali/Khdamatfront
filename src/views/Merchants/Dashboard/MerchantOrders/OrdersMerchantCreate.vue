<template >
  <div>
    <div class="bg-white pa-4 rounded border rounded-lg">
      <h2 class="mb-4 border-b pb-4">اضافة طلب جديد</h2>
      <h2 class="mb-4">بيانات العميل</h2>
      <v-row>
        <v-col md="4" cols="12">
          <div class="w-100 d-flex ga-2">
            <v-btn
              flat
              class="d-flex align-center justify-center px-4"
              size="md"
            >
              <span class="mdi mdi-plus"></span>
            </v-btn>
            <v-select
              v-model="selectClient"
              :placeholder="$t('admin_navbar_links.clients')"
              :items="recordsClients?.data"
              item-title="name"
              item-value="id"
              menu-icon="mdi mdi-chevron-down"
              class="w-100"
              outlined
              return-object
              :no-data-text="$t('global.actions.no_data')"
            />
          </div>
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

        <v-col md="6" cols="12">
          <date-picker @handleDate="getDate" />
        </v-col>
        <v-col md="6" cols="12">
          <v-select
            v-model="objData.pick_up_type"
            :placeholder="$t('admin_navbar_links.clients')"
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
        <h2 class="mb-4">بيانات الفروع</h2>
        <v-row>
          <v-col md="4" cols="12">
            <div class="w-100 d-flex ga-2">
              <v-btn
                flat
                class="d-flex align-center justify-center px-4"
                size="md"
              >
                <span class="mdi mdi-plus"></span>
              </v-btn>
              <v-select
                v-model="selectBranch"
                :placeholder="$t('admin_navbar_links.clients')"
                :items="recordsBranches?.data"
                item-title="name"
                item-value="id"
                menu-icon="mdi mdi-chevron-down"
                class="w-100"
                outlined
                return-object
                :no-data-text="$t('global.actions.no_data')"
              />
            </div>
          </v-col>
          <v-col md="8" cols="12">
            <div class="d-flex w-100 ga-2 align-center">
              <div
                class="border bg-white pa-2 rounded d-flex w-100 ga-2 align-center"
              >
                <span>{{ selectBranch?.location }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <!-- {{ recordsBranches }} -->
  </div>
</template>
<script>
import { useOrdersMerchantStore } from "@/stores/merchant/orders/orders.merchant.store";
import { useBranchesMerchantStore } from "@/stores/merchant/branches/branches.merchant.store";
import { useClientsMerchantStore } from "@/stores/merchant/clients/clients.merchant.store";
import { mapActions, mapState } from "pinia";
import DatePicker from "@/components/common/DatePicker.vue";
export default {
  components: { DatePicker },
  data() {
    return {
      params: {},
      paramsList: {
        // listing: 1,
      },
      selectClient: null,
      selectBranch: null,
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
            lng: null,
          },
          pick_up_location: {
            lat: null,
            long: null,
          },
        },
        started_at: new Date().toISOString().substr(0, 10),
        pick_up_type: "delivered", // from_branch
        merchant_branch_id: null,
      },
      pickList: [
        {
          text: "delivered",
          value: "delivered",
        },
        {
          text: "from_branch",
          value: "from_branch",
        },
      ],
    };
  },
  async mounted() {
    await this.getBranchesMerchant(this.paramsList);
    await this.getClientsMerchant(this.paramsList);
  },
  computed: {
    ...mapState(useBranchesMerchantStore, {
      recordsBranches: "records",
      uiFlagsBranches: "uiFlags",
    }),
    ...mapState(useClientsMerchantStore, {
      recordsClients: "records",
      uiFlagsClients: "uiFlags",
    }),
  },
  methods: {
    ...mapActions(useBranchesMerchantStore, [
      "getBranchesMerchant",
      "createBranchesMerchant",
    ]),
    ...mapActions(useClientsMerchantStore, [
      "getClientsMerchant",
      "createClientsMerchant",
    ]),
    ...mapActions(useOrdersMerchantStore, [""]),
    getDate(date) {
      this.objData.started_at = date;
    },
  },
};
</script>
<style lang="">
</style>