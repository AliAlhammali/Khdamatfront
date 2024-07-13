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
          <!-- <Maps
            :editMode="isEditDataObj"
            :lat="dataObj?.location?.lat"
            :long="dataObj?.location?.long"
            @getLocation="getLocation"
          /> -->
          <GoogleMap />
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
import Loader from "@/components/common/Loader.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapState } from "pinia";

import GoogleMap from "@/components/common/GoogleMap.vue";
import Maps from "@/components/common/Maps.vue";
import { updateToPatchData } from "@/helper/update.inputs.helper";
import { useBranchesMerchantStore } from "@/stores/merchant/branches/branches.merchant.store";

export default {
  components: { FiledInput, Loader, Maps, GoogleMap },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      dataObj: {
        name: { required },
        address: { required },
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
        address: null,
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
      await this.showBranchesMerchant(id);
      this.dataObj = { ...this.record };
    }
  },
  computed: {
    ...mapState(useBranchesMerchantStore, ["uiFlags", "record"]),
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
          name: "address",
          type: "text",
          label: this.$t("admin_merchant.fields.address"),
          error: "v$.dataObj.address.$error",
          errorText:
            this.v$.dataObj.address.required.$invalid &&
            this.$t("errors.required"),
          blur: "v$.dataObj.address.$touch()",
        },
      ];
    },
  },
  methods: {
    ...mapActions(useBranchesMerchantStore, [
      "createBranchesMerchant",
      "showBranchesMerchant",
      "updateBranchesMerchant",
    ]),

    actionBtn() {
      this.v$.$touch();
      if (this.v$.$error) return;
      if (this.isEditDataObj) {
        const data = updateToPatchData(this.dataObj, this.record);
        this.updateBranchesMerchant(this.record.id, data);
        return;
      } else {
        this.createBranchesMerchant({ ...this.dataObj });
      }
    },
    getLocation(address) {
      this.dataObj.address = address.title;
      this.dataObj.location = {
        lat: address.lat,
        long: address.long,
      };
    },
  },
};
</script>
<style lang="scss" scoped></style>
