<template>
  <div>
    <!-- <div>navbar</div> -->
    <!-- <div>sidebar</div> -->
    <v-layout class="rounded rounded-md">
      <v-navigation-drawer class="border-0" elevation="1">
        <div class="logo pa-4 border-b">
          <h2>الشعار</h2>
        </div>
        <v-list>
          <v-list-item v-for="(item, index) in list" :key="index">
            <router-link
              :to="item.to"
              class="d-flex align-center ga-2 router-link"
            >
              <span class="mdi mdi-24px" :class="item.icon"></span>
              <span>{{ item.title }}</span>
            </router-link>
          </v-list-item>

          <v-list-group
            :value="$t('admin_navbar_links.merchant')"
            expand-icon="mdi mdi-chevron-down"
            collapse-icon="mdi mdi-chevron-up"
            open
          >
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props">
                <div class="d-flex align-center ga-2">
                  <span class="mdi mdi-24px mdi-store"></span>
                  <span>{{ $t("admin_navbar_links.merchant") }}</span>
                </div>
              </v-list-item>
            </template>
            <v-list-item
              v-for="([title, link], index) in admins"
              :key="index"
              :to="link"
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
        <div class="d-flex align-center ga-2">
          <div class="d-flex align-center ga-2 border-e pe-2">
            <span class="mdi mdi-24px mdi-account-outline"></span>
            <p>{{ record?.name }}</p>
          </div>
          <div class="d-flex align-center ga-2">
            <span class="mdi mdi-24px mdi-email-outline"></span>
            <p>{{ record?.email }}</p>
          </div>
        </div>
      </v-app-bar>

      <v-main style="min-height: 300px">
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
export default {
  data() {
    return {
      admins: [
        [this.$t("admin_navbar_links.merchant"), "/admin/merchant"],
        [this.$t("admin_navbar_links.merchant_users"), "/admin/merchant-users"],
      ],
    };
  },
  mounted() {
    this.checkCookie();
  },
  computed: {
    ...mapState(useAuthAdminStore, ["isLoading", "record"]),

    list() {
      return [
        {
          title: this.$t("admin_navbar_links.dashboard"),
          icon: "mdi-view-dashboard",
          to: "/admin/dashboard",
        },
        // {
        //   title: this.$t("admin_navbar_links.merchant"),
        //   icon: "mdi-store",
        //   to: "/admin/merchant",
        // },
        // {
        //   title: this.$t("admin_navbar_links.users"),
        //   to: "/admin/users",
        //   icon: "mdi-account-group-outline",
        // },
        // {
        //   title: this.$t("admin_navbar_links.merchant_users"),
        //   to: "/admin/merchant-users",
        //   icon: "mdi-account",
        // },
        // {
        //   title: this.$t("admin_navbar_links.services_providers"),
        //   to: "/admin/services-providers",
        //   icon: "mdi-account",
        // },
        // {
        //   title: this.$t("admin_navbar_links.services_providers_users"),
        //   to: "/admin/services-providers-users",
        //   icon: "mdi-account",
        // },
        // {
        //   title: this.$t("admin_navbar_links.categories"),
        //   to: "/admin/categories",
        //   icon: "mdi-account",
        // },
        // {
        //   title: this.$t("admin_navbar_links.services"),
        //   to: "/admin/services",
        //   icon: "mdi-account",
        // },
      ];
    },
  },
  methods: {
    ...mapActions(useAuthAdminStore, ["checkCookie"]),
  },
};
</script>
<style lang="scss" scoped>
</style>
