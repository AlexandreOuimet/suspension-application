<template>
  <v-card class="d-flex align-center justify-center" flat>
    <v-form @submit.prevent="signIn" ref="form" v-model="valid">
      <v-card-text>
        <v-row>
          <v-text-field
            label="Email"
            type="email"
            v-model="email"
            :rules="emailRules"
            solo
          />
        </v-row>
        <v-row>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            :rules="passwordRules"
            solo
          />
        </v-row>

        <v-row class="pt-0 align-center">
          <v-btn text x-small @click="forwardToRegister()"
            >Need an account?</v-btn
          >
          <v-spacer />
          <v-btn type="submit" color="primary" :disabled="!valid">Login</v-btn>
        </v-row>
      </v-card-text>
    </v-form>

    <v-snackbar v-model="snackbar" timeout="5000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-card>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import router from "@/router";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      valid: false,
      snackbar: false,
      snackbarMessage: null,
      emailRules: [(v) => !!v || "Email is required"],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },

  methods: {
    async signIn() {
      await signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          router.push("home");
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);

          if (errorCode == "auth/wrong-password") {
            this.snackbarMessage = "User or password incorrect.";
            this.snackbar = true;
          }
        });
    },

    forwardToRegister() {
      router.push("register");
    },
  },
};
</script>
