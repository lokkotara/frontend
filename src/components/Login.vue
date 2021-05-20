<template>
  <form class="form">
    <label for="lUsername"> Pseudonyme</label>
    <input
      type="text"
      @input="checkUsername"
      @keyup.enter="login"
      v-model="username"
      id="username"
      placeholder="Votre nom d'utilisateur"
      pattern="^[a-zA-Z]{1}[a-zA-Z'À-ÿ -]+$"
      :class="isUserValid ? isUserValid : null"
      required
    />
    <span v-if="userError" class="errorMsg"
      >Le nom d'utilisateur n'a pas le bon format</span
    >
    <label for="Email"> Adresse e-mail</label>
    <input
      type="email"
      @input="checkEmail"
      @keyup.enter="login"
      v-model="email"
      id="email"
      placeholder="Votre adresse mail"
      pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})"
      :class="isEmailValid ? isEmailValid : null"
      required
    />
    <span v-if="emailError" class="errorMsg"
      >L'adresse mail n'a pas le bon format</span
    >
    <span>
      <label for="password"> Mot de passe</label
      ><i :class="isMasked" @click="maskPassword"></i>
    </span>
    <input
      v-model="password"
      @input="checkPassword"
      @keyup.enter="login"
      :type="type"
      id="password"
      pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
      placeholder="Votre mot de passe"
      :class="isPasswordValid ? isPasswordValid : null"
      required
    />
    <span v-if="passwordError" class="errorMsg"
      >Le mot de passe n'a pas le bon format</span
    >
    <input id="submitBtn" type="button" @click="login" value="Se connecter" />
    <span v-if="!isCorrect" class="errorMsg">
      {{ error.error }}{{ errorMsg }}</span
    >
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      message: "",
      error: "",
      username: "",
      email: "",
      password: "",
      type: "password",
      isMasked: "fas fa-eye",
      isValid: null,
    };
  },
  methods: {
    maskPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.isMasked = "fas fa-eye-slash";
      } else {
        this.type = "password";
        this.isMasked = "fas fa-eye";
      }
    },
    checkUsername() {
      let username = document.getElementById("username");
      if (username.validity.valid) {
        this.userError = false;
        this.isUserValid = "valid";
      } else {
        this.userError = true;
        this.isUserValid = "invalid";
      }
    },
    checkEmail() {
      let email = document.getElementById("email");
      if (email.validity.valid) {
        this.emailError = false;
        this.isEmailValid = "valid";
      } else {
        this.emailError = true;
        this.isEmailValid = "invalid";
      }
    },
    checkPassword() {
      let password = document.getElementById("password");
      if (password.validity.valid) {
        this.passwordError = false;
        this.isPasswordValid = "valid";
      } else {
        this.passwordError = true;
        this.isPasswordValid = "invalid";
      }
    },
    async login() {
      let User = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      await axios
        .post("http://localhost:3000/api/auth/login", User)
        .then((res) => {
          if (res.status === 200) {
            sessionStorage.setItem("user", JSON.stringify(res.data));
            this.$router.push("/feed");
            this.$swal.fire({
              toast: true,
              position: "top-end",
              title: "Connecté !",
              text: "Bienvenue",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((e) => {
          this.error = e.response.data;
          if (e.response.status === 401) {
            this.isCorrect = false;
            this.errorMsg = " Veuillez vérifiez vos identifiants";
          } else {
            this.isCorrect = false;
            this.errorMsg = "";
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
