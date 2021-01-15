<template>
  <div>
    <div class="g-map" ref="googleMap" id="map"></div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  name: "GMap",
  data() {
    return {
      google: null,
      map: null,
      mapCenter: { lat: 50.0622965721804, lng: 19.9374022326302 },
    };
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: "AIzaSyAoD9u0nV6F3O7rtIgafbloUnFDTsgLn6s",
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, {
        center: this.mapCenter,
        zoom: 15,
      });
    },
  },
};
</script>

<style scoped>
.g-map {
  height: 700px;
  width: 700px;
}
</style>
