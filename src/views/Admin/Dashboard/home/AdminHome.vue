<template >
  <div>
    <div class="pa-4 bg-white shadow-lg rounded-lg border">
      <div class="d-flex align-center ga-2 mb-4">
        <v-menu>
          <template v-slot:activator="{ props }">
            <button v-bind="props" class="py-2">
              <v-icon size="24">mdi mdi-calendar-month-outline</v-icon>
            </button>
          </template>
          <v-list>
            <v-list-item>
              <date-picker
                v-model="figuresStart"
                v-model:value="figuresStart"
                type="date"
                :default-value="new Date()"
              ></date-picker>
            </v-list-item>
            <v-list-item>
              <date-picker
                v-model="figuresEnd"
                v-model:value="figuresEnd"
                type="date"
                :default-value="new Date()"
              ></date-picker>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="figures d-flex align-center ga-4">
        <div class="figure w-100 pa-2 rounded-lg border merchants">
          <div class="d-flex align-center ga-4">
            <div class="figure-icon">
              <v-icon size="32">mdi mdi-account-tie-outline</v-icon>
            </div>
            <div class="figure-value">0</div>
          </div>

          <div class="figure-title mb-2">التجار النشطين</div>
        </div>
        <div class="figure w-100 pa-2 rounded-lg border SP">
          <div class="d-flex align-center ga-4">
            <div class="figure-icon">
              <v-icon size="32">mdi mdi-account-supervisor-outline</v-icon>
            </div>
            <div class="figure-value">0</div>
          </div>
          <div class="figure-title mb-2">مزودي الخدمة النشطين</div>
        </div>
        <div class="figure w-100 pa-2 rounded-lg border new-order">
          <div class="d-flex align-center ga-4">
            <div class="figure-icon">
              <v-icon size="32">mdi mdi-storefront-plus-outline</v-icon>
            </div>
            <div class="figure-value">0</div>
          </div>

          <div class="figure-title mb-2">الطلبات الجديدة</div>
        </div>
        <div class="figure w-100 pa-2 rounded-lg border progress-order">
          <div class="d-flex align-center ga-4">
            <div class="figure-icon">
              <v-icon size="32">mdi mdi-timer-sand-complete</v-icon>
            </div>
            <div class="figure-value">0</div>
          </div>

          <div class="figure-title mb-2">الطلبات قيد التنفيذ</div>
        </div>
        <div class="figure w-100 pa-2 rounded-lg border completed-order">
          <div class="d-flex align-center ga-4">
            <div class="figure-icon">
              <v-icon size="32">mdi mdi-storefront-check-outline</v-icon>
            </div>
            <div class="figure-value">0</div>
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
            <v-menu>
              <template v-slot:activator="{ props }">
                <button v-bind="props" class="py-2">
                  <v-icon size="24">mdi mdi-calendar-month-outline</v-icon>
                </button>
              </template>
              <v-list>
                <v-list-item>
                  <date-picker
                    v-model="figuresStart"
                    v-model:value="figuresStart"
                    type="date"
                    :default-value="new Date()"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    v-model="figuresEnd"
                    v-model:value="figuresEnd"
                    type="date"
                    :default-value="new Date()"
                  ></date-picker>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <chart-bar></chart-bar>
        </div>
      </v-col>
      <v-col md="6" cols="12">
        <div class="bg-white border rounded-lg">
          <div
            class="d-flex align-center ga-2 border-b justify-space-between pa-4"
          >
            <h3 class="">أعلى الطلبات المكتملة من مزودي الخدمة</h3>
            <v-menu>
              <template v-slot:activator="{ props }">
                <button v-bind="props" class="py-2">
                  <v-icon size="24">mdi mdi-calendar-month-outline</v-icon>
                </button>
              </template>
              <v-list>
                <v-list-item>
                  <date-picker
                    v-model="figuresStart"
                    v-model:value="figuresStart"
                    type="date"
                    :default-value="new Date()"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    v-model="figuresEnd"
                    v-model:value="figuresEnd"
                    type="date"
                    :default-value="new Date()"
                  ></date-picker>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <chart-bar></chart-bar>
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
                    v-model="figuresStart"
                    v-model:value="figuresStart"
                    type="date"
                    :default-value="new Date()"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    v-model="figuresEnd"
                    v-model:value="figuresEnd"
                    type="date"
                    :default-value="new Date()"
                  ></date-picker>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <chart-bar></chart-bar>
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
                    v-model="figuresStart"
                    v-model:value="figuresStart"
                    type="date"
                    :default-value="new Date()"
                  ></date-picker>
                </v-list-item>
                <v-list-item>
                  <date-picker
                    v-model="figuresEnd"
                    v-model:value="figuresEnd"
                    type="date"
                    :default-value="new Date()"
                  ></date-picker>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <chart-bar></chart-bar>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ChartBar from "@/components/common/ChartBar.vue";
import { arSA, enUS } from "date-fns/locale";
import moment from "moment";

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
    };
  },
  methods: {
    moment,
    disabledBeforeTodayAndAfterAMonth(date) {
      return (
        date < new Date() ||
        date > new Date(new Date().setMonth(new Date().getMonth() + 1))
      );
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
</style>