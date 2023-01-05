<template>
  <v-container>
    <v-form @submit.prevent="signIn" ref="form" v-model="valid">
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

      <v-btn type="submit" color="primary" :disabled="!valid">Login</v-btn>
    </v-form>

    <v-snackbar v-model="snackbar" timeout="5000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
      const auth = getAuth();

      await signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // const user = userCredential.user;
          router.push("/home");
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
  },
};
</script>
