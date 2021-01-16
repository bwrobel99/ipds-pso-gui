<template>
  <v-app class="app">
    <v-app-bar app color="#121212" dark flat>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <span style="font-weight: bold"> IPDS </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fill-height fluid>
        <v-row>
          <v-col cols="3">
            <v-navigation-drawer
              permanent
              class="d-flex flex-row align-center justify-center"
            >
              <v-list-item>
                <v-list-item-content
                  ><span style="font-weight: bold"> Hi!</span> <br />
                  Click on the map to add the delivery points.
                </v-list-item-content>
              </v-list-item>
              <v-form>
                <v-list-item class="mt-10">
                  <v-list-item-content>
                    Use this slider to adjust starting petrol level in litres.
                    <v-slider
                      class="mt-6 px-6"
                      min="1"
                      max="10"
                      thumb-label
                      v-model="petrol"
                    ></v-slider>
                  </v-list-item-content>
                </v-list-item>
                <v-container
                  class="d-flex flex-column align-center justify-center"
                >
                  <v-btn
                    outlined
                    @click="send"
                    :disabled="places.length < 3"
                    :loading="loading"
                  >
                    CALCULATE ROUTE!
                  </v-btn>
                </v-container>
              </v-form>
            </v-navigation-drawer>
          </v-col>
          <v-col cols="5">
            <g-map
              :solution="solution"
              :markerToRemove="marker"
              @places-changed="getPlaces"
            />
          </v-col>
          <v-col cols="4" class="pr-6">
            <v-row
              style="font-weight: bold"
              class="d-flex flex-row align-center pt-2 pb-5 pr-3"
            >
              <v-col> PLACES </v-col>
              <v-btn
                color="error"
                outlined
                @click="removeMarker(places[places.length - 1])"
                v-if="places.length > 0"
              >
                REMOVE LAST
              </v-btn>
            </v-row>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Index</th>
                    <th class="text-left">Coordinates</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="place in places" :key="places.indexOf(place)">
                    <td>{{ places.indexOf(place) + 1 }}</td>
                    <td>{{ place }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-row
              v-if="Object.keys(solution).length > 0"
              class="d-flex flex-row align-center mt-10"
            >
              <v-col cols="12">
                <span style="font-weight: bold"> SOLUTION </span></v-col
              >
              <v-col cols="12">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Value</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Order</td>
                        <td>{{ showOrder() }}</td>
                      </tr>
                      <tr>
                        <td>Delivery time</td>
                        <td>{{ solution.delivery_time }} minutes</td>
                      </tr>
                      <tr>
                        <td>Distance covered</td>
                        <td>{{ solution.km }} km</td>
                      </tr>
                      <tr>
                        <td>Pizza temperature</td>
                        <td>{{ solution.pizza_temperature }} °C</td>
                      </tr>
                      <tr>
                        <td>Fuel used [litres]</td>
                        <td>{{ solution.used_fuel }} litres</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GMap from "./views/GMap";
import axios from "axios";
export default {
  name: "App",

  components: {
    GMap,
  },

  data: () => ({
    places: [],
    marker: [],
    petrol: 1,
    solution: {},
    loading: false,
  }),

  methods: {
    getPlaces(places) {
      this.places = places;
    },
    removeMarker(marker) {
      this.marker = marker;
    },
    showOrder() {
      let strOrder = "1 ";
      for (let idx of this.solution.order) {
        if (idx > 9) {
          strOrder += "ST ";
        } else {
          strOrder += (idx + 1).toString() + " ";
        }
      }
      strOrder += "1";
      return strOrder;
    },
    send() {
      return new Promise((resolve, reject) => {
        this.loading = true;
        axios
          .post("http://localhost:5000/calculate", {
            places: this.places,
            petrol: this.petrol,
          })
          .then((res) => {
            this.loading = false;
            this.solution = res.data;
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap");

#app {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
}
</style>
