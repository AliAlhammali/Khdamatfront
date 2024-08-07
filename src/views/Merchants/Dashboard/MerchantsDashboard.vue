<template>
  <div>
    <v-layout class="rounded rounded-md" v-if="record">
      <v-navigation-drawer v-model="drawer" permanent>
        <v-list>
          <v-list-item>
            <v-img
              src="/logo.png"
              max-height="80"
              max-width="80"
              class="mx-auto mb-4"
            ></v-img>
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item>
            <router-link
              to="/merchant/dashboard"
              class="d-flex align-center ga-2 router-link"
            >
              <span class="mdi mdi-24px mdi-view-dashboard"></span>
              <span>{{ $t("admin_navbar_links.dashboard") }}</span>
            </router-link>
          </v-list-item>

          <v-list-group
            v-for="(item, index) in pagesList"
            :key="index"
            :value="item.key"
            expand-icon="mdi mdi-chevron-down"
            collapse-icon="mdi mdi-chevron-up"
          >
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props">
                <div class="d-flex align-center ga-2">
                  <span class="mdi mdi-24px" :class="item.icon"></span>
                  <span>{{ item.title }}</span>
                </div>
              </v-list-item>
            </template>
            <v-list-item
              v-for="([title, link], index) in item.pages"
              :key="index"
              :to="link"
              class="px-0"
              exact
              @click="closeDrawer"
            >
              <div class="d-flex align-center ga-2">
                <span class="mdi mdi-circle-outline mdi-18px"></span>
                <span>{{ title }}</span>
              </div>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar class="">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <button @click="() => (openQr = true)" class="mx-2">
            <v-icon>mdi mdi-qrcode-scan</v-icon>
          </button>
        </template>

        <v-spacer></v-spacer>

        <v-menu min-width="250px" rounded>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar color="brown" size="large">
                <span class="text-h5">{{ getInitials(record?.name) }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <h3>{{ record?.name }}</h3>
              <p class="text-caption mt-1">
                {{ record?.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                class="w-100 d-flex align-center ga-2"
                @click="logoutMerchant"
                :loading="isLoading"
                :disabled="isLoading"
              >
                <span>
                  {{ $t("global.actions.logout") }}
                </span>
                <span class="mdi mdi-logout"> </span>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-app-bar>

      <v-main style="min-height: 350px">
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>

    <v-dialog v-model="openQr" max-width="500">
      <qr-code :url-code="registerUrl" />
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAuthMerchantStore } from "@/stores/merchant/auth/auth.merchant.store";
import { getInitials } from "@/helper/initials.name.helper";
import QrCode from "@/components/common/QrCode.vue";
export default {
  components: { QrCode },
  data() {
    return {
      drawer: true,
      openQr: false,
    };
  },
  mounted() {
    this.checkCookie();
    // check is mobile close drawer
    this.closeDrawer();
  },
  computed: {
    ...mapState(useAuthMerchantStore, ["isLoading", "record"]),
    pagesList() {
      let pages = [
        {
          title: this.$t("admin_navbar_links.users"),
          icon: "mdi-account-group-outline",
          key: "users_merchant",
          pages: [[this.$t("admin_navbar_links.users"), "/merchant/users"]],
          roles: ["admin"],
        },

        {
          title: this.$t("admin_navbar_links.categories"),
          icon: "mdi-store-outline",
          key: "merchant_categories",
          pages: [
            [this.$t("admin_navbar_links.categories"), "/merchant/categories"],
          ],
          roles: ["admin"],
        },
        {
          title: this.$t("admin_navbar_links.services"),
          icon: "mdi-cog-outline",
          key: "merchant_services",
          pages: [
            [this.$t("admin_navbar_links.services"), "/merchant/services"],
          ],
          roles: ["admin"],
        },

        {
          title: this.$t("admin_navbar_links.branches"),
          icon: "mdi-storefront-plus-outline",
          key: "merchant_branches",
          pages: [
            [this.$t("admin_navbar_links.branches"), "/merchant/branches"],
          ],
          roles: ["admin"],
        },
        {
          title: this.$t("admin_navbar_links.clients"),
          icon: "mdi-account-multiple-outline",
          key: "merchant_clients",
          pages: [[this.$t("admin_navbar_links.clients"), "/merchant/clients"]],
          roles: ["admin"],
        },
        {
          title: this.$t("admin_navbar_links.orders"),
          icon: "mdi-list-box-outline",
          key: "merchant_orders",
          pages: [[this.$t("admin_navbar_links.orders"), "/merchant/orders"]],
          roles: ["admin", "staff"],
        },
      ];
      pages = pages.filter((page) => {
        return page.roles.includes(this.record?.role.toLowerCase());
      });
      return pages;
    },

    merchantCode() {
      return this.$cookies.get("merchant_khadamat_merchant").code || "";
    },

    registerUrl() {
      // get base url
      return `${window.location.origin}/#/client/register?merchant_code=${this.merchantCode}`;
    },
  },
  methods: {
    ...mapActions(useAuthMerchantStore, ["checkCookie", "logoutMerchant"]),
    getInitials,
    // if mobile close
    closeDrawer() {
      if (window.innerWidth < 992) {
        this.drawer = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
