<template>
  <div>
    <div class="d-flex ga-2 align-center">
      <router-link
        v-for="(item, index) in pages"
        :key="index"
        :to="item.to"
        class="settings__link"
      >
        <v-list-item>
          <div class="d-flex align-center ga-2">
            <span class="mdi mdi-24px" :class="item.icon"></span>
            <span>{{ item.title }}</span>
          </div>
        </v-list-item>
      </router-link>
    </div>
    <div class="content mt-4">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pages: [
        {
          to: "/admin/settings/general",
          title: this.$t("admin_navbar_links.general"),
          icon: "mdi-cog",
          key: "general",
        },
        {
          to: "/admin/settings/taxes",
          title: this.$t("admin_navbar_links.taxes"),
          icon: "mdi-currency-usd",
          key: "taxes",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.settings {
  &__link {
    color: #000;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;

    &.router-link-active,
    &.router-link-exact-active {
      background-color: $primary;
      color: $white;
    }
  }
}
</style>
