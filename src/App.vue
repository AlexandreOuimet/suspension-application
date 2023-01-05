<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.route"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <strong>{{ item.title }}</strong>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-spacer />
      <v-btn block color="primary" @click="signOut">logout</v-btn>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import router from "@/router";

export default {
  name: "App",

  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-view-dashboard", route: "home" },
      { title: "Sign In", icon: "mdi-login", route: "signIn" },
      { title: "Register", icon: "mdi-account-plus", route: "register" },
    ],
  }),

  methods: {
    async signOut() {
      await signOut(auth);
      router.push("signIn");
    },
  },
};
</script>
