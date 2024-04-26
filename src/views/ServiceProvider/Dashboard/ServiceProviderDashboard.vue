<template>
  <div>
    <v-layout class="rounded rounded-md" v-if="record">
      <v-navigation-drawer v-model="drawer" permanent>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            :title="record?.name"
            nav
          >
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item>
            <router-link
              to="/service-provider/dashboard"
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
              <v-divider class="my-3"></v-divider>
              <v-btn
                class="w-100 d-flex align-center ga-2"
                @click="logoutServiceProvider"
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
import { getInitials } from "@/helper/initials.name.helper";
import { useAuthServiceProviderStore } from "@/stores/serviceProvider/auth/auth.serviceProvider.store";

export default {
  data() {
    return {
      drawer: true,
    };
  },
  mounted() {
    this.checkCookie();
  },
  computed: {
    ...mapState(useAuthServiceProviderStore, ["isLoading", "record"]),
    pagesList() {
      return [
        {
          title: this.$t("admin_navbar_links.users"),
          icon: "mdi-account-group-outline",
          key: "service_provider_users",
          pages: [
            [this.$t("admin_navbar_links.users"), "/service-provider/users"],
          ],
        },
        {
          title: this.$t("admin_navbar_links.categories"),
          icon: "mdi-store-outline",
          key: "categories",
          pages: [
            [
              this.$t("admin_navbar_links.categories"),
              "/service-provider/categories",
            ],
          ],
        },
        {
          title: this.$t("admin_navbar_links.services"),
          icon: "mdi-cog-outline",
          key: "services",
          pages: [
            [
              this.$t("admin_navbar_links.services"),
              "/service-provider/services",
            ],
          ],
        },
        {
          title: this.$t("admin_navbar_links.orders"),
          icon: "mdi-list-box-outline",
          key: "service_provider_orders",
          pages: [
            [this.$t("admin_navbar_links.orders"), "/service-provider/orders"],
          ],
        },
      ];
    },
  },
  methods: {
    ...mapActions(useAuthServiceProviderStore, [
      "checkCookie",
      "logoutServiceProvider",
    ]),
    getInitials,
  },
};
</script>
<style lang="scss" scoped>
</style>
