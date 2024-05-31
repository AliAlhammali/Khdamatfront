<template >
  <div>
    <div
      class="pa-4 bg-white shadow-lg rounded-lg border"
      v-if="!figures?.isLoading"
    >
      <div class="figures d-flex align-center ga-4 flex-column flex-md-row">
        <div
          class="figure w-100 pa-2 rounded-lg border merchants"
          v-if="userIsAdmin"
        >
          <div class="d-flex align-center ga-4">
            <div class="figure-icon">
              <v-icon size="32">mdi mdi-account-tie-outline</v-icon>
            </div>
            <div class="figure-value">
              {{ figures?.records?.count_of_active_staff }}
            </div>
          </div>

          <div class="figure-title mb-2">
            {{ $t(`dashboard.count_of_active_staff`) }}
          </div>
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

          <div class="figure-title mb-2">
            {{ $t(`dashboard.count_of_new_orders`) }}
          </div>
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

          <div class="figure-title mb-2">
            {{ $t(`dashboard.count_of_in_progress_orders`) }}
          </div>
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

          <div class="figure-title mb-2">
            {{ $t(`dashboard.count_of_completed_orders`) }}
          </div>
        </div>
      </div>
    </div>

    <v-row class="mt-4" v-if="userIsAdmin">
      <v-col md="6" cols="12">
        <div class="bg-white border rounded-lg">
          <div
            class="d-flex align-center ga-2 border-b justify-space-between pa-4"
          >
            <h3 class="">أفضل الموظفين حسب الطلبات</h3>
            <v-menu
              v-model="toggleTopStaffByOrders"
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
                    @click="toggleTopStaffByOrders = false"
                    class="mb-2 text-error"
                  >
                    <v-icon size="24">mdi mdi-close</v-icon>
                  </button>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    v-model="paramsTopStaffByOrders['filter[date_from]']"
                    v-model:value="paramsTopStaffByOrders['filter[date_from]']"
                    :default-value="paramsTopStaffByOrders['filter[date_from]']"
                    type="date"
                    class="mb-2 w-100"
                    value-type="format"
                    format="YYYY-MM-DD"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    v-model="paramsTopStaffByOrders['filter[date_to]']"
                    v-model:value="paramsTopStaffByOrders['filter[date_to]']"
                    :default-value="paramsTopStaffByOrders['filter[date_to]']"
                    type="date"
                    class="mb-2 w-100"
                    value-type="format"
                    format="YYYY-MM-DD"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <v-btn
                    @click="getTopStaffByOrders(paramsTopStaffByOrders)"
                    class="main-btn w-100"
                  >
                    <v-icon size="24">mdi mdi-filter</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <chart-bar
            :chart="mapTopStaffByOrders"
            :isLoading="topStaffByOrders?.isLoading"
          />
        </div>
      </v-col>
      <v-col md="6" cols="12">
        <div class="bg-white border rounded-lg">
          <div
            class="d-flex align-center ga-2 border-b justify-space-between pa-4"
          >
            <h3 class="">أفضل الموظفين حسب الطلبات المكتملة</h3>
            <v-menu
              v-model="toggleTopStaffCompletedOrders"
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
                    @click="toggleTopStaffCompletedOrders = false"
                    class="mb-2 text-error"
                  >
                    <v-icon size="24">mdi mdi-close</v-icon>
                  </button>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    type="date"
                    v-model="paramsTopStaffCompletedOrders['filter[date_from]']"
                    v-model:value="
                      paramsTopStaffCompletedOrders['filter[date_from]']
                    "
                    :default-value="
                      paramsTopStaffCompletedOrders['filter[date_from]']
                    "
                    class="mb-2 w-100"
                    value-type="format"
                    format="YYYY-MM-DD"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    type="date"
                    v-model="paramsTopStaffCompletedOrders['filter[date_to]']"
                    v-model:value="
                      paramsTopStaffCompletedOrders['filter[date_to]']
                    "
                    :default-value="
                      paramsTopStaffCompletedOrders['filter[date_to]']
                    "
                    class="mb-2 w-100"
                    value-type="format"
                    format="YYYY-MM-DD"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <v-btn
                    @click="
                      getTopStaffCompletedOrders(paramsTopStaffCompletedOrders)
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
            :chart="mapTopStaffCompletedOrders"
            :isLoading="topStaffCompletedOrders?.isLoading"
          />
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-4" v-if="userIsAdmin">
      <v-col cols="12">
        <calendar
          :items="calenderOrders.records"
          @handleEventClick="handleEventClick"
          @changeDate="changeDate"
        />
      </v-col>
    </v-row>
    <!-- <v-table class="border mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Calories</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in [
            { name: 'Frozen Yogurt', calories: 159 },
            { name: 'Ice cream sandwich', calories: 237 },
            { name: 'Eclair', calories: 262 },
            { name: 'Cupcake', calories: 305 },
            { name: 'Gingerbread', calories: 356 },
          ]"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </v-table> -->
  </div>
