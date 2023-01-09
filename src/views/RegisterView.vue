<template>
  <v-container class="fill-height align-center justify-center">
    <v-form @submit.prevent="register" ref="form" v-model="valid">
      <v-card-text>
        <v-row>
          <v-text-field label="Name" v-model="name" :rules="nameRules" solo />
        </v-row>

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

        <v-row>
          <v-text-field
            label="Confirm Password"
            type="password"
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
            solo
          />
        </v-row>

        <v-row class="pt-0 align-center">
          <v-btn text x-small @click="forwardToLogin()">Login?</v-btn>
          <v-spacer />
          <v-btn type="submit" color="primary" :disabled="!valid"
            >Register</v-btn
          >
        </v-row>
      </v-card-text>
    </v-form>

    <v-snackbar v-model="snackbar" timeout="5000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm password is required",
        (v) => v === this.password || "Passwords do not match",
      ],
    };
  },
  methods: {
    async register() {
      await createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.updateDisplayName(user);
          router.push("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);

          if (errorCode == "auth/email-already-in-use") {
            console.error("errorCode", errorCode);

            this.snackbarMessage =
              "Il existe déjà un compte avec le même courriel";
            this.snackbar = true;
          }
        });
    },

    async updateDisplayName(user) {
      await updateProfile(user, {
        displayName: this.name,
      }).catch((error) => {
        console.error("Error in updateDisplayName", error);
        this.snackbarMessage = "Une erreur est survenue" + error;
        this.snackbar = true;
      });
    },

    forwardToLogin() {
      router.push("signIn");
    },
  },
};
</script>
