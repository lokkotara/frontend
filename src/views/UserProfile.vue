<template>
  <div class="profile">
    <Header />
    <main class="mainProfile">
      <div class="profile">
        <h1>Profil utilisateur</h1>
        <img :src="image" alt="" class="imgProfile" />
        <p class="membership">
          Membre depuis le {{ moment(createdAt).format("DD MMMM YYYY") }}
        </p>
        <p>
          <span class="profileTitle">Pseudonyme</span>
          <span class="profileContent">{{ username }}</span>
        </p>
        <p>
          <span class="profileTitle">Biographie</span>
          <span class="profileContent">{{ bio }}</span>
        </p>
        <div v-if="isAdmin" class="adminWrapper">
          <span class="btn fas fa-trash-alt inputBtn" @click="deleteProfileUser"
            >Supprimer le compte</span
          >
        </div>
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
  name: "UserProfile",
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
      id: this.$route.params.id,
      image: avatar,
      username: "",
      // email: "",
      bio: "",
      // password: "",
      createdAt: "",
    };
  },
  methods: {
    getProfileUser() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      let token = this.user.token;
      this.isAdmin = this.user.isAdmin;
      // let id = $route.params.id;
      let config = {
        headers: {
          authorization: `Bearer: ${token}`,
        },
      };
      axios
        .get(`http://localhost:3000/api/auth/profil/${this.id}`, config)
        .then((res) => {
          let data = res.data;
          this.username = data.username;
          // this.email = data.email;
          this.bio = data.bio;
          // this.password = data.password;
          this.createdAt = data.createdAt;
          if (data.image !== null) {
            this.image = data.image;
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    deleteProfileUser() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      let token = this.user.token;
      // let userId = this.user.userId;
      let config = {
        headers: {
          authorization: `Bearer: ${token}`,
        },
      };
      this.$swal
        .fire({
          title: "Etes-vous sûr?",
          text: "Vous ne pourrez plus revenir en arrière!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "var(--Primary-Color)",
          cancelButtonColor: "var(--Secondary-Color-Alt)",
          confirmButtonText: "Oui, je suis sûr!",
          cancelButtonText: "En fait, non.",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              title: "Supprimé !",
              text: "supprimé.",
              icon: "info",
              showConfirmButton: false,
              timer: 1500,
            });
            axios
              .delete(
                `http://localhost:3000/api/auth/profil/${this.id}`,
                config
              )
              .then(() => {
                this.$router.push("/feed");
              })
              .catch((error) => {
                console.log({ error });
              });
          }
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
    height: 90%;
    h1 {
      text-align: center;
    }
    p {
      width: 80%;
      display: flex;
      flex-direction: column;
    }
    .membership {
      text-align: center;
    }
    .profileTitle {
      background-color: var(--Primary-Color);
      color: var(--Light-Color);
      padding: 1.5rem;
      border-radius: 1rem 1rem 0 0;
      text-align: center;
      white-space: nowrap;
      font-weight: bold;
    }
    .profileContent {
      border-radius: 0 0 1rem 1rem;
      padding: 1.5rem;
      background-color: #ce444e;
      color: white;
      flex: 1;
      text-align: center;
    }
  }
  .fa-trash-alt {
    color: var(--Light-Color);
    // background-image: linear-gradient(
    //   315deg,
    //   #4f6791 0%,
    //   rgba(35, 49, 73, 0.972) 74%
    // );
    padding: 1.5rem;
    // margin-top: 1rem;
    border-radius: 1.5rem;
    cursor: pointer;
    &:before {
      color: var(--Secondary-Color-Alt);
      padding: 1rem;
    }
  }
  @media screen and (min-width: 1024px) {
    .profile {
      width: 80%;
      height: 70%;
    }
  }
  .imgProfile {
    width: 20rem;
    border-radius: 50%;
    height: 20rem;
    object-fit: cover;
  }
  .actions {
    background-color: rgba(35, 49, 73, 0.972);
    background-image: var(--Gradient-Color-Alt);
    color: var(--Light-Color);
    font-weight: 800;
    border-radius: 25px;
    padding: 2rem;
    border: 3px solid var(--Secondary-Color-Alt);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 20rem;
    justify-content: space-around;
    span {
      font-size: 2rem;
    }
    .fas {
      font-size: 7rem;
      padding-top: 2rem;
      color: #d6bcbc;
    }
  }
  .adminWrapper {
    border: 2px solid #d6646c;
    background-image: linear-gradient(
      315deg,
      #4f6791 0%,
      rgba(35, 49, 73, 0.972) 74%
    );
    padding: 0.5rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }
  }
}
</style>
