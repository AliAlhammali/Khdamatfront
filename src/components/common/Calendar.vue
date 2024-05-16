<template>
  <div class="bg-white rounded-lg border pa-4">
    <FullCalendar :options="calendarOptions"> </FullCalendar>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import arLocale from "@fullcalendar/core/locales/ar";
import enLocale from "@fullcalendar/core/locales/en-gb";
import momentPlugin from "@fullcalendar/moment";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data: function () {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          momentPlugin,
        ],
        initialView: "dayGridMonth",
        weekends: true,
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        events: [],
        titleFormat: "YYYY-MM-DD",

        views: {
          dayGridMonth: {
            titleFormat: { year: "numeric", month: "long" },
          },
          dayGridWeek: {
            titleFormat: { year: "numeric", month: "long", day: "numeric" },
          },
          timeGrid: {
            titleFormat: { year: "numeric", month: "long", day: "numeric" },
          },
        },

        locales: [enLocale, arLocale],
        locale: "ar",
      },
    };
  },
  mounted() {
    this.calendarOptions.events = this.items;
  },
  watch: {
    items: {
      handler: function (newVal) {
        this.calendarOptions.events = this.items;
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" >
.fc-button.fc-button-primary {
  color: $white !important;
  background: $primary !important;
  border: none !important;
}
.fc-button-group {
  button {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: none !important;
  }
}

.fc .fc-button .fc-icon {
  vertical-align: unset !important;
}
</style>

