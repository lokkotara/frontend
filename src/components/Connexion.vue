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
      <Login v-if="this.onLogin == true" />
      <Signup v-else />
    </div>
  </section>
</template>

<script>
import Signup from "../components/Signup.vue";
import Login from "../components/Login.vue";
export default {
  components: {
    Signup,
    Login,
  },
  data() {
    return {
      onLogin: true,
    };
  },
  methods: {
    showLogin() {
      return (this.onLogin = true);
    },
    showSignup() {
      return (this.onLogin = false);
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
