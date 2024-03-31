<template>
  <div class="table">
  
    <v-data-table
      :items-per-page="meta.perPage"
      v-model="selected"
      show-select
      select-all
      select-strategy="all"
      :headers="headers"
      :items="items"
      item-value="id"
      hide-default-footer
      sort-asc-icon="mdi mdi-chevron-up mdi-24px"
      sort-desc-icon="mdi mdi-chevron-down mdi-24px"
      color="primary"
      v-model:sort-by="sortBy"
      :must-sort="true"
      :loading="isLoading"
      @click:row="rowClick"
    >
      <template v-for="col in slotsItems" #[`item.${col}`]="value">
        <slot :name="col" :item="value"></slot>
      </template>

      <template #no-data>
        <div>
          <p>
            {{ $t("global.table.noData") }}
          </p>
        </div>
      </template>
      <template v-slot:loading>
        <v-progress-circular color="primary" indeterminate />
      </template>
      <template v-slot:bottom>
        <div class="d-flex mt-4 justify-space-between">
          <div class="d-flex ga-4 align-center">
            <span>{{ $t("global.table.show") }}</span>
            <v-select
              variant="outline"
              v-model="meta.perPage"
              :items="itemsPages"
              @update:modelValue="onSelect"
              hide-details
              hide-spin-buttons
              menu-icon="mdi mdi-chevron-down"
              class="select_page_table max-h"
            />
          </div>
          <div>
            <v-pagination
              v-model="meta.currentPage"
              class="max-h"
              :length="meta.lastPage"
              rounded="circle"
              :total-visible="totalVisible"
              size="36px"
              @update:modelValue="changePageNumber($event)"
              first-icon="mdi mdi-chevron-double-left"
              last-icon="mdi mdi-chevron-double-right"
            >
              <template #next>
                <button
                  @click="changePage('next')"
                  class="d-flex align-center ga-2"
                  :disabled="meta.currentPage === meta.lastPage"
                >
                  <span>{{ $t("global.table.next") }}</span>
                  <span>
                    <span class="mdi mdi-36px mdi-chevron-right"></span>
                  </span>
                </button>
              </template>
              <template #prev>
                <button
                  @click="changePage('prev')"
                  class="d-flex align-center ga-2"
                  :disabled="meta.currentPage === 1"
                >
                  <span>
                    <span class="mdi mdi-36px mdi-chevron-left"></span>
                  </span>
                  <span>{{ $t("global.table.previous") }}</span>
                </button>
              </template>
            </v-pagination>
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    headers: {
      type: Array,
      default: [],
    },
    items: {
      type: Array,
      default: [],
    },
    slotsItems: {
      type: Array,
      default: [],
    },
    meta: {
      type: Object,
      default: () => ({}),
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      sortBy: [{ key: "name", order: "asc" }],
      search: "",
      pagination: {},
      selected: [],
      sortDesc: false,
      itemsPages: [10, 20, 50, 100],
    };
  },
  mounted() {},
  computed: {
    totalVisible() {
      return this.meta.lastPage > 5 ? 5 : this.meta.lastPage;
    },
  },
  methods: {
    onSelect() {
      this.$emit("changePerPage", this.meta.perPage);
    },
    changePage(event) {
      if (event === "next") {
        if (this.meta.currentPage < this.meta.lastPage) this.meta.currentPage++;
      } else {
        if (this.meta.currentPage > 1) this.meta.currentPage--;
      }
      this.$emit("changePage", this.meta.currentPage);
    },
    rowClick(event, row) {
      this.$emit("rowClick", row.item);
    },
    searchItems() {
      this.$emit("search", this.search);
    },
    changePageNumber(page) {
      this.$emit("changePage", page);
    },
    searchByEnter(event) {
      event.preventDefault();
      if (event.key === "Enter") {
        this.searchItems();
      }
    },
  },
};
</script>
<style lang="scss">
.table {
  border-radius: 16px;
  padding: 16px;
  background-color: $white;
  &__head {
    padding: 16px;
    border-radius: 16px;
    background: #f8fafb;
    &__search {
      background-color: $white;
      border-radius: 16px;
      min-width: 380px;
      input {
        padding: 16px;
      }
    }
  }
}

.v-data-table-progress {
  display: none !important;
}

.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  border: none !important;
}

.v-table .v-table__wrapper > table > tbody > tr:nth-child(odd) {
  background-color: #f8fafb;
}

.v-selection-control,
.v-selection-control--disabled .v-selection-control__input > .v-icon,
.v-selection-control--dirty .v-selection-control__input > .v-icon,
.v-selection-control--error .v-selection-control__input > .v-icon {
  color: $primary !important;
}

.v-data-table__td.v-data-table__th {
  border: none !important;
  white-space: nowrap;
}

.v-data-table__td {
  white-space: nowrap;
}

.select_page_table {
  background: #fafafa;
  border-radius: 8px;
}

.max-h {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-pagination__list {
  display: flex;
  justify-content: center;
  align-items: center;

  .v-pagination__item.v-pagination__item--is-active {
    button {
      background-color: $primary !important;
      color: $white;
    }
  }
}

// .v-table .v-table__wrapper > table > tbody > tr > td:first-child {
// 	// border-radius: 0 16px 16px 0;
// }
// .v-table .v-table__wrapper > table > tbody > tr > td:last-child {
// 	// border-radius: 16px 0 0 16px;
// }
// .v-table .v-table__wrapper > table > tbody > tr {
// 	// border-radius: 16px !important;
// }

// .v-table .v-table__wrapper > table > tbody > tr:hover td {
// 	background-color: #ebfaf7 !important;
// }
// .v-table tbody tr.v-data-table__selected {
// 	background: #f5f5f5;
// }
</style>