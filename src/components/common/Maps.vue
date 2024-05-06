<template>
  <div class="position-relative" id="map">
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      :global-leaflet="false"
      style="height: 400px"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker
        :lat-lng="center"
        :update:visible="true"
        draggable
        @dragend="updateCenter($event)"
      ></l-marker>
    </l-map>
  </div>
  <v-btn @click="getLocation" fab color="primary" class="mt-4">
    <v-icon size="24"> mdi mdi-crosshairs-gps</v-icon>
  </v-btn>
</template>
<script >
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";

export default {
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
    lat: {
      type: Number,
      default: null,
    },
    long: {
      type: Number,
      default: null,
    },
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      center: [47.41322, -1.219482],
      zoom: 14,
      address: {
        title: "",
        lat: null,
        long: null,
      },
    };
  },
  mounted() {
    this.initSearch();
    if (this.editMode) {
      this.center = [this.lat, this.long];
    } else {
      this.getLocation();
    }
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = [position.coords.latitude, position.coords.longitude];
          this.findAddressByCoordinates();
        });
      }
    },
    updateCenter(event) {
      this.center = [event.target._latlng.lat, event.target._latlng.lng];
      this.findAddressByCoordinates();
    },
    searchLocation(text) {
      const provider = new OpenStreetMapProvider();
      provider.search({ query: text }).then((results) => {
        const findAddress = results.find((result) =>
          result.label.includes(text)
        );
        this.address = {
          title: findAddress?.raw?.display_name || findAddress?.label,
          lat: findAddress?.raw?.lat || findAddress?.y,
          long: findAddress?.raw?.lon || findAddress?.x,
        };
        this.$emit("getLocation", this.address);
      });
    },
    initSearch() {
      const provider = new OpenStreetMapProvider({
        params: {
          countrycodes: "SA",
        },
      });
      const searchControl = new GeoSearchControl({
        provider: provider,
        notFoundMessage: "Sorry, that address could not be found.",
        searchLabel: "البحث",
        style: "bar",
      });
      const map = new L.Map("map");
      map.addControl(searchControl);
      map.on("geosearch/showlocation", (e) => {
        this.center = [e.location.y, e.location.x];
        // remove the previous marker
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });
        this.findAddressByCoordinates();
      });
    },
    findAddressByCoordinates() {
      const provider = new OpenStreetMapProvider();
      fetch(
        `${provider.searchUrl}?q=${this.center[0]},${this.center[1]}&polygon_geojson=1&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          this.address = {
            title: data[0]?.display_name,
            lat: data[0]?.lat,
            long: data[0]?.lon,
          };
          this.$emit("getLocation", this.address);
        });
    },
  },
  watch: {
    center: {
      handler() {
        // if center changed, move the marker
        this.findAddressByCoordinates();
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
</style>
