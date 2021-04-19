<template>
  <section class="rightPart">
    <header>
      <div @click="showSignup">
        <p>Inscription</p>
      </div>
      <div @click="showLogin">
        <p>Connexion</p>
      </div>
    </header>
    <div id="displayForm">
      <div class="form">
        <template id="connexion" v-if="this.onLogin == true">
          <label for="username"> Pseudo</label>
          <input
            type="text"
            v-model="username"
            id="username"
            placeholder="Votre pseudo"
          />
          <label for="email"> Adresse e-mail</label>
          <input
            type="text"
            v-model="email"
            id="email"
            placeholder="Votre adresse mail"
          />
          <label for="password"> Mot de passe</label>
          <input
            v-model="password"
            type="text"
            id="password"
            placeholder="Votre mot de passe"
          />
          <input type="button" @click="login" value="Se connecter" />
        </template>
        <template id="inscription" v-else>
          <label for="username"> Pseudonyme </label>
          <input
            type="text"
            v-model="username"
            id="username"
            placeholder="Votre nom d'utilisateur"
          />
          <label for="email"> Adresse e-mail</label>
          <input
            type="text"
            v-model="email"
            id="email"
            placeholder="Votre adresse mail"
          />
          <label for="password"> Mot de passe</label>
          <input
            type="text"
            v-model="password"
            id="password"
            placeholder="Votre mot de passe"
          />
          <input type="submit" @click="signup" value="S'inscrire" />
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
      onLogin: false,
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
        image: "../assets/avatarDefault.jpg",
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

.leftPart {
  justify-content: space-around;
  img {
    width: 15rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 50%;
  }
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

    width: 90%;
    max-width: 70rem;
    div {
      cursor: pointer;
      padding: 2rem;
      background-color: rgba(35, 49, 73, 0.972);
      background-image: linear-gradient(
        315deg,
        #4f6791 0%,
        rgba(35, 49, 73, 0.972) 74%
      );
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
    }
  }
  #displayForm {
    width: 90%;
    max-width: 70rem;
    .form {
      background-color: #f3e6e8;
      border: var(--Dark-Color) 1px solid;
      width: 100%;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      input {
        margin: 1rem 0;
        &::placeholder {
          text-align: center;
        }
      }
      label {
        color: var(--Dark-Color);
      }
    }
  }
}
</style>
