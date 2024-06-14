<template>
  <div>
    <filed-input
      v-model="taxes.records.vat"
      :value="taxes.records.vat"
      :label="$t('global.show_order.tax')"
      class="mb-4"
      :error="v$.taxes.records.vat.$error"
      :error-text="
        v$.taxes.records.vat.required.$invalid && $t('errors.required')
      "
      @blur="v$?.taxes.records.vat?.$touch()"
    />

    <v-btn
      @click="updateTaxesSettings(taxes.records)"
      color="primary"
      class="w-100"
      :disabled="v$?.taxes?.$invalid"
      :loading="taxes.uiFlags.isUpdated"
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
import { required } from "@vuelidate/validators";
export default {
  components: { FiledInput },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      taxes: {
        records: {
          vat: { required },
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
    await this.getTaxesSettings();
  },

  computed: {
    ...mapState(useSettingsAdminStore, ["taxes"]),
  },
  methods: {
    ...mapActions(useSettingsAdminStore, [
      "getTaxesSettings",
      "updateTaxesSettings",
    ]),
  },
};
</script>
<style lang="scss" scoped></style>
