<template>
  <div class="position-relative w-100" id="map">
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      :global-leaflet="false"
      :style="styleMap"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker :lat-lng="center"></l-marker>
    </l-map>
  </div>
</template>
<script >
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

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
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 16,
    };
  },
  computed: {
    styleMap() {
      return {
        height: this.style.height || "400px",
        width: this.style.width || "100%",
      };
    },
  },
};
</script>

<style scoped lang="scss">
</style>
