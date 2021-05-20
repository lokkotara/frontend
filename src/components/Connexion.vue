<template>
  <section class="rightPart">
    <header>
      <div @click="showSignup" id="signup" :class="{ isFocused: !onLogin }">
        <h3>Inscription</h3>
      </div>
      <div @click="showLogin" id="login" :class="{ isFocused: onLogin }">
        <h3>Connexion</h3>
      </div>
    </header>
    <div id="displayForm">
      <form class="form">
        <template id="connexion" v-if="this.onLogin == true">
          <label for="lUsername"> Pseudonyme</label>
          <input
            type="text"
            @input="checkLUsername"
            @keyup.enter="login"
            v-model="lUsername"
            id="lUsername"
            placeholder="Votre nom d'utilisateur"
            pattern="^[a-zA-Z]{1}[a-zA-Z'À-ÿ -]+$"
            :class="isLUserValid ? isLUserValid : null"
            required
          />
          <span v-if="lUserError" class="errorMsg"
            >Le nom d'utilisateur n'a pas le bon format</span
          >
          <label for="lEmail"> Adresse e-mail</label>
          <input
            type="email"
            @input="checkLEmail"
            @keyup.enter="login"
            v-model="lEmail"
            id="lEmail"
            placeholder="Votre adresse mail"
            pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})"
            :class="isLEmailValid ? isLEmailValid : null"
            required
          />
          <span v-if="lEmailError" class="errorMsg"
            >L'adresse mail n'a pas le bon format</span
          >
          <span>
            <label for="lPassword"> Mot de passe</label
            ><i :class="isMasked" @click="maskPassword"></i>
          </span>
          <input
            v-model="lPassword"
            @input="checkLPassword"
            @keyup.enter="login"
            :type="type"
            id="lPassword"
            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
            placeholder="Votre mot de passe"
            :class="isLPasswordValid ? isLPasswordValid : null"
            required
          />
          <span v-if="lPasswordError" class="errorMsg"
            >Le mot de passe n'a pas le bon format</span
          >
          <input
            id="submitBtn"
            type="button"
            @click="login"
            value="Se connecter"
          />
          <span v-if="!isCorrect" class="errorMsg">
            {{ error.error }}{{ lErrorMsg }}</span
          >
        </template>
        <template id="inscription" v-else>
          <label for="username"> Pseudonyme </label>
          <input
            type="text"
            @input="checkRUsername"
            @keyup.enter="signup"
            v-model="rUsername"
            id="rUsername"
            placeholder="Votre nom d'utilisateur"
            pattern="^[a-zA-Z]{1}[a-zA-Z'À-ÿ -]+$"
            :class="isRUserValid ? isRUserValid : null"
            required
          />
          <span v-if="rUserError" class="errorMsg"
            >Ne doit contenir que des lettres et être unique</span
          >
          <label for="email"> Adresse e-mail</label>
          <input
            type="email"
            @input="checkREmail"
            @keyup.enter="signup"
            v-model="rEmail"
            id="rEmail"
            placeholder="Votre adresse mail"
            pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})"
            :class="isREmailValid ? isREmailValid : null"
            required
          />
          <span v-if="rEmailError" class="errorMsg"
            >Doit respecter le format email et être unique</span
          >
          <span>
            <label for="password"> Mot de passe</label
            ><i :class="isMasked" @click="maskPassword"></i>
          </span>
          <input
            v-model="rPassword"
            @input="checkRPassword"
            @keyup.enter="signup"
            :type="type"
            id="rPassword"
            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
            placeholder="Votre mot de passe"
            :class="isRPasswordValid ? isRPasswordValid : null"
            required
          />
          <span v-if="rPasswordError" class="errorMsg"
            >Doit contenir au moins 8 caractères, dont un chiffre, une majuscule
            et une minuscule</span
          >
          <span v-if="!isCorrect" class="errorMsg">{{ rErrorMsg }}</span>
          <input
            id="submitBtn"
            type="button"
            @click="signup"
            value="S'inscrire"
          />
          <span class="errorMsg">{{ message }}</span>
        </template>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      message: "",
      error: "",
      onLogin: true,
      lUserError: false,
      lEmailError: false,
      lPasswordError: false,
      rUsername: "",
      lUsername: "",
      rEmail: "",
      lEmail: "",
      rPassword: "",
      lPassword: "",
      image: "",
      type: "password",
      isMasked: "fas fa-eye",
      isValid: null,
      isRUserValid: null,
      isLUserValid: null,
      isLEmailValid: null,
      isREmailValid: null,
      isLPasswordValid: null,
      isRPasswordValid: null,
      isCorrect: true,
      lErrorMsg: "",
      rErrorMsg: "",
    };
  },
  methods: {
    checkLUsername() {
      let lUsername = document.getElementById("lUsername");
      if (lUsername.validity.valid) {
        this.lUserError = false;
        this.isLUserValid = "valid";
      } else {
        this.lUserError = true;
        this.isLUserValid = "invalid";
      }
    },
    checkRUsername() {
      let rUsername = document.getElementById("rUsername");
      if (rUsername.validity.valid) {
        this.rUserError = false;
        this.isRUserValid = "valid";
      } else {
        this.rUserError = true;
        this.isRUserValid = "invalid";
      }
    },
    checkLEmail() {
      let lEmail = document.getElementById("lEmail");
      if (lEmail.validity.valid) {
        this.lEmailError = false;
        this.isLEmailValid = "valid";
      } else {
        this.lEmailError = true;
        this.isLEmailValid = "invalid";
      }
    },
    checkREmail() {
      let rEmail = document.getElementById("rEmail");
      if (rEmail.validity.valid) {
        this.rEmailError = false;
        this.isREmailValid = "valid";
      } else {
        this.rEmailError = true;
        this.isREmailValid = "invalid";
      }
    },
    checkLPassword() {
      let lPassword = document.getElementById("lPassword");
      if (lPassword.validity.valid) {
        this.lPasswordError = false;
        this.isLPasswordValid = "valid";
      } else {
        this.lPasswordError = true;
        this.isLPasswordValid = "invalid";
      }
    },
    checkRPassword() {
      let rPassword = document.getElementById("rPassword");
      if (rPassword.validity.valid) {
        this.rPasswordError = false;
        this.isRPasswordValid = "valid";
      } else {
        this.rPasswordError = true;
        this.isRPasswordValid = "invalid";
      }
    },
    maskPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.isMasked = "fas fa-eye-slash";
      } else {
        this.type = "password";
        this.isMasked = "fas fa-eye";
      }
    },
    showLogin() {
      return (this.onLogin = true);
    },
    showSignup() {
      return (this.onLogin = false);
    },
    async signup() {
      let newUser = {
        username: this.rUsername,
        email: this.rEmail,
        password: this.rPassword,
      };
      await axios
        .post("http://localhost:3000/api/auth/signup", newUser)
        .then((res) => {
          if (res.status === 201) {
            this.lUsername = this.rUsername;
            this.lEmail = this.rEmail;
            this.lPassword = this.rPassword;
            this.login();
          }
        })
        .catch((e) => {
          this.message = e.response.data.error;
        });
    },
    async login() {
      let User = {
        username: this.lUsername,
        email: this.lEmail,
        password: this.lPassword,
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
            this.lErrorMsg = " Veuillez vérifiez vos identifiants";
          } else {
            this.isCorrect = false;
            this.lErrorMsg = "";
          }
        });
    },
  },
};
</script>

