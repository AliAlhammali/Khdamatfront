<template>
  <v-locale-provider :rtl="true">
    <router-view />
  </v-locale-provider>
</template>
<script>
import { usePublicSettingsStore } from "@/stores/global/settings/settings.global.store";

import { mapActions, mapState } from "pinia";
export default {
  async mounted() {
    await this.getGeneralSettings();
    document.title = this.general.records.site_name;
  },
  computed: {
    ...mapState(usePublicSettingsStore, ["general"]),
  },
  methods: {
    ...mapActions(usePublicSettingsStore, ["getGeneralSettings"]),
  },
};
</script>
<style lang="scss">
// test
</style>
