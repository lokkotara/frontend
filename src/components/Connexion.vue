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
      <div class="form">
        <template id="connexion" v-if="this.onLogin == true">
          <label for="username"> Pseudonyme</label>
          <input
            type="text"
            @keyup.enter="login"
            v-model="username"
            id="username"
            placeholder="Votre nom d'utilisateur"
          />
          <span v-if="userError" class="errorMsg"
            >Le nom d'utilisateur n'a pas le bon format</span
          >
          <label for="email"> Adresse e-mail</label>
          <input
            type="text"
            @keyup.enter="login"
            v-model="email"
            id="email"
            placeholder="Votre adresse mail"
          />
          <span v-if="emailError" class="errorMsg"
            >L'adresse mail n'a pas le bon format</span
          >
          <label for="password"> Mot de passe</label>
          <input
            v-model="password"
            @keyup.enter="login"
            type="text"
            id="password"
            placeholder="Votre mot de passe"
          />
          <span v-if="passwordError" class="errorMsg"
            >Le mot de passe n'a pas le bon format</span
          >
          <input
            id="submitBtn"
            type="button"
            @click="login"
            value="Se connecter"
          />
          <!-- <span class="reset">Mot de passe oublié ?</span> -->
        </template>
        <template id="inscription" v-else>
          <label for="username"> Pseudonyme </label>
          <input
            type="text"
            @keyup.enter="signup"
            v-model="username"
            id="username"
            placeholder="Votre nom d'utilisateur"
            label="Pseudonyme"
          />
          <span v-if="userError" class="errorMsg"
            >Ne doit pas contenir de caractères spéciaux et être unique</span
          >
          <label for="email"> Adresse e-mail</label>
          <input
            type="text"
            @keyup.enter="signup"
            v-model="email"
            id="email"
            placeholder="Votre adresse mail"
          />
          <span v-if="emailError" class="errorMsg"
            >Doit respecter le format email et être unique</span
          >
          <label for="password"> Mot de passe</label>
          <input
            type="text"
            @keyup.enter="signup"
            v-model="password"
            id="password"
            placeholder="Votre mot de passe"
          />
          <span v-if="passwordError" class="errorMsg"
            >Doit contenir au moins 8 caractères, dont un chiffre, une majuscule
            et une minuscule</span
          >
          <input
            id="submitBtn"
            type="submit"
            @click="signup"
            value="S'inscrire"
          />
          <!-- <span class="go">Bienvenue sur le réseau</span> -->
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      onLogin: true,
      username: "",
      email: "",
      password: "",
      image: "",
    };
  },
  methods: {
    showLogin() {
      return (this.onLogin = true);
    },
    showSignup() {
      return (this.onLogin = false);
    },
    async signup() {
      let newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      await axios
        .post("http://localhost:3000/api/auth/signup", newUser)
        .then((res) => {
          if (res.status === 201) {
            this.login();
          }
        })
        .catch((e) => {
          console.error("erreur : " + e);
        });
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
            localStorage.setItem("user", JSON.stringify(res.data));
            this.$router.push("/feed");
          }
        })
        .catch((e) => {
          console.error("erreur : " + e);
        });
    },
  },
};
</script>

<style scope lang="scss">
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