<style lang="scss">
.valid {
  outline: solid rgba(144, 201, 154, 0.719);
  border: 1px solid green;
  border-radius: 0.5rem;
}
.invalid {
  outline: solid var(--Secondary-Color);
  border: 1px solid var(--Secondary-Color-Alt);
  border-radius: 0.5rem;
}
.mainWrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  background: url("../assets/layer-170971.jpg");
  background-clip: border-box;
  background-size: cover;
}
.leftPart,
.rightPart {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 35rem;
  color: var(--Light-Color);
}

@media screen and (min-width: 1024px) {
  .rightPart {
    width: 120rem;
  }
}
.rightPart {
  justify-content: center;
  .fa-eye,
  .fa-eye-slash {
    color: var(--Primary-Color-Alt);
    align-self: center;
    padding-left: 1rem;
  }
  header {
    display: flex;
    font-weight: 800;
    width: 90%;
    max-width: 70rem;
    .isFocused {
      border-bottom: 0.5rem solid var(--Secondary-Color-Alt);
    }
    div {
      cursor: pointer;
      padding: 2rem;
      background-color: rgba(35, 49, 73, 0.972);
      background-image: var(--Gradient-Color);
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      h3 {
        font-size: 2.5rem;
      }
    }
  }
  #displayForm {
    width: 90%;
    max-width: 70rem;
    .form {
      background-color: var(--Light-Color);
      border-left: var(--Dark-Color) 1px solid;
      border-right: var(--Dark-Color) 1px solid;
      border-bottom: var(--Dark-Color) 1px solid;
      width: 100%;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .errorMsg {
        color: var(--Secondary-Color-Alt);
        text-align: center;
        font-style: italic;
      }
      input {
        margin: 1rem 0;
        &::placeholder {
          text-align: center;
        }
      }
      label {
        color: var(--Dark-Color);
        font-weight: 800;
        margin-left: 1rem;
      }
      #submitBtn {
        font-weight: 700;
        padding: 1rem 0;
      }
      .reset {
        color: var(--Secondary-Color-Alt);
        text-align: center;
        font-weight: 600;
      }
      .go {
        color: var(--Primary-Color);
        text-align: center;
        font-weight: 600;
        font-style: italic;
      }
    }
  }
}
</style>
