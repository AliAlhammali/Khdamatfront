<template>
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
              <span> {{ $t("admin_navbar_links.services_providers") }} </span>
              <div class="d-flex align-center ga-8 mb-2 pb-2">
                <v-select
                  v-if="record?.service_provider?.id"
                  v-model="record.service_provider.id"
                  :placeholder="$t('admin_navbar_links.services_providers')"
                  :items="SPList?.data"
                  item-title="title"
                  item-value="id"
                  menu-icon="mdi mdi-chevron-down"
                  class="w-100 mt-2"
                  outlined
                  :no-data-text="$t('global.actions.no_data')"
                  @update:model-value="(item) => updateOrdersSp(item)"
                  :disabled="
                    record?.status === 'completed' ||
                    record?.status === 'canceled'
                  "
                />
              </div>
              <div class="border-b mb-2">
                <div class="d-flex align-center ga-8 mb-2 pb-2">
                  <span> {{ $t("global.show_order.status") }} </span>
                  <v-select
                    v-model="record.status"
                    :placeholder="$t('global.show_order.status')"
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
                  class="d-flex align-center ga-2 mb-2 pb-2 border-t justify-space-between"
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
                >
                  <span>{{ $t("global.show_order.address") }}</span>
                  <button class="hover-to-show" @click="showMap = !showMap">
                    {{ $t("global.show_order.view_location") }}
                  </button>
                </div>
              </div>
              <h2>{{ $t("global.show_order.order_total") }}</h2>
              <div class="bg-white border-b">
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
              <h2>{{ $t("global.show_order.sp_total") }}</h2>
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
              </div>
              <h2>{{ $t("global.avg_profit") }}</h2>

              <div class="bg-white">
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span> {{ $t("global.show_order.subtotal") }} </span>
                  <h4>{{ record?.totals?.profit_sup_total }}</h4>
                </div>
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span>{{ $t("global.show_order.tax") }} </span>
                  <h4>{{ record?.totals?.profit_vat }}</h4>
                </div>
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span>{{ $t("global.order_commission") }}</span>
                  <h4>{{ record?.totals?.merchant_user_commission_total }}</h4>
                </div>
                <div
                  class="d-flex align-center ga-2 mb-2 pb-2 justify-space-between"
                >
                  <span>{{ $t("global.show_order.total") }}</span>
                  <h4>{{ record?.totals?.profit_total }}</h4>
                </div>

                <!-- <ShareNetwork
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
                </ShareNetwork> -->

                <button
                  class="main-btn pa-2 rounded-lg w-100 text-center mt-4"
                  @click="copyOrderInfo"
                >
                  <v-icon size="24">mdi mdi-share-variant-outline</v-icon>
                </button>
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

    <v-dialog v-model="showMap" width="50%">
      <v-card min-width="100%" class="pa-4">
        <p class="mb-3">
          {{ record?.address[0]?.address }}
        </p>

        <div class="d-flex align-center mb-4 justify-space-between">
          <a
            :href="`https://maps.google.com/?q=${record?.address[0]?.location?.coordinates[1]},${record?.address[0]?.location?.coordinates[0]}&z=15`"
            target="_blank"
          >
            {{ $t("global.show_order.view_on_map") }}
          </a>

          <button
            @click="copyLink"
            class="main-btn py-1 px-4 rounded-lg d-flex align-center ga-2"
          >
            <i class="mdi mdi-content-copy mdi-24px"></i>
            {{ $t("global.show_order.copy_location") }}
          </button>
        </div>

        <GoogleMap
          v-if="record?.address[0]?.location?.coordinates"
          :key="record?.address[0]?.location?.coordinates[0]"
          :viewMode="true"
          :editMode="true"
          :mapLocation="record?.address[0]?.location"
        />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import GoogleMap from "@/components/common/GoogleMap.vue";
