<template>
  <div class="content">
    <template v-if="uiFlags.isLoading">
      <loader />
    </template>
    <template v-else>
      <div class="d-flex border-b mb-4 pb-4 justify-space-between">
        <h2 class="">
          {{
            isEditMerchant
              ? $t("admin_services.edit_title_service")
              : $t("admin_services.add_title_service")
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
        <v-col md="6" cols="12">
          <filed-input
            :label="$t('admin_categories.fields.title_ar')"
            v-model="merchant.title.ar"
            :value="merchant.title.ar"
            type="text"
            :error="v$.merchant.title.ar.$error"
            :error-text="
              v$.merchant.title.ar.required.$invalid && $t('errors.required')
            "
            @blur="v$.merchant.title.ar.$touch()"
          />
        </v-col>

        <v-col md="6" cols="12">
          <filed-input
            :label="$t('admin_categories.fields.title_en')"
            v-model="merchant.title.en"
            :value="merchant.title.en"
            type="text"
            :error="v$.merchant.title.en.$error"
            :error-text="
              v$.merchant.title.en.required.$invalid && $t('errors.required')
            "
            @blur="v$.merchant.title.en.$touch()"
          />
        </v-col>

        <v-col cols="12" md="6" v-if="!isEditMerchant">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            <span> {{ $t("admin_categories.fields.merchant_id") }}</span>
            <span class="text-red">*</span>
          </p>
          <v-select
            v-model="merchant.merchant_id"
            :placeholder="$t('admin_categories.fields.merchant_id')"
            :items="merchants?.data"
            item-text="name"
            item-value="id"
            menu-icon="mdi mdi-chevron-down"
            class="w-100"
            outlined
            :error="
              v$.merchant.merchant_id.$dirty &&
              v$.merchant.merchant_id.required.$invalid
            "
            :no-data-text="$t('global.actions.no_data')"
            @blur="v$.merchant.merchant_id.$touch()"
            @update:model-value="
              () => {
                getCategoriesAdmin({
                  'filter[merchant_id]': merchant.merchant_id,
                  'filter[isParent]': 1,
                  listing: 1,
                });
                this.merchant.main_category_id = null;
                this.v$.merchant.main_category_id.$reset();
              }
            "
          />

          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="
              v$.merchant.merchant_id.$dirty &&
              v$.merchant.merchant_id.required.$invalid
            "
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>



        <v-col cols="12" md="6">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            <span> {{ $t("admin_navbar_links.categories") }}</span>
            <span class="text-red">*</span>
          </p>
          <v-select
            v-model="merchant.main_category_id"
            :placeholder="$t('admin_navbar_links.categories')"
            :items="categoryList"
            :item-title="'title'"
            :item-value="'id'"
            outlined
            menu-icon="mdi mdi-chevron-down"
            class="text-capitalize rounded-xl"
            :disabled="merchant.merchant_id == null"
            @blur="v$.merchant.main_category_id.$touch()"
            :error="
              v$.merchant.main_category_id.$dirty &&
              v$.merchant.main_category_id.required.$invalid
            "
            hide-details
            :no-data-text="$t('global.actions.no_data')"
            @update:model-value="
              () => {
                getSubCategoriesAdmin({
                  'filter[parent_id]': merchant.main_category_id,
                  listing: 1,
                });
                this.merchant.category_id = null;
                this.v$.merchant.category_id.$reset();
              }
            "

          />
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="
              v$.merchant.main_category_id.$dirty &&
              v$.merchant.main_category_id.required.$invalid
            "
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            <span> {{ $t("admin_categories.sub_categories") }}</span>
            <span class="text-red">*</span>
          </p>
          <v-select
            v-model="merchant.category_id"
            :placeholder="$t('admin_categories.sub_categories')"
            :items="subCategoryList"
            :item-title="'title'"
            :item-value="'id'"
            outlined
            menu-icon="mdi mdi-chevron-down"
            class="text-capitalize rounded-xl"
            @blur="v$.merchant.category_id.$touch()"
            :error="
              v$.merchant.category_id.$dirty &&
              v$.merchant.category_id.required.$invalid
            "
            hide-details
            :no-data-text="$t('global.actions.no_data')"
            :disabled="merchant.main_category_id == null"
          />
          <p
            class="text-error mt-2 d-flex ga-2 align-center"
            v-if="
              v$.merchant.category_id.$dirty &&
              v$.merchant.category_id.required.$invalid
            "
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>

        <v-col md="6" cols="12">
          <filed-input
              :label="$t('admin_services.fields.cost_price')"
              v-model="merchant.cost_price"
              :value="merchant.cost_price"
              type="text"
              :error="v$.merchant.cost_price.$error"
              :error-text="
              v$.merchant.cost_price.required.$invalid && $t('errors.required')
            "
              @blur="v$.merchant.cost_price.$touch()"
          />
        </v-col>

        <v-col md="6" cols="12">
          <filed-input
              :label="$t('admin_services.fields.sp_price')"
              v-model="merchant.sp_price"
              :value="merchant.sp_price"
              type="text"
              :error="v$.merchant.sp_price.$error"
              :error-text="
              v$.merchant.sp_price.required.$invalid && $t('errors.required')
            "
              @blur="v$.merchant.sp_price.$touch()"
          />
        </v-col>

        <v-col md="6" cols="12">
          <filed-input
              :label="$t('admin_services.fields.price')"
              v-model="merchant.price"
              :value="merchant.price"
              type="text"
              :error="v$.merchant.price.$error"
              :error-text="
              v$.merchant.price.required.$invalid && $t('errors.required')
            "
              @blur="v$.merchant.price.$touch()"
          />
        </v-col>
        <v-col cols="12" md="6">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            <span> {{ $t("admin_merchant.fields.status") }}</span>
            <span class="text-red">*</span>
          </p>
          <v-select
              v-model="merchant.status"
              :placeholder="$t('admin_merchant.fields.status')"
              :items="listStatus"
              :item-title="'text'"
              :item-value="'value'"
              outlined
              menu-icon="mdi mdi-chevron-down"
              class="text-capitalize rounded-xl"
              @blur="v$.merchant.status.$touch()"
              :error="
              v$.merchant.status.$dirty && v$.merchant.status.required.$invalid
            "
              hide-details
              :no-data-text="$t('global.actions.no_data')"
          />
          <p
              class="text-error mt-2 d-flex ga-2 align-center"
              v-if="
              v$.merchant.status.$dirty && v$.merchant.status.required.$invalid
            "
          >
            <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
            <span>{{ $t("errors.required") }}</span>
          </p>
        </v-col>
        <v-col cols="12">
          <v-btn
            class="w-100"
            color="primary"
            size="large"
            @click="actionBtn"
            :loading="uiFlags.isCreating || uiFlags.isUpdated"
            :disabled="
              uiFlags.isCreating || uiFlags.isUpdated || v$.merchant.$error
            "
          >
            {{
              isEditMerchant
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
import { required } from "@vuelidate/validators";
import { useMerchantAdminStore } from "@/stores/admin/merchant/merchant.admin.store";
import { useServicesAdminStore } from "@/stores/admin/services/services.admin.store";

import Loader from "@/components/common/Loader.vue";
import { useCategoriesAdminStore } from "@/stores/admin/categories/categories.admin.store";
import { updateToPatchData } from "@/helper/update.inputs.helper";

export default {
  components: { FiledInput, Loader },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      merchant: {
        title: {
          ar: { required },
          en: { required },
        },
        merchant_id: { required },
        main_category_id: { required },
        category_id: { required },
        status: { required },
        cost_price: { required },
        sp_price: { required },
        price: { required },
      },
    };
  },
  data() {
    return {
      merchant: {
        title: {
          ar: "",
          en: "",
        },

        status: null,
        merchant_id: null,
        main_category_id: null,
        category_id: null,
        sp_price: null,
        cost_price: null,
        price: null,
      },
      listStatus: [
        {
          text: this.$t("global.status.active"),
          value: "active",
        },
        {
          text: this.$t("global.status.inactive"),
          value: "inactive",
        },
      ],
    };
  },
  async mounted() {
    if (this.isEditMerchant) {
      const id = this.$route.params.id;
      await this.showServicesAdmin(id);
      await this.getSubCategoriesAdmin({
        "filter[parent_id]": this.record.main_category_id,
        listing: 1,
      });
      this.merchant = { ...this.record };
      this.merchant.title = { ...this.record.title };
      this.merchant.category_id = this.record.category_id;
      this.merchant.sp_price = this.record.sp_price;
      this.merchant.cost_price = this.record.cost_price;
      this.merchant.price = this.record.price;
    }
    if (this.$route.query?.merchant_id) {
      this.merchant.merchant_id = +this.$route.query.merchant_id;
    }
    await this.getMerchantAdmin({
      listing: 1,
    });
    await this.getCategoriesAdmin({ "filter[isParent]": 1, listing: 1 });
  },
  computed: {
    ...mapState(useMerchantAdminStore, {
      merchants: "records",
      merchantsUiFlags: "uiFlags",
    }),
    ...mapState(useServicesAdminStore, ["uiFlags", "record"]),
    ...mapState(useCategoriesAdminStore, {
      categories: "records",
      categoriesUiFlags: "uiFlags",
      subCategories: "subCategories",
      uiFlagsSub: "uiFlagsSub",
    }),

    isEditMerchant() {
      return this.$route.name === "admin-service-edit";
    },
    categoryList() {
      return this.categories?.data?.map((item) => {
        return {
          ...item,
          title: item.title[this.$i18n.locale],
        };
      });
    },
    subCategoryList() {
      return this.subCategories?.map((item) => {
        return {
          ...item,
          title: item.title[this.$i18n.locale],
        };
      });
    },
  },
  methods: {
    ...mapActions(useServicesAdminStore, [
      "createServicesAdmin",
      "showServicesAdmin",
      "updateServicesAdmin",
    ]),
    ...mapActions(useMerchantAdminStore, ["getMerchantAdmin"]),
    ...mapActions(useCategoriesAdminStore, [
      "getCategoriesAdmin",
      "getSubCategoriesAdmin",
    ]),
    actionBtn() {
      this.v$.$touch();
      if (this.v$.$error) return;
      if (this.isEditMerchant) {
        const data = updateToPatchData(this.merchant, this.record);
        this.updateServicesAdmin(this.record.id, data);
        return;
      } else {
        this.createServicesAdmin({ ...this.merchant });
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
