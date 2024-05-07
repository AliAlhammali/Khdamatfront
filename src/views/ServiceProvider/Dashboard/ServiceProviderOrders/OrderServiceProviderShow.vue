<template >
  <div class="content">
    <template v-if="uiFlags.isLoading || uiFlags.isUpdating">
      <Loader />
    </template>
    <template v-else>
      <v-stepper alt-labels elevation="0">
        <v-stepper-header>
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
                <div class="d-flex align-center ga-8 mb-2 pb-2">
                  <span> {{ $t("global.show_order.status") }} </span>
                  <v-select
                    v-model="record.status"
                    :placeholder="$t('admin_categories.fields.merchant_id')"
                    :items="orderStatus"
                    item-title="text"
                    item-value="value"
                    menu-icon="mdi mdi-chevron-down"
                    class="w-100"
                    outlined
                    :no-data-text="$t('global.actions.no_data')"
                    @update:model-value="(item) => updateOrders(item)"
                    :disabled="
                      record?.status === 'completed' ||
                      record?.status === 'canceled'
                    "
                  />
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
                  <p>{{ record?.created_at }}</p>
                </div>
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span> {{ $t("global.show_order.order_start_date") }} </span>
                  <p>{{ record?.started_at }}</p>
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
                  @mouseover="showMap = true"
                  @mouseleave="showMap = false"
                >
                  <span>{{ $t("global.show_order.address") }}</span>
                  <p class="hover-to-show" @click="showMap = !showMap">
                    {{ $t("global.show_order.view_location") }}
                  </p>
                  <div class="show-map" v-if="record?.address && showMap">
                    <MapsView
                      v-if="record?.address[0]?.location?.coordinates"
                      :key="record?.address[0]?.location?.coordinates"
                      :center="record?.address[0]?.location?.coordinates"
                      :style="{ height: '250px' }"
                      :zoom="11"
                    />
                  </div>
                </div>
              </div>
              <div class="bg-white">
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span> {{ $t("global.show_order.subtotal") }} </span>
                  <h4>{{ record?.totals?.sp_sup_total }}</h4>
                </div>
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span>{{ $t("global.show_order.tax") }} </span>
                  <h4>{{ record?.totals?.sp_vat }}</h4>
                </div>
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span>{{ $t("global.show_order.total") }}</span>
                  <h4>{{ record?.totals?.sp_total }}</h4>
                </div>

                <ShareNetwork
                  class="main-btn pa-2 rounded-lg w-100 text-center mt-4"
                  network="whatsapp"
                  url=""
                  title=""
                  description="`merchant name ${record?.address[0]?.name},branch location ${record?.address[0]?.location},phone number ${record?.address[0]?.phone},pick up location ${record?.address[0]?.pick_up_location},order date ${record?.started_at},`"
                  @open="openShare = true"
                  @change="openShare = false"
                  @close="openShare = false"
                >
                  <v-icon size="24">mdi mdi-share-variant-outline</v-icon>
                </ShareNetwork>
              </div>
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
                  <td class="border-e">{{ item.item?.sp_price }}</td>
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
                            {{ item?.sp_sup_total }}
                          </td>
                          <td class="border-e" width="75px">{{ item?.sp_vat }}</td>
                          <td>{{ item?.sp_total }}</td>
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
  </div>
</template>
<script>
import Loader from "@/components/common/Loader.vue";
import MapsView from "@/components/common/MapsView.vue";
import { useOrdersServiceProviderStore } from "@/stores/serviceProvider/orders/orders.serviceProvider.store";
import { mapActions, mapState } from "pinia";

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
    await this.showOrdersServiceProvider(this.$route.params.id, {
      includeOrderItemService: 1,
      includeOrderMerchantUser: 1,
      includeOrderMerchantClient: 1,
    });
  },
  computed: {
    ...mapState(useOrdersServiceProviderStore, ["record", "uiFlags"]),
    orderStatus() {
      let status = [
        //  { value: "new", text: this.$t("global.order_status.new"), step: 1 },
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
        // {
        //   value: "canceled",
        //   text: this.$t("global.order_status.canceled"),
        //   step: 6,
        // },
      ];
      // if (this.record?.status === "canceled") {
      //   status = status.filter((item) => item.value !== "completed");
      // }
      // if (this.record?.status === "completed") {
      //   status = status.filter((item) => item.value !== "canceled");
      // }
      return status;
    },
    currentStep() {
      return this.orderStatus.find(
        (status) => status?.value === this.record?.status
      );
    },
  },
  methods: {
    ...mapActions(useOrdersServiceProviderStore, [
      "showOrdersServiceProvider",
      "updateOrdersServiceProvider",
    ]),
    async updateOrders(item) {
      await this.updateOrdersServiceProvider(this.$route.params.id, {
        status: item,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.order-info {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.show-map {
  width: 250px;
  height: 250px;
  position: absolute;
  left: 0;
  top: 30px;
}
</style>