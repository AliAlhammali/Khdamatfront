<template>
  <div class="position-relative w-100" id="map">
    <l-map
      ref="map"
      :zoom="zoom"
      :center="points"
      :global-leaflet="false"
      :style="styleMap"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker
        :lat-lng="points"
        :update:visible="true"
        :draggable="isEditMode"
        @dragend="updateCenter($event)"
      ></l-marker>
    </l-map>
  </div>
</template>
<script >
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

export default {
  props: {
    center: {
      type: Array,
      default: () => [47.41322, -1.219482],
    },
    style: {
      type: Object,
      default: () => ({}),
    },
    zoom: {
      type: Number,
      default: 16,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      points: this.center,
      address: {
        title: "",
        lat: "",
        long: "",
      },
    };
  },
  mounted() {
    if (this.isEditMode) {
      this.initMapBySearch();
    }
  },
  computed: {
    styleMap() {
      return {
        height: this.style.height || "400px",
        width: this.style.width || "100%",
      };
    },
  },
  methods: {
    updateCenter(event) {
      this.points = [event.target._latlng.lat, event.target._latlng.lng];
      this.findAddressByCoordinates();
    },
    findAddressByCoordinates() {
      const provider = new OpenStreetMapProvider();
      fetch(
        `${provider.searchUrl}?q=${this.points[0]},${this.points[1]}&polygon_geojson=1&format=json`
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
    initMapBySearch() {
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
        this.points = [e.location.y, e.location.x];
        // remove the previous marker
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });
        this.findAddressByCoordinates();
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
