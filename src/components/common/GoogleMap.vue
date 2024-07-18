<template>
  <div :key="editMode" class="w-100">
    <GMapAutocomplete
      class="w-100 border mb-4 pa-2"
      :placeholder="$t('global.actions.search_location_placeholder')"
      @place_changed="setPlace"
      :options="{
        types: ['geocode'],
        componentRestrictions: { country: 'sa' },
      }"
      v-if="!viewMode"
    >
    </GMapAutocomplete>
    <GMapMap
      class="w-100"
      :center="center"
      :zoom="17"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
      ref="google"
      :animation="2"
      :click="!viewMode"
      @click="
        ($event) => {
          if (viewMode) return;
          updatePosition($event.latLng.toJSON());
        }
      "
    >
      <GMapMarker
        :position="center"
        :clickable="!viewMode"
        :draggable="!viewMode"
        icon="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
        :animation="2"
        @dragend="
          ($event) => {
            if (viewMode) return;
            updatePosition($event.latLng.toJSON());
          }
        "
      />
    </GMapMap>

    <v-btn
      v-if="!viewMode"
      @click="getLocation"
      fab
      color="primary"
      class="mt-4"
    >
      <v-icon size="24"> mdi mdi-crosshairs-gps</v-icon>
    </v-btn>

    <!-- move map to center view -->
  </div>
</template>
<script>
import { OpenStreetMapProvider } from "leaflet-geosearch";

export default {
  props: {
    viewMode: {
      type: Boolean,
      default: false,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
    mapLocation: {
      type: Object,
      default: () => ({ lat: 51.093048, lng: 6.84212 }),
    },
  },
  data() {
    return {
      google: null,
      center: { lat: 51.093048, lng: 6.84212 },
      // markers: [{ position: { lat: 51.093048, lng: 6.84212 }, count: 1 }],
    };
  },
  async mounted() {
    if (this.editMode) {
      console.log(
        this.mapLocation.coordinates,
        "this.mapLocation.coordinates ",
      );
      if (this.mapLocation.coordinates && this.mapLocation.coordinates.length) {
        this.center = {
          lat: this.mapLocation.coordinates[0],
          lng: this.mapLocation.coordinates[1],
        };
      } else {
        this.center = {
          lat: this.mapLocation.lat,
          lng: this.mapLocation.long,
        };
      }
    } else {
      this.getLocation();
    }
  },

  methods: {
    renderer: ({ count, position }) =>
      new this.google.maps.Marker({
        label: {
          text: String(count),
          color: "white",
          fontSize: "10px",
        },
        position,
        // adjust zIndex to be above other markers
        zIndex: Number(this.google.maps.Marker.MAX_ZINDEX) + count,
      }),
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // set lat and long in mapLocation
          this.findAddressByCoordinates();
        });
      }
    },
    setPlace(place) {
      this.center = place.geometry.location;

      this.$emit("getLocation", {
        title: place.formatted_address,
        lat: place.geometry.location.lat(),
        long: place.geometry.location.lng(),
      });
    },
    updatePosition(position) {
      this.center = position;
      this.findAddressByCoordinates();
    },
    findAddressByCoordinates() {
      const provider = new OpenStreetMapProvider();
      fetch(
        `${provider.searchUrl}?q=${this.center.lat},${this.center.lng}&polygon_geojson=1&format=json`,
      )
        .then((response) => response.json())
        .then((data) => {
          const address = {
            title: data[0]?.display_name,
            lat: +data[0]?.lat,
            long: +data[0]?.lon,
          };
          this.$emit("getLocation", address);
        });
    },
  },
  watch: {
    mapLocation: {
      handler(val) {
        if (!val) return;
        if (val.coordinates && val.coordinates.length) {
          this.center = {
            lat: val.coordinates[0],
            lng: val.coordinates[1],
          };
        } else {
          this.center = {
            lat: val.lat,
            lng: val.long,
          };
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.pac-item {
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
  span {
    font-size: 16px;
  }
}

.pac-container {
  z-index: 9999999999999999999999 !important;
}
</style>
