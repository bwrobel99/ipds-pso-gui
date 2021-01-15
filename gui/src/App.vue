<template>
  <v-app class="app">
    <v-app-bar app color="#121212" dark flat>
      <v-toolbar-title>IPDS</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fill-height fluid>
        <v-row>
          <v-col cols="4">
            <v-navigation-drawer permanent>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Menu?</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-navigation-drawer>
          </v-col>
          <v-col cols="8">
            <g-map />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GMap from "./views/GMap";

export default {
  name: "App",

  components: {
    GMap,
  },

  data: () => ({
    //
  }),

  created() {},
};
</script>

<style>
.app {
  font-family: "Montserrat";
}
</style>
