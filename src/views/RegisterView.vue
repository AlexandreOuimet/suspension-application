<template>
  <v-container>
    <v-form @submit.prevent="register" ref="form" v-model="valid">
      <v-text-field label="Name" v-model="name" :rules="nameRules" />
      <v-text-field
        label="Email"
        type="email"
        v-model="email"
        :rules="emailRules"
      />
      <v-text-field
        label="Password"
        type="password"
        v-model="password"
        :rules="passwordRules"
      />
      <v-text-field
        label="Confirm Password"
        type="password"
        v-model="confirmPassword"
        :rules="confirmPasswordRules"
      />
      <v-btn type="submit" color="primary" :disabled="!valid">Register</v-btn>
    </v-form>

    <v-snackbar v-model="snackbar" timeout="5000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
      const auth = getAuth();

      await createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // const user = userCredential.user;
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
  },
};
</script>
