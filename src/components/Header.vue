<template>
  <header class="mainHeader">
    <router-link to="/Feed"
      ><img
        src="@/assets/logoLong-alt.png"
        class="logoLong"
        alt="Logo de l'entreprise avec écriture"
      />
      <img
        src="@/assets/logo.png"
        class="logoShort"
        alt="Logo de l'entreprise sans écriture"
      />
    </router-link>
    <div class="profileBtn">
      <span class="pseudo">{{ username }}</span>
      <img :src="image" alt="photo de profil" />
      <span
        aria-label="Accéder au menu"
        class="fas fa-sort-down"
        @click="toggle = !toggle"
      ></span>
      <div class="dropDown" v-show="toggle">
        <router-link to="/profile"><p>Accéder à mon profil</p> </router-link>
        <span class="fas fa-sign-out-alt" @click="logout">Se deconnecter</span>
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import avatar from "../assets/avatarDefault.png";
export default {
  name: "Header",
  data() {
    return {
      user: [],
      image: "",
      username: "",
      toggle: false,
    };
  },
  methods: {
    getUser() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
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
          let currentUser = res.data;
          this.username = currentUser.username;
          if (currentUser.image !== null) {
            this.image = currentUser.image;
          } else {
            this.image = avatar;
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    logout() {
      sessionStorage.clear();
      this.$router.push("/");
      this.$swal.fire({
        toast: true,
        position: "top-end",
        title: "Déconnecté !",
        text: "A bientôt",
        icon: "info",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
  beforeMount() {
    this.getUser();
  },
};
</script>

<style scoped lang="scss">
.mainHeader {
  width: 100%;
  background-color: rgba(35, 49, 73, 0.972);
  background-image: var(--Gradient-Color-Alt);
  color: #fff2f2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem 0;
  img {
    height: 7rem;
  }
}
.logoLong {
  display: none;
}
.fa-edit {
  font-size: 6rem;
}
.profileBtn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 1.5rem;
  .pseudo {
    font-size: 3rem;
    font-family: "Karla", Arial, sans-serif;
    font-weight: 800;
    display: none;
  }
  img {
    width: 7rem;
    height: 7rem;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    margin-left: 1rem;
  }
  .fa-sort-down {
    font-size: 2.5rem;
    margin-left: 0.5rem;
    border-radius: 5rem;
    text-align: center;
    width: 5rem;
    height: 3rem;
    &:hover {
      background-color: rgba(255, 241, 244, 0.6);
      color: #29364e;
      cursor: pointer;
    }
  }
}
.dropDown {
  position: absolute;
  top: 12rem;
  margin-left: auto;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  width: inherit;
  padding: 0 2rem 2rem 1rem;
  color: #fff2f2;
  background-color: rgba(35, 49, 73, 0.972);
  background-image: var(--Gradient-Color-Alt);
  width: 25rem;
  border-radius: 0 0 25rem 25rem;
  transition: cubic-bezier(0, 0.92, 0, 1);
  .fa-sign-out-alt {
    cursor: pointer;
  }
  p,
  span {
    &:hover {
      color: var(--Secondary-Color);
    }
  }
}
@media screen and(min-width:768px) {
  .logoLong,
  .profileBtn .pseudo {
    display: block;
  }
  .logoShort {
    display: none;
  }
}
</style>
