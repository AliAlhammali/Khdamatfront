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
              to="/admin/dashboard"
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

              <!-- <v-divider class="my-3"></v-divider>
              <v-list>
                <v-list-item to="/admin/settings">
                  <v-list-item-icon>
                    <span class="mdi mdi-cog"></span>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t("global.actions.settings") }}
                  </v-list-item-title>
                </v-list-item>
              </v-list> -->
              <v-divider class="my-3"></v-divider>
              <v-btn
                class="w-100 d-flex align-center ga-2"
                @click="logoutAdmin"
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
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAuthAdminStore } from "@/stores/admin/auth/auth.admin.store";
import { getInitials } from "@/helper/initials.name.helper";
// import { useSettingsAdminStore } from "@/stores/admin/settings/settings.admin.store";
export default {
  data() {
    return {
      drawer: true,
    };
  },
  async mounted() {
    this.checkCookie();
    this.closeDrawer();
    // await this.getGeneralSettings();
    // console.log(this.general.records.site_name);

    // document.title = this.general.records.site_name;
  },
  computed: {
    ...mapState(useAuthAdminStore, ["isLoading", "record"]),
    // ...mapState(useSettingsAdminStore, ["general"]),

    pagesList() {
      return [
        {
          title: this.$t("admin_navbar_links.merchant"),
          icon: "mdi-account-tie-outline",
          key: "merchant",
          pages: [
            [this.$t("admin_navbar_links.merchant"), "/admin/merchant"],
            [
              this.$t("admin_navbar_links.merchant_users"),
              "/admin/merchant-users",
            ],
          ],
        },
        {
          title: this.$t("admin_navbar_links.services_providers"),
          icon: "mdi-account-supervisor-outline",
          key: "services_providers",
          pages: [
            [
              this.$t("admin_navbar_links.services_providers"),
              "/admin/service-provider",
            ],
            [
              this.$t("admin_navbar_links.services_providers_users"),
              "/admin/service-provider-users",
            ],
          ],
        },
        {
          title: this.$t("admin_navbar_links.users"),
          icon: "mdi-account-group-outline",
          key: "users",
          pages: [[this.$t("admin_navbar_links.users"), "/admin/users"]],
        },
        {
          title: this.$t("admin_navbar_links.categories"),
          icon: "mdi-store-outline",
          key: "categories",
          pages: [
            [this.$t("admin_navbar_links.categories"), "/admin/categories"],
          ],
        },
        {
          title: this.$t("admin_navbar_links.services"),
          icon: "mdi-cog-outline",
          key: "services",
          pages: [[this.$t("admin_navbar_links.services"), "/admin/service"]],
        },
        {
          title: this.$t("admin_navbar_links.orders"),
          icon: "mdi-list-box-outline",
          key: "admin_orders",
          pages: [[this.$t("admin_navbar_links.orders"), "/admin/orders"]],
        },
        {
          title: this.$t("admin_navbar_links.setting"),
          icon: "mdi-cog",
          key: "settings",
          pages: [[this.$t("admin_navbar_links.setting"), "/admin/settings"]],
        },
      ];
    },
  },
  methods: {
    ...mapActions(useAuthAdminStore, ["checkCookie", "logoutAdmin"]),
    // ...mapActions(useSettingsAdminStore, ["getGeneralSettings"]),
    getInitials,
    closeDrawer() {
      if (window.innerWidth < 992) {
        this.drawer = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
