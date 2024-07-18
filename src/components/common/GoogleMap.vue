<template>
  <!-- <GMapAutocomplete
    @place_changed="setPlace"
    :options="{
      types: ['geocode'],
      componentRestrictions: { country: 'sa' },
    }"
    :key="center.lat + center.lng"
  >
    <template #input="slotProps">
      <v-text-field
        v-bind="slotProps"
        ref="input"
        prepend-inner-icon="mdi mdi-map-marker"
        hide-details
        class="mb-4"
      />
    </template>
  </GMapAutocomplete> -->

  <GMapAutocomplete
    placeholder="This is a placeholder"
    @place_changed="setPlace"
    :options="{
      types: ['geocode'],
      componentRestrictions: { country: 'sa' },
    }"
  >
  </GMapAutocomplete>
  <!-- {{ center }} -->
  <GMapMap
    :center="center"
    :zoom="15"
    map-type-id="terrain"
    style="width: 100%; height: 500px"
    ref="google"
    :animation="2"
    :click="true"
    @click="updatePosition($event.latLng.toJSON())"
  >
    <GMapMarker
      v-for="marker in markers"
      :key="marker.lat + marker.lng"
      :position="marker.position"
      :clickable="true"
      :draggable="true"
      icon="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
      :animation="2"
      @dragend="updatePosition($event.latLng.toJSON())"
    />
  </GMapMap>

  <v-btn @click="getLocation" fab color="primary" class="mt-4">
    <v-icon size="24"> mdi mdi-crosshairs-gps</v-icon>
  </v-btn>
</template>
<script>
import { GridAlgorithm } from "@googlemaps/markerclusterer";

export default {
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
    location: {
      type: Object,
      default: () => ({ lat: 51.093048, lng: 6.84212 }),
    },
  },
  data() {
    return {
      algorithm: new GridAlgorithm({}),
      google: null,
      center: { lat: 51.093048, lng: 6.84212 },
      markers: [{ position: { lat: 51.093048, lng: 6.84212 }, count: 1 }],
    };
  },
  mounted() {
    this.getLocation();
    // const loader = new Loader({
    //   apiKey: process.env.VITE_BASE_GOOGLE_KEY,
    //   version: "weekly",
    // });
    // loader.load().then(async () => {
    //   const { Map } = await google.maps.importLibrary("maps");
    //   console.log(Map);
    // });
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
          this.markers = [
            {
              position: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              count: 1,
            },
          ];
        });
      }
    },
    setPlace(place) {
      this.center = place.geometry.location;
      this.markers = [
        {
          position: place.geometry.location,
          count: 1,
        },
      ];
    },
    updatePosition(position) {
      this.center = position;
      this.markers = [
        {
          position,
          count: 1,
        },
      ];
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
</style>
