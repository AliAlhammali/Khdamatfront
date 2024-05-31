<template >
  <div>
    <div class="pa-4 bg-white shadow-lg rounded-lg border">
      <div class="figures d-flex align-center ga-4 flex-column flex-md-row">
        <div class="figure w-100 pa-2 rounded-lg border merchants">
          <div class="d-flex align-center ga-4">
            <div class="figure-icon">
              <v-icon size="32">mdi mdi-account-tie-outline</v-icon>
            </div>
            <div class="figure-value">
              {{ figures?.records?.count_of_active_merchants }}
            </div>
          </div>

          <div class="figure-title mb-2">التجار النشطين</div>
        </div>
        <div class="figure w-100 pa-2 rounded-lg border SP">
          <div class="d-flex align-center ga-4">
            <div class="figure-icon">
              <v-icon size="32">mdi mdi-account-supervisor-outline</v-icon>
            </div>
            <div class="figure-value">
              {{ figures?.records?.count_of_active_sp }}
            </div>
          </div>
          <div class="figure-title mb-2">مزودي الخدمة النشطين</div>
        </div>
        <div class="figure w-100 pa-2 rounded-lg border new-order">
          <div class="d-flex align-center ga-4">
            <div class="figure-icon">
              <v-icon size="32">mdi mdi-storefront-plus-outline</v-icon>
            </div>
            <div class="figure-value">
              {{ figures?.records?.count_of_new_orders }}
            </div>
          </div>

          <div class="figure-title mb-2">الطلبات الجديدة</div>
        </div>
        <div class="figure w-100 pa-2 rounded-lg border progress-order">
          <div class="d-flex align-center ga-4">
            <div class="figure-icon">
              <v-icon size="32">mdi mdi-timer-sand-complete</v-icon>
            </div>
            <div class="figure-value">
              {{ figures?.records?.count_of_in_progress_orders }}
            </div>
          </div>

          <div class="figure-title mb-2">الطلبات قيد التنفيذ</div>
        </div>
        <div class="figure w-100 pa-2 rounded-lg border completed-order">
          <div class="d-flex align-center ga-4">
            <div class="figure-icon">
              <v-icon size="32">mdi mdi-storefront-check-outline</v-icon>
            </div>
            <div class="figure-value">
              {{ figures?.records?.count_of_completed_orders }}
            </div>
          </div>

          <div class="figure-title mb-2">الطلبات المكتملة</div>
        </div>
      </div>
    </div>

    <v-row class="mt-4">
      <v-col md="6" cols="12">
        <div class="bg-white border rounded-lg">
          <div
            class="d-flex align-center ga-2 border-b justify-space-between pa-4"
          >
            <h3 class="">أفضل الطلبات من التجار</h3>
            <v-menu
              v-model="toggleTopMerchantsByOrders"
              :close-on-content-click="false"
              :close-on-back="false"
              persistent
            >
              <template v-slot:activator="{ props }">
                <button v-bind="props" class="py-2">
                  <v-icon size="24">mdi mdi-calendar-month-outline</v-icon>
                </button>
              </template>
              <v-list>
                <v-list-item>
                  <button
                    @click="toggleTopMerchantsByOrders = false"
                    class="mb-2 text-error"
                  >
                    <v-icon size="24">mdi mdi-close</v-icon>
                  </button>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    v-model="paramsTopMerchantsByOrders['filter[date_from]']"
                    v-model:value="
                      paramsTopMerchantsByOrders['filter[date_from]']
                    "
                    :default-value="
                      paramsTopMerchantsByOrders['filter[date_from]']
                    "
                    type="date"
                    class="mb-2 w-100"
                    value-type="format"
                    format="YYYY-MM-DD"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    v-model="paramsTopMerchantsByOrders['filter[date_to]']"
                    v-model:value="
                      paramsTopMerchantsByOrders['filter[date_to]']
                    "
                    :default-value="
                      paramsTopMerchantsByOrders['filter[date_to]']
                    "
                    type="date"
                    class="mb-2 w-100"
                    value-type="format"
                    format="YYYY-MM-DD"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <v-btn
                    @click="getTopMerchantsByOrders(paramsTopMerchantsByOrders)"
                    class="main-btn w-100"
                  >
                    <v-icon size="24">mdi mdi-filter</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <chart-bar
            :chart="chartTopMerchantsByOrders"
            :isLoading="topMerchantsByOrders?.isLoading"
          />
        </div>
      </v-col>
      <v-col md="6" cols="12">
        <div class="bg-white border rounded-lg">
          <div
            class="d-flex align-center ga-2 border-b justify-space-between pa-4"
          >
            <h3 class="">أعلى الطلبات المكتملة من مزودي الخدمة</h3>
            <v-menu
              v-model="toggleTopSPCompletedByOrders"
              :close-on-content-click="false"
              :close-on-back="false"
              persistent
            >
              <template v-slot:activator="{ props }">
                <button v-bind="props" class="py-2">
                  <v-icon size="24">mdi mdi-calendar-month-outline</v-icon>
                </button>
              </template>
              <v-list>
                <v-list-item>
                  <button
                    @click="toggleTopSPCompletedByOrders = false"
                    class="mb-2 text-error"
                  >
                    <v-icon size="24">mdi mdi-close</v-icon>
                  </button>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    v-model="paramsTopSPCompletedByOrders['filter[date_from]']"
                    v-model:value="
                      paramsTopSPCompletedByOrders['filter[date_from]']
                    "
                    :default-value="
                      paramsTopSPCompletedByOrders['filter[date_from]']
                    "
                    type="date"
                    class="mb-2 w-100"
                    value-type="format"
                    format="YYYY-MM-DD"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    v-model="paramsTopSPCompletedByOrders['filter[date_to]']"
                    v-model:value="
                      paramsTopSPCompletedByOrders['filter[date_to]']
                    "
                    :default-value="
                      paramsTopSPCompletedByOrders['filter[date_to]']
                    "
                    type="date"
                    class="mb-2 w-100"
                    value-type="format"
                    format="YYYY-MM-DD"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <v-btn
                    @click="
                      getTopSPCompletedByOrders(paramsTopSPCompletedByOrders)
                    "
                    class="main-btn w-100"
                  >
                    <v-icon size="24">mdi mdi-filter</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <chart-bar
            :chart="chartTopSPCompletedByOrders"
            :isLoading="topSPCompletedByOrders?.isLoading"
          />
        </div>
      </v-col>
      <v-col md="6" cols="12">
        <div class="bg-white border rounded-lg">
          <div
            class="d-flex align-center ga-2 border-b justify-space-between pa-4"
          >
            <h3 class="">أفضل خدمة مدفوعة</h3>
            <v-menu>
              <template v-slot:activator="{ props }">
                <button v-bind="props" class="py-2">
                  <v-icon size="24">mdi mdi-calendar-month-outline</v-icon>
                </button>
              </template>
              <v-list>
                <v-list-item>
                  <date-picker
                    v-model="paramsTopServices['filter[date_from]']"
                    v-model:value="paramsTopServices['filter[date_from]']"
                    :default-value="paramsTopServices['filter[date_from]']"
                    type="date"
                    class="mb-2 w-100"
                    value-type="format"
                    format="YYYY-MM-DD"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    v-model="paramsTopServices['filter[date_to]']"
                    v-model:value="paramsTopServices['filter[date_to]']"
                    :default-value="paramsTopServices['filter[date_to]']"
                    type="date"
                    class="mb-2 w-100"
                    value-type="format"
                    format="YYYY-MM-DD"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <v-btn
                    @click="getTopServices(paramsTopServices)"
                    class="main-btn w-100"
                  >
                    <v-icon size="24">mdi mdi-filter</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <chart-bar
            :chart="chartTopServices"
            :isLoading="topServices?.isLoading"
          />
        </div>
      </v-col>
      <v-col md="6" cols="12">
        <div class="bg-white border rounded-lg">
          <div
            class="d-flex align-center ga-2 border-b justify-space-between pa-4"
          >
            <h3 class="">أفضل فئة مدفوعة</h3>
            <v-menu>
              <template v-slot:activator="{ props }">
                <button v-bind="props" class="py-2">
                  <v-icon size="24">mdi mdi-calendar-month-outline</v-icon>
                </button>
              </template>
              <v-list>
                <v-list-item>
                  <date-picker
                    v-model="paramsTopCategories['filter[date_from]']"
                    v-model:value="paramsTopCategories['filter[date_from]']"
                    :default-value="paramsTopCategories['filter[date_from]']"
                    type="date"
                    class="mb-2 w-100"
                    value-type="format"
                    format="YYYY-MM-DD"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    v-model="paramsTopCategories['filter[date_to]']"
                    v-model:value="paramsTopCategories['filter[date_to]']"
                    :default-value="paramsTopCategories['filter[date_to]']"
                    type="date"
                    class="mb-2 w-100"
                    value-type="format"
                    format="YYYY-MM-DD"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <v-btn
                    @click="getTopCategories(paramsTopCategories)"
                    class="main-btn w-100"
                  >
                    <v-icon size="24">mdi mdi-filter</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <chart-bar
            :chart="chartTopCategories"
            :isLoading="topCategories?.isLoading"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ChartBar from "@/components/common/ChartBar.vue";
