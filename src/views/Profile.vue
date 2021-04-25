<template>
  <div class="profile">
    <Header />
    <main class="mainProfile">
      <div class="profile">
        <img :src="image" alt="" class="imgProfile" />
        <p class="membership">
          Devenu membre {{ moment(createdAt).fromNow() }}
        </p>
        <p>
          <span class="profileTitle">Pseudonyme</span>
          <span class="profileContent">{{ username }}</span>
        </p>
        <p>
          <span class="profileTitle">E-mail</span>
          <span class="profileContent">{{ email }}</span>
        </p>
        <p>
          <span class="profileTitle">Mot de passe</span>
          <span class="profileContent">{{ testingPassword }}</span>
        </p>
      </div>
      <div class="actions">
        <span class="fas fa-cog">Modifier son profil</span>
        <span class="fas fa-trash-alt">Supprimer le compte</span>
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
      testingPassword: "********",
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
  background-image: url(../assets/ville.jpg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 90%;
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5rem 0;
    padding: 2.5rem;
    border-radius: 25px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    background-color: var(--Light-Color);
    width: 100%;
    p {
      width: 80%;
      display: flex;
    }
    .membership {
      justify-content: center;
    }
    .profileTitle {
      background-color: var(--Primary-Color);
      color: var(--Light-Color);
      padding: 1.5rem;
      border-radius: 1rem 0 0 1rem;
      width: 15rem;
      white-space: nowrap;
    }
    .profileContent {
      border-radius: 0 1rem 1rem 0;
      padding: 1.5rem;
      background-color: var(--Secondary-Color-Alt);
      color: var(--Light-Color);
      flex: 1;
      text-align: center;
    }
  }
  @media screen and (min-width: 1024px) {
    .profile {
      width: 80%;
    }
  }
  .imgProfile {
    width: 20rem;
    border-radius: 50%;
    height: 20rem;
    object-fit: cover;
  }
  .actions {
    border-radius: 25px;
    padding: 5rem;
    border: 3px solid var(--Secondary-Color-Alt);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 20rem;
    justify-content: space-around;
    span {
      font-size: 2rem;
    }
    .fas:before {
      padding: 1rem;
    }
  }
}
</style>

function newFunction(token) { return `Bearer: ${token}`; }
