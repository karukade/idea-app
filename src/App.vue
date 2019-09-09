<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->

    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>非線形で発想しよう</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-container>
      <v-row>
        <v-col cols="1">
          <a href="http://www.goo.ne.jp/">
            <v-img
              src="//u.xgoo.jp/img/sgoo.png"
              lazy-src="//u.xgoo.jp/img/sgoo.png"
              aspect-ratio="1"
              contain
              alt="supported by goo"
              title="supported by goo"
            ></v-img>
          </a>
        </v-col>
      </v-row>
    </v-container>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  }
};
</script>