import { arSA, enUS } from "date-fns/locale";
import moment from "moment";
import { useDashboardAdminStore } from "@/stores/admin/dashboard/dashboard.merchant.store";
import { mappingToChart } from "@/helper/apexCharts.helper";
import { mapActions, mapState } from "pinia";

export default {
  components: { ChartBar },
  data() {
    return {
      // date range picker last month and current date
      arSA,
      enUS,
      figuresToggle: false,
      figuresStart: new Date(),
      figuresEnd: new Date(new Date().setMonth(new Date().getMonth() - 1)),

      paramsTopMerchantsByOrders: {
        "filter[date_from]": moment().subtract(1, "month").format("YYYY-MM-DD"),
        "filter[date_to]": moment().format("YYYY-MM-DD"),
      },
      paramsTopSPCompletedByOrders: {
        "filter[date_from]": moment().subtract(1, "month").format("YYYY-MM-DD"),
        "filter[date_to]": moment().format("YYYY-MM-DD"),
      },
      paramsTopServices: {
        "filter[date_from]": moment().subtract(1, "month").format("YYYY-MM-DD"),
        "filter[date_to]": moment().format("YYYY-MM-DD"),
      },
      paramsTopCategories: {
        "filter[date_from]": moment().subtract(1, "month").format("YYYY-MM-DD"),
        "filter[date_to]": moment().format("YYYY-MM-DD"),
      },

      toggleTopMerchantsByOrders: false,
      toggleTopSPCompletedByOrders: false,
      toggleTopServices: false,
      toggleTopCategories: false,
    };
  },
  async mounted() {
    await this.getFigures();
    await this.getTopCategories(this.paramsTopCategories);
    await this.getTopMerchantsByOrders(this.paramsTopMerchantsByOrders);
    await this.getTopSPCompletedByOrders(this.paramsTopSPCompletedByOrders);
    await this.getTopServices(this.paramsTopServices);
  },
  computed: {
    ...mapState(useDashboardAdminStore, [
      "figures",
      "topCategories",
      "topMerchantsByOrders",
      "topSPCompletedByOrders",
      "topServices",
    ]),

    chartTopMerchantsByOrders() {
      return mappingToChart(this.topMerchantsByOrders?.records, [
        "order_count",
        "title",
      ]);
    },
    chartTopSPCompletedByOrders() {
      return mappingToChart(this.topSPCompletedByOrders?.records, [
        "order_count",
        "title",
      ]);
    },
    chartTopServices() {
      return mappingToChart(
        this.topServices?.records,
        ["order_count", "name"],
        this.$i18n?.locale
      );
    },
    chartTopCategories() {
      return mappingToChart(
        this.topCategories?.records,
        ["order_count", "name"],
        this.$i18n?.locale
      );
    },
  },
  methods: {
    moment,
    ...mapActions(useDashboardAdminStore, [
      "getFigures",
      "getTopCategories",
      "getTopMerchantsByOrders",
      "getTopSPCompletedByOrders",
      "getTopServices",
    ]),
  },
};
</script>
<style lang="scss" scoped>
.figures {
  .figure {
    background-color: #fff;
    position: relative;
    z-index: 1;
    border-bottom-color: transparent !important;
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 8px;
      background-color: #f5f5f5;
      z-index: -1;
    }
    .figure-title {
      font-size: 18px;
      font-weight: 500;
      color: #333;
    }
    .figure-value {
      font-size: 24px;
      font-weight: 700;
      color: #333;
      margin-top: 10px;
      margin-bottom: 12px;
    }
    .figure-icon {
      color: #333;
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 50%;
      color: #333;
    }
    &.merchants {
      .figure-icon {
        color: #ff9800;
        background-color: #ff980020;
      }
      &::before {
        background-color: #ff980020;
      }
    }
    &.SP {
      .figure-icon {
        color: #4caf50;
        background-color: #4caf5020;
      }
      &::before {
        background-color: #4caf5020;
      }
    }
    &.new-order {
      .figure-icon {
        color: #2196f3;
        background-color: #2196f320;
      }
      &::before {
        background-color: #2196f320;
      }
    }
    &.progress-order {
      .figure-icon {
        color: #ff5722;
        background-color: #ff572220;
      }
      &::before {
        background-color: #ff572220;
      }
    }
    &.completed-order {
      .figure-icon {
        color: #8bc34a;
        background-color: #8bc34a20;
      }
      &::before {
        background-color: #8bc34a20;
      }
    }
  }
}
</style>