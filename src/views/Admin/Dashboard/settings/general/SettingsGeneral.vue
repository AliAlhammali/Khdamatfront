<template>
  <div>
    <filed-input
      v-model="general.records.site_name"
      :value="general.records.site_name"
      :label="$t('admin_settings_general.site_name')"
      class="mb-4"
      :error="v$?.general?.records?.site_name?.$error"
      :error-text="
        (v$?.general?.records?.site_name?.required.$invalid &&
          $t('errors.required')) ||
        (v$?.general?.records?.site_name?.minLength.$invalid &&
          $t('errors.minLength', { min: 3 }))
      "
      @blur="v$?.general?.records?.site_name?.$touch()"
    />

    <v-btn
      @click="updateGeneralSettings(general.records)"
      color="primary"
      class="w-100"
      :disabled="v$?.general?.$invalid"
      :loading="general.uiFlags.isUpdated"
    >
      {{ $t("global.actions.save") }}
    </v-btn>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useSettingsAdminStore } from "@/stores/admin/settings/settings.admin.store";
import FiledInput from "@/components/common/FiledInput.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
export default {
  components: { FiledInput },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      general: {
        records: {
          site_name: { required, minLength: minLength(3) },
        },
      },
    };
  },
  data() {
    return {
      edit: false,
    };
  },

  async mounted() {
    await this.getGeneralSettings();
  },

  computed: {
    ...mapState(useSettingsAdminStore, ["general"]),
  },
  methods: {
    ...mapActions(useSettingsAdminStore, [
      "getGeneralSettings",
      "updateGeneralSettings",
    ]),
  },
};
</script>
<style lang="scss" scoped></style>
