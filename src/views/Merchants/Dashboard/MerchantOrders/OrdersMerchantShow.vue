<template >
  <div class="content">
    <template v-if="uiFlags.isLoading">
      <Loader />
    </template>
    <template v-else>
      <v-stepper alt-labels elevation="0">
        <v-stepper-header mobile>
          <template v-for="(status, index) in orderStatus" :key="index">
            <v-divider v-if="index !== 0"></v-divider>
            <v-stepper-item
              :complete="
                currentStep?.step > status?.step ||
                record?.status === 'completed' ||
                record?.status === 'canceled'
              "
              :step="index + 1"
              :editable="false"
              :class="
                currentStep?.step === status?.step &&
                record?.status !== 'completed' &&
                record?.status !== 'canceled'
                  ? 'active'
                  : ''
              "
            >
              {{ status.text }}
            </v-stepper-item>
          </template>
        </v-stepper-header>
      </v-stepper>
      <div class="border-t mt-4 pt-4">
        <v-row>
          <v-col md="4" cols="12">
            <div class="border pa-4 order-info rounded-lg">
              <div class="border-b mb-2">
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span> {{ $t("global.show_order.status") }} </span>
                  <v-chip
                    variant="flat"
                    :class="{
                      'chip--new': record?.status === 'new',
                      'chip--confirmed': record?.status === 'confirmed',
                      'chip--on-the-way': record?.status === 'on_the_way',
                      'chip--in-progress': record?.status === 'in_progress',
                      'chip--completed': record?.status === 'completed',
                      'chip--canceled': record?.status === 'canceled',
                    }"
                  >
                    {{ $t(`global.order_status.${record.status}`) }}
                  </v-chip>
                </div>
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span> {{ $t("global.show_order.order_number") }} </span>
                  <p>{{ record?.id }}</p>
                </div>
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span>
                    {{ $t("global.show_order.order_creation_date") }}
                  </span>
                  <p>{{ record?.created_at ? record?.created_at : "---" }}</p>
                </div>
                <!-- 
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span>
                    {{ $t("admin_merchant.fields.service_provider") }}
                  </span>
                  <p class="text-end">
                    {{
                      record?.service_provider
                        ? record?.service_provider?.title
                        : "---"
                    }}
                  </p>
                </div> -->

                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span> {{ $t("global.show_order.order_start_date") }} </span>
                  <p>{{ record?.started_at ? record?.started_at : "---" }}</p>
                </div>
              </div>
              <div class="border-b mb-2">
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span> {{ $t("global.show_order.created_by") }}</span>
                  <p>
                    {{
                      record?.merchant_user?.name
                        ? record?.merchant_user?.name
                        : "---"
                    }}
                  </p>
                </div>
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between position-relative"
                >
                  <span>{{ $t("global.show_order.address") }}</span>
                  <button @click="showMap = !showMap">
                    {{ $t("global.show_order.view_location") }}
                  </button>
                </div>
              </div>
              <div class="bg-white">
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span> {{ $t("global.show_order.subtotal") }} </span>
                  <h4>{{ record?.totals?.sup_total }}</h4>
                </div>
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span>{{ $t("global.show_order.tax") }} </span>
                  <h4>{{ record?.totals?.vat }}</h4>
                </div>
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span>{{ $t("global.show_order.total") }}</span>
                  <h4>{{ record?.totals?.total }}</h4>
                </div>
              </div>

              <!-- `${$t('share_order.client_name')} ${
                  record?.client?.name
                } ${$t('share_order.client_phone')} ${
                  record?.client?.phone
                } ${$t('share_order.client_address')} ${
                  record?.address[0]?.address
                } ` -->
              <ShareNetwork
                class="main-btn pa-2 rounded-lg w-100 text-center mt-4"
                network="whatsapp"
                url=""
                :title="$t('share_order.order_number') + record?.id"
                :description="shareText"
                @open="openShare = true"
                @change="openShare = false"
                @close="openShare = false"
              >
                <v-icon size="24">mdi mdi-share-variant-outline</v-icon>
              </ShareNetwork>
            </div>
          </v-col>
          <v-col md="8" cols="12">
            <v-table class="border rounded-lg">
              <thead>
                <tr>
                  <th class="text-start border-e">
                    {{ $t("global.show_order.category") }}
                  </th>
                  <th class="text-start border-e">
                    {{ $t("global.show_order.service") }}
                  </th>
                  <th class="text-start border-e">
                    {{ $t("global.show_order.unit_price") }}
                  </th>
                  <th class="text-start border-e">
                    {{ $t("global.show_order.quantity") }}
                  </th>
                  <th class="text-start">
                    {{ $t("global.show_order.total") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in record?.items" :key="item.name">
                  <td class="border-e">
                    {{
                      item.item?.category?.title
                        ? item.item?.category?.title[$i18n.locale]
                        : "---"
                    }}
                  </td>
                  <td class="border-e">
                    {{
                      item.item?.title ? item.item?.title[$i18n.locale] : "---"
                    }}
                  </td>
                  <td class="border-e">{{ item.item?.price }}</td>
                  <td class="border-e">{{ item?.quantity }}</td>
                  <td class="px-0">
                    <v-table>
                      <thead v-if="index == 0">
                        <tr>
                          <th class="text-start border-e">
                            {{ $t("global.show_order.subtotal") }}
                          </th>
                          <th class="text-start border-e">
                            {{ $t("global.show_order.tax") }}
                          </th>
                          <th class="text-start border-b">
                            {{ $t("global.show_order.total") }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="border-e" width="84px">
                            {{ item?.sup_total }}
                          </td>
                          <td class="border-e" width="75px">{{ item?.vat }}</td>
                          <td>{{ item?.total }}</td>
                        </tr>
                      </tbody>
                    </v-table>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <!-- {{ record }} -->
            <!-- <div v-for="(item, index) in record?.items" :key="index">
              {{ item.item?.category?.title[$i18n.locale] }}
              {{ item.item?.title[$i18n.locale] }}
            </div> -->
          </v-col>
        </v-row>
      </div>

      <!-- {{ record.items }} -->
    </template>

    <v-dialog v-model="showMap" width="auto">
      <!-- {{ record }} -->
      <v-card min-width="400" class="pa-md-4">
        <p class="mb-3">
          {{ record?.address[0]?.address }}
        </p>
        <MapsView
          v-if="record?.address[0]?.location?.coordinates"
          :key="record?.address[0]?.location?.coordinates[0]"
          :center="record?.address[0]?.location?.coordinates"
          :style="{ height: '400px', width: '800px' }"
          :isEditMode="false"
        />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Loader from "@/components/common/Loader.vue";
import { useOrdersMerchantStore } from "@/stores/merchant/orders/orders.merchant.store";
import { mapActions, mapState } from "pinia";
import MapsView from "@/components/common/MapsView.vue";

export default {
  components: { Loader, MapsView },
  data() {
    return {
      openShare: false,
      showMap: false,
    };
  },
  async mounted() {
    // includeOrderItemService
    await this.showOrdersMerchant(this.$route.params.id, {
      includeOrderItemService: 1,
      includeOrderMerchantUser: 1,
      includeOrderMerchantClient: 1,
      includeOrderSP: 1,
    });
  },
  computed: {
    ...mapState(useOrdersMerchantStore, ["record", "uiFlags"]),
    orderStatus() {
      let status = [
        { value: "new", text: this.$t("global.order_status.new"), step: 1 },
        {
          value: "confirmed",
          text: this.$t("global.order_status.confirmed"),
          step: 2,
        },
        {
          value: "on_the_way",
          text: this.$t("global.order_status.on_the_way"),
          step: 3,
        },
        {
          value: "in_progress",
          text: this.$t("global.order_status.in_progress"),
          step: 4,
        },
        {
          value: "completed",
          text: this.$t("global.order_status.completed"),
          step: 5,
        },
        {
          value: "canceled",
          text: this.$t("global.order_status.canceled"),
          step: 6,
        },
      ];
      if (this.record?.status === "canceled") {
        status = status.filter((item) => item.value !== "completed");
      }
      if (this.record?.status === "completed") {
        status = status.filter((item) => item.value !== "canceled");
      }
      return status;
    },
    shareText() {
      return `${this.$t("share_order.client_name")} : ${
        this.record?.merchant_client?.name
      }, ${this.$t("share_order.client_phone")} : ${
        this.record?.merchant_client?.phone
      }, 
        ${this.$t("share_order.client_address")} : ${
        this.record?.merchant_client?.address
      }

      , 
        ${this.$t("share_order.merchant_address")} : ${
        this.record?.merchant_user?.address
      }
      ,
       ${this.$t("share_order.created_by")} : ${
        this.record?.merchant_user?.name
      },
      
       ${this.$t("share_order.merchant_phone")} : ${
        this.record?.merchant_user?.phone
      } ,
      ${this.$t("share_order.start_date")} : ${this.record?.started_at}`;
    },
    currentStep() {
      return this.orderStatus.find(
        (status) => status?.value === this.record?.status
      );
    },
  },
  methods: {
    ...mapActions(useOrdersMerchantStore, ["showOrdersMerchant"]),
  },
};
</script>
<style lang="scss" scoped>
.order-info {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
.chip--new {
  background-color: #f5f5f5;
  color: #000;
}

.chip--confirmed {
  background-color: #00a0dc;
  color: #fff;
}

.chip--on-the-way {
  background-color: #f5a623;
  color: #fff;
}
.chip--in-progress {
  background-color: #4caf50;
  color: #fff;
}
.chip--completed {
  background-color: #00a0dc;
  color: #fff;
}
.chip--canceled {
  background-color: #f44336;
  color: #fff;
}

.show-map {
  width: 250px;
  height: 250px;
  position: absolute;
  left: 0;
  top: 30px;
}
</style>