</template>
<script>
import ChartBar from "@/components/common/ChartBar.vue";
import { arSA, enUS } from "date-fns/locale";
import moment from "moment";
import Calendar from "@/components/common/Calendar.vue";
import { mapActions, mapState } from "pinia";
import { mappingToChart } from "@/helper/apexCharts.helper";
import { useDashboardsServiceProviderStore } from "@/stores/serviceProvider/dashboard/dashboard.serviceProvider.store";
import { useAuthServiceProviderStore } from "@/stores/serviceProvider/auth/auth.serviceProvider.store";
export default {
  components: { ChartBar, Calendar },
  data() {
    return {
      // date range picker last month and current date
      arSA,
      enUS,
      toggleTopStaffByOrders: false,
      toggleTopStaffCompletedOrders: false,
      paramsTopStaffByOrders: {
        "filter[date_from]": moment().subtract(1, "month").format("YYYY-MM-DD"),
        "filter[date_to]": moment().format("YYYY-MM-DD"),
      },
      paramsTopStaffCompletedOrders: {
        "filter[date_from]": moment().subtract(1, "month").format("YYYY-MM-DD"),
        "filter[date_to]": moment().format("YYYY-MM-DD"),
      },
    };
  },
  async mounted() {
    await this.getFigures();
    await this.getCalenderOrders({
      "filter[date_from]": moment().subtract(1, "month").format("YYYY-MM-DD"),
      "filter[date_to]": moment().format("YYYY-MM-DD"),
    });
    // params
    await this.getTopStaffByOrders(this.paramsTopStaffByOrders);
    await this.getTopStaffCompletedOrders(this.paramsTopStaffCompletedOrders);
  },
  computed: {
    ...mapState(useDashboardsServiceProviderStore, [
      "figures",
      "calenderOrders",
      "topStaffByOrders",
      "topStaffCompletedOrders",
    ]),
    mapTopStaffByOrders() {
      return mappingToChart(this.topStaffByOrders?.records);
    },
    mapTopStaffCompletedOrders() {
      return mappingToChart(this.topStaffCompletedOrders?.records);
    },
    ...mapState(useAuthServiceProviderStore, ["record"]),
    userIsAdmin() {
      return this.record?.role?.toLowerCase() === "admin";
    },
  },
  methods: {
    ...mapActions(useDashboardsServiceProviderStore, [
      "getFigures",
      "getCalenderOrders",
      "getTopStaffByOrders",
      "getTopStaffCompletedOrders",
    ]),
    moment,
    handleEventClick(id) {
      this.$router.push(`/service-provider/orders/${id}`);
    },
    changeDate({ start, end }) {
      this.getCalenderOrders({
        "filter[date_from]": start,
        "filter[date_to]": end,
      });
    },
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

.list-filter-style {
  position: absolute;
  top: 40px;
  z-index: 999;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  min-width: 245px;
}
</style>