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
              ? $t("admin_categories.edit_title_category")
              : $t("admin_categories.add_title_category")
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
            item-title="name"
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
            clearable
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

        <v-col cols="12" md="6" v-if="!isEditMerchant">
          <p class="d-flex align-center ga-2 mb-3 filed__label">
            <span> {{ $t("admin_navbar_links.categories") }}</span>
          </p>
          <v-select
            v-model="merchant.parent_id"
            :placeholder="$t('admin_navbar_links.categories')"
            :items="categoryList"
            :item-title="'title'"
            :item-value="'id'"
            outlined
            menu-icon="mdi mdi-chevron-down"
            class="text-capitalize rounded-xl"
            hide-details
            clearable
            :no-data-text="$t('global.actions.no_data')"
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
import { useCategoriesAdminStore } from "@/stores/admin/categories/categories.admin.store";
import Loader from "@/components/common/Loader.vue";
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
        status: { required },
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
        parent_id: null,
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
      await this.showCategoriesAdmin(id);
      this.merchant = { ...this.record };
      this.merchant.title = {
        ar: this.record.title.ar,
        en: this.record.title.en,
      };
      this.merchant.parent_id = this.record?.parent?.id;
    }

    await this.getCategoriesAdmin({ "filter[isParent]": 1, listing: 1 });
    await this.getMerchantAdmin({
      listing: 1,
    });
  },
  computed: {
    ...mapState(useMerchantAdminStore, {
      merchants: "records",
      merchantsUiFlags: "uiFlags",
    }),
    ...mapState(useCategoriesAdminStore, ["uiFlags", "record", "records"]),
    isEditMerchant() {
      return this.$route.name === "admin-categories-edit";
    },
    categoryList() {
      const isEditList = this.isEditMerchant
        ? this.records?.data?.filter((item) => item.id !== this.record.id)
        : this.records?.data;
      return isEditList?.map((item) => {
        return {
          ...item,
          title: item.title[this.$i18n.locale],
        };
      });
    },
  },
  methods: {
    ...mapActions(useCategoriesAdminStore, [
      "createCategoriesAdmin",
      "showCategoriesAdmin",
      "updateCategoriesAdmin",
      "getCategoriesAdmin",
    ]),
    ...mapActions(useMerchantAdminStore, ["getMerchantAdmin"]),

    actionBtn() {
      this.v$.$touch();
      if (this.v$.$error) return;
      if (this.isEditMerchant) {
        const data = updateToPatchData(this.merchant, this.record);
        this.updateCategoriesAdmin(this.record.id, data);
        return;
      } else {
        this.createCategoriesAdmin({ ...this.merchant });
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