import Loader from "@/components/common/Loader.vue";
import { useOrdersAdminStore } from "@/stores/admin/orders/orders.admin.store.js";
import { useServiceProvidersAdminStore } from "@/stores/admin/serviceProviders/serviceProviders.admin.store";
import { mapActions, mapState } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  components: { Loader, GoogleMap },
  data() {
    return {
      openShare: false,
      showMap: false,
      service_provider_id: null,
    };
  },
  async mounted() {
    // includeOrderItemService
    await this.showOrdersAdmin(this.$route.params.id, {
      includeOrderItemService: 1,
      includeOrderSP: 1,
      includeOrderMerchantUser: 1,
      includeOrderMerchantClient: 1,
    });

    await this.getServiceProvidersAdmin({
      listing: 1,
    });
  },
  computed: {
    ...mapState(useOrdersAdminStore, ["record", "uiFlags"]),
    ...mapState(useServiceProvidersAdminStore, {
      SPList: "records",
      SPUiFlags: "uiFlags",
    }),
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
    currentStep() {
      return this.orderStatus.find(
        (status) => status?.value === this.record?.status,
      );
    },

    servicesNames() {
      return this.record?.items
        .map((item) => item.item?.title[this.$i18n.locale])
        .join(", ")
        .toString()
        .replace(/,/g, ", ");
    },
  },
  methods: {
    ...mapActions(useOrdersAdminStore, [
      "showOrdersAdmin",
      "updateOrdersAdmin",
    ]),
    ...mapActions(useServiceProvidersAdminStore, ["getServiceProvidersAdmin"]),
    async updateOrders(item) {
      await this.updateOrdersAdmin(this.$route.params.id, {
        status: item,
      });
    },
    async updateOrdersSp(item) {
      await this.updateOrdersAdmin(this.$route.params.id, {
        service_provider_id: item,
      });
    },

    copyLink() {
      const link = `https://maps.google.com/?q=${this.record?.address[0]?.location?.coordinates[0]},${this.record?.address[0]?.location?.coordinates[1]}&z=15`;
      navigator.clipboard.writeText(link);

      // show tost
      toast.success(this.$t("share_order.location_copied"));
    },

    copyOrderInfo() {
      const orderInfo = ` 
      ${this.$t("share_order.services_names")} : ${
        this.servicesNames ? this.servicesNames : "---"
      }
      ${this.$t("share_order.client_name")} : ${
        this.record?.merchant_client?.name
          ? this.record?.merchant_client?.name
          : "---"
      }
      ${this.$t("share_order.client_phone")} : ${
        this.record?.merchant_client?.phone
          ? this.record?.merchant_client?.phone
          : "---"
      }
      ${this.$t("share_order.client_address")} : ${
        this.record?.merchant_client?.address
          ? this.record?.merchant_client?.address
          : "---"
      }
      ${this.$t("share_order.merchant_address")} : ${
        this.record?.merchant_user?.address
          ? this.record?.merchant_user?.address
          : "---"
      }
      ${this.$t("share_order.created_by")} : ${
        this.record?.merchant_user?.name
          ? this.record?.merchant_user?.name
          : "---"
      }
      ${this.$t("share_order.merchant_phone")} : ${
        this.record?.merchant_user?.phone
          ? this.record?.merchant_user?.phone
          : "---"
      }
      ${this.$t("share_order.start_date")} : ${
        this.record?.started_at ? this.record?.started_at : "---"
      }
      ${this.$t("share_order.order_number")} : ${
        this.record?.id ? this.record?.id : "---"
      }
      ${this.$t("share_order.order_location")} : ${
        this.record?.address[0]?.address
          ? this.record?.address[0]?.address
          : "---"
      }
      ${this.$t(
        "share_order.order_location_link",
      )} : https://maps.google.com/?q=${
        this.record?.address[0]?.location?.coordinates[0]
      },${this.record?.address[0]?.location?.coordinates[1]}&z=15
      ${this.$t("share_order.created_by")} : ${
        this.record?.merchant_user?.name
          ? this.record?.merchant_user?.name
          : "---"
      }
      ${this.$t("share_order.address")} : ${
        this.record?.address[0]?.address
          ? this.record?.address[0]?.address
          : "---"
      }
      
      `;

      navigator.clipboard.writeText(orderInfo);

      // show tost
      toast.success(this.$t("share_order.order_info_copied"));
    },
  },
};
</script>
<style lang="scss" scoped>
.order-info {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
