<template>
  <div class="profile">
    <Header />
    <main class="mainProfile">
      <div class="profile">
        <img :src="image" alt="" class="imgProfile" />
        <p>Pseudo : {{ username }}</p>
        <p>E-mail : {{ email }}</p>
        <p>Mot de passe : {{ password }}</p>
        <p>Devenu membre {{ moment(createdAt).fromNow() }}</p>
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
import avatar from "../assets/avatarDefault.png";
import axios from "axios";
const moment = require("moment");
moment.locale("fr");
export default {
  name: "Profil",
  components: {
    Header,
  },
  data() {
    return {
      moment: moment,
      user: [],
      token: "",
      userId: "",
      isAdmin: "",
      id: "",
      image: avatar,
      username: "",
      email: "",
      password: "",
      createdAt: "",
    };
  },
  methods: {
    getProfileUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
      let token = this.user.token;
      let userId = this.user.userId;
      let config = {
        headers: {
          authorization: `Bearer: ${token}`,
        },
      };
      axios
        .get(`http://localhost:3000/api/auth/profil/${userId}`, config)
        .then((res) => {
          let data = res.data;
          this.username = data.username;
          this.email = data.email;
          this.password = data.password;
          this.createdAt = data.createdAt;
          if (data.image !== null) {
            this.image = data.image;
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  beforeMount() {
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

function newFunction(token) { return `Bearer: ${token}`; }
