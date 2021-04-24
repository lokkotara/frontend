<template>
  <header class="mainHeader">
    <router-link to="/feed"
      ><img src="@/assets/logoLong-alt.png" class="logoLong" alt="" />
      <img src="@/assets/logo-alt.png" class="logoShort" alt="" />
    </router-link>
    <div class="profileBtn">
      <span class="pseudo">{{ username }}</span>
      <img :src="image" alt="photo de profil" />
      <span class="fas fa-sort-down" @click="toggle = !toggle"></span>
      <div class="dropDown" v-show="toggle">
        <img :src="test" alt="" />
        <router-link to="/profile"><p>Accéder à mon profil</p> </router-link>
        <router-link to="/"
          ><span class="fas fa-sign-out-alt" @click="logout"
            >Se deconnecter</span
          >
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";
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
  computed: {
    test: function () {
      return "../assets/avatarDefault.png";
    },
  },
  methods: {
    getUser() {
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
          let currentUser = res.data;
          let avatarDefault = "../assets/avatarDefault.png";
          console.log(currentUser.image);
          this.username = currentUser.username;
          if (currentUser.image !== null) {
            this.image = currentUser.image;
          } else {
            this.image = avatarDefault;
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    logout() {
      localStorage.clear();
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
  // background-image: linear-gradient(
  //   315deg,
  //   #4f6791 0%,
  //   rgba(35, 49, 73, 0.972) 74%
  // );
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
.profileBtn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 1.5rem;
  .pseudo {
    font-size: 3rem;
    font-family: "Karla", Arial, sans-serif;
    font-weight: 800;
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
  p,
  span {
    &:hover {
      color: var(--Secondary-Color);
    }
  }
}
@media screen and(min-width:768px) {
  .logoLong {
    display: block;
  }
  .logoShort {
    display: none;
  }
}
</style>
