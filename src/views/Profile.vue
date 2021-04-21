<template>
  <div class="profile">
    <Header />
    <main class="mainProfile">
      <div class="profile">
        <img :src="infoProfile.image" alt="" class="imgProfile" />
        <p>Pseudo : {{ infoProfile.username }}</p>
        <p>E-mail : {{ infoProfile.email }}</p>
        <p>Mot de passe : {{ infoProfile.password }}</p>
        <p>Membre depuis le {{ infoProfile.createdAt }}</p>
      </div>
      <div class="actions">
        <p>Modifier son profil</p>
        <p>Supprimer le compte</p>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import axios from "axios";
const moment = require("moment");
moment.locale("fr");
const user = JSON.parse(localStorage.getItem("user"));
const userId = user.userId;
export default {
  name: "Profil",
  components: {
    Header,
  },
  data() {
    return {
      moment: moment,
      id: userId,
      image: "",
      username: "",
      email: "",
      password: "",
      createdAt: "",
      infoProfile: [],
    };
  },
  methods: {
    getProfileUser() {
      let token = user.token;
      let config = {
        headers: {
          authorization: "Bearer: " + token,
        },
      };
      axios
        .get("http://localhost:3000/api/auth/profil/" + this.id, config)
        .then((res) => {
          this.infoProfile = res.data;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.getProfileUser();
  },
};
</script>

<style scoped lang="scss">
.mainProfile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 90%;
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
  }
  .imgProfile {
    width: 20rem;
    border-radius: 50%;
    height: 20rem;
    object-fit: cover;
  }
  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
