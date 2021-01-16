<template>
  <div>
    <div class="g-map" ref="googleMap" id="map"></div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  name: "GMap",
  props: {
    markerToRemove: Array,
    solution: {},
  },
  data() {
    return {
      google: null,
      map: null,
      mapCenter: { lat: 50.0622965721804, lng: 19.9374022326302 },
      places: [],
      markers: [],
      num: 0,
    };
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: "AIzaSyAoD9u0nV6F3O7rtIgafbloUnFDTsgLn6s",
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  watch: {
    places(val) {
      this.$emit("places-changed", val);
    },
    markerToRemove(val) {
      let marker = this.markers.find((m) => {
        return m.position.lat() == val[0] && m.position.lng() == val[1];
      });
      marker.setMap(null);
      let idx = this.places.indexOf(val);
      this.places.splice(idx, 1);
      this.num = idx;
    },
    solution(val) {
      this.draw(val.order, val.petrol_locations);
    },
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, {
        center: this.mapCenter,
        zoom: 15,
      });
      this.map.addListener("click", (mapsMouseEvent) => {
        this.places.push([
          mapsMouseEvent.latLng.toJSON()["lat"],
          mapsMouseEvent.latLng.toJSON()["lng"],
        ]);
        let map = this.map;
        this.markers.push(
          new this.google.maps.Marker({
            position: mapsMouseEvent.latLng,
            map,
            label: this.places.length.toString(),
            title: "Marker",
          })
        );
      });
    },
    draw(order, petrol) {
      let sol = [];
      let map = this.map;
      for (let idx of order) {
        if (idx > 9) {
          sol.push({
            lat: petrol[idx - 10][0],
            lng: petrol[idx - 10][1],
          });
          this.markers.push(
            new this.google.maps.Marker({
              position: {
                lat: petrol[idx - 10][0],
                lng: petrol[idx - 10][1],
              },
              map,
              label: "ST",
              title: "Marker",
            })
          );
        } else {
          sol.push({
            lat: this.places[idx][0],
            lng: this.places[idx][1],
          });
        }
      }
      sol.unshift({
        lat: this.places[0][0],
        lng: this.places[0][1],
      });
      sol.push({
        lat: this.places[0][0],
        lng: this.places[0][1],
      });
      const flightPlanCoordinates = sol;
      const flightPath = new this.google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      flightPath.setMap(this.map);
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
