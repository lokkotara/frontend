<template>
  <header class="mainHeader">
    <img src="../assets/logoLong.png" class="logoLong" alt="" />
    <img src="../assets/logo.png" class="logoShort" alt="" />
    <div class="profileBtn">
      <span class="pseudo">{{ username }}</span>
      <router-link to="/profile"
        ><img src="../assets/beau_gosse1617867815195.jpg" alt=""
      /></router-link>
      <span class="fas fa-sort-down" @click="showDropDown"></span>
      <div class="dropDown" v-if="(dd = false)">
        <p>Voir mon profil</p>
        <span class="fas fa-sign-out-alt">Se deconnecter</span>
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
const userId = user.userId;
export default {
  name: "Header",
  data() {
    return {
      id: userId,
      image: "",
      username: "",
      dd: "",
    };
  },
  computed: {
    comments: function () {
      return this.allPosts;
    },
  },
  methods: {
    getUser() {
      axios
        .get("http://localhost:3000/api/auth/profil/" + this.id)
        .then((res) => {
          const currentUser = res.data;
          console.log(currentUser);
          this.username = currentUser.username;
          this.image = currentUser.image;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    showDropDown() {
      console.log(this.dd);
      if (this.dd) {
        this.dd = false;
      } else {
        this.dd = true;
      }
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style scoped lang="scss">
.mainHeader {
  width: 100%;
  background-color: rgba(35, 49, 73, 0.972);
  background-image: linear-gradient(
    315deg,
    #4f6791 0%,
    rgba(35, 49, 73, 0.972) 74%
  );
  color: #fff2f2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem 0;
  img {
    height: 5rem;
  }
}
.logoLong {
  display: none;
}
.profileBtn {
  display: flex;
  align-items: center;
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
  margin-left: auto;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  width: max-content;
  padding: 0 2rem 2rem 1rem;
  color: #fff2f2;
  background-image: linear-gradient(
    315deg,
    #4f6791 0%,
    rgba(35, 49, 73, 0.972) 74%
  );
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
