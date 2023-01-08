<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <v-card flat>
        <v-card-title v-if="currentUser != null">
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{
              currentUser.displayName
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-card-title>

        <v-divider />

        <v-card-text v-if="currentUser != null">
          <v-list>
            <v-list-item to="home" link>
              <v-list-item-icon>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title> Home </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item to="signIn" link>
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title> Logout </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
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
    drawer: true,
    currentUser: null,
    items: [
      { title: "Home", icon: "mdi-view-dashboard", route: "home" },
      { title: "Sign In", icon: "mdi-login", route: "signIn" },
    ],
  }),

  methods: {
    async signOut() {
      await signOut(auth);
      router.push("signIn");
    },

    async openDrawer() {
      this.drawer = !this.drawer;
      this.currentUser = await getCurrentUser();
      console.log(this.currentUser);
    },
  },
};
</script>
