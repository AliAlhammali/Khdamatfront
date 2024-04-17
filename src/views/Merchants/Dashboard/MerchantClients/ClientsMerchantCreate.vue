<template>
  <div class="content">
    <template v-if="uiFlags.isLoading">
      <loader />
    </template>
    <template v-else>
      <div class="d-flex border-b mb-4 pb-4 justify-space-between">
        <h2 class="">
          {{
            isEditDataObj
              ? $t("merchant.clients.edit")
              : $t("merchant.clients.add_new")
          }}
        </h2>
        <button class="d-flex ga-2 align-center" @click="$router.go(-1)">
          <span>
            {{ $t("global.actions.back") }}
          </span>
          <span class="fa fa-arrow-left"></span>
        </button>
      </div>
      <v-row>
        <!-- data -->
        <v-col
          cols="12"
          md="6"
          v-for="(item, index) in dataObjData"
          :key="index"
        >
          <filed-input
            :label="item.label"
            v-model="dataObj[item.name]"
            :value="dataObj[item.name]"
            :type="item.type"
            :error="v$.dataObj[item.name].$error"
            :error-text="item.errorText"
            @blur="v$.dataObj[item.name].$touch()"
          />
        </v-col>

        <v-col cols="12">
          <img src="/map.png" alt="" />
        </v-col>
        <v-col cols="12">
          <v-checkbox
            v-model="dataObj.is_active"
            :label="$t('global.status.active')"
            :error="v$.dataObj.is_active.$error"
            @blur="v$.dataObj.is_active.$touch()"
            hide-details
          />
        </v-col>

        <v-col cols="12">
          <v-btn
            class="w-100"
            color="primary"
            size="large"
            @click="actionBtn"
            :loading="uiFlags.isCreating || uiFlags.isUpdated"
            :disabled="
              uiFlags.isCreating || uiFlags.isUpdated || v$.dataObj.$error
            "
          >
            {{
              isEditDataObj
                ? $t("global.actions.edit")
                : $t("global.actions.add")
            }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </div>
</template>
<script>
import FiledInput from "@/components/common/FiledInput.vue";
import { mapActions, mapState } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import Loader from "@/components/common/Loader.vue";

import { useClientsMerchantStore } from "@/stores/merchant/clients/clients.merchant.store";

export default {
  components: { FiledInput, Loader },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      dataObj: {
        name: { required },
        email: { required, email },
        address: { required },
        phone: { required },
        location: {
          lat: { required },
          long: { required },
        },
        is_active: { required },
      },
    };
  },
  data() {
    return {
      dataObj: {
        name: null,
        email: null,
        address: null,
        phone: null,
        location: {
          lat: null,
          long: null,
        },
        is_active: null,
      },
    };
  },
  async mounted() {
    if (this.isEditDataObj) {
      const id = this.$route.params.id;
      await this.showClientsMerchant(id);
      this.dataObj = { ...this.record };
    }
  },
  computed: {
    ...mapState(useClientsMerchantStore, ["uiFlags", "record"]),
    isEditDataObj() {
      return this.$route.meta.edit;
    },
    dataObjData() {
      return [
        {
          name: "name",
          type: "text",
          label: this.$t("admin_merchant.fields.name"),
          error: "v$.dataObj.name.$error",
          errorText:
            this.v$.dataObj.name.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.dataObj.name.$touch()",
        },
        {
          name: "email",
          type: "email",
          label: this.$t("admin_merchant.fields.email"),
          error: "v$.dataObj.email.$error",
          errorText:
            (this.v$.dataObj.email.required.$invalid &&
              this.$t("errors.required")) ||
            (this.v$.dataObj.email.email.$invalid && this.$t("errors.email")),
          blur: "v$.dataObj.email.$touch()",
        },
        {
          name: "address",
          type: "text",
          label: this.$t("admin_merchant.fields.address"),
          error: "v$.dataObj.address.$error",
          errorText:
            this.v$.dataObj.address.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.dataObj.address.$touch()",
        },
        {
          name: "phone",
          type: "text",
          label: this.$t("admin_merchant.fields.phone"),
          error: "v$.dataObj.phone.$error",
          errorText:
            this.v$.dataObj.phone.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.dataObj.phone.$touch()",
        },
      ];
    },
  },
  methods: {
    ...mapActions(useClientsMerchantStore, [
      "createClientsMerchant",
      "showClientsMerchant",
      "updateClientsMerchant",
    ]),

    actionBtn() {
      this.getLocation();
      this.v$.$touch();
      if (this.v$.$error) return;
      if (this.isEditDataObj) {
        this.updateClientsMerchant({ ...this.dataObj });
        return;
      } else {
        this.createClientsMerchant({ ...this.dataObj });
      }
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.dataObj.location = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
