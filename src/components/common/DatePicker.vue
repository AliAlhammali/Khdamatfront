<template>
  <div>
    <VueDatePicker
      auto-apply
      v-model="date"
      :locale="$i18n.locale"
      :space-confirm="false"
      dir="ltr"
      :input-class-name="
        $i18n.locale == 'ar' ? 'dp-input dp-input-ar' : 'dp-input'
      "
      calendar-cell-class-name="dp-custom-cell"
      :format="format"
      :disabled="disabled"
      :format-locale="$i18n.locale == 'ar' ? arSA : enUS"
      @update:model-value="handleDate"
    />
  </div>
</template>
<script>
import moment from "moment";
import { arSA, enUS } from "date-fns/locale";

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    editDate: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      date: new Date(),
      arSA,
      enUS,
    };
  },
  mounted() {
    this.handleDate(this.date);
    if (this.editDate) {
      this.date = new Date(this.editDate);
    }
  },
  computed: {
    format() {
      return moment(this.date).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  methods: {
    handleDate(date) {
      const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
      this.$emit("handleDate", formattedDate);
    },
  },
};
</script>
<style lang="scss">
.dp-input {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: right;
  padding-right: 10px;
  border-radius: 4px;
}

.dp__clear_icon {
  display: none !important;
}

.dp-custom-cell {
  // border-radius: 50%;
  &.dp__active_date {
    background-color: $primary;
  }
  &.dp__today {
    border: 1px solid $primary;
  }
}

.dp__range_start {
  border-end-end-radius: 0 !important;
  border-start-end-radius: 0 !important;
}

.dp-custom-cell.dp__today {
  border: none !important;
}

.dp__calendar_header_item {
  min-width: max-content;
}

::v-deep {
  .--dp-menu-width {
    min-width: 320px;
  }
}
</style>
