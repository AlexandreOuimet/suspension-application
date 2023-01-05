<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <v-card flat>
        <v-card-title v-if="currentUser != null">
          <v-list-item-content class="text-right">
            <v-list-item-title>{{ currentUser.displayName }}</v-list-item-title>
            <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-btn text @click="signOut">LogOut</v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-card-title>

        <v-card-text v-if="currentUser != null">
          <v-list-item to="home" link>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title> Home </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>

        <v-card-text v-else>
          <v-list-item to="signIn" link>
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title> SignIn </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>

        <v-spacer />
      </v-card>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { getCurrentUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import router from "@/router";

export default {
  name: "App",

  data: () => ({
    drawer: null,
    currentUser: null,
    items: [
      { title: "Home", icon: "mdi-view-dashboard", route: "home" },
      { title: "Sign In", icon: "mdi-login", route: "signIn" },
    ],
  }),

  async mounted() {
    this.currentUser = await getCurrentUser();
    console.log(this.currentUser);
  },

  methods: {
    async signOut() {
      await signOut(auth);
      router.push("signIn");
    },
  },
};
</script>
