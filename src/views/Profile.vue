<template>
  <div class="profile">
    <Header :user="user" ref="header" />
    <main class="mainProfile">
      <div class="profile">
        <img :src="image" alt="" class="imgProfile" />
        <button class="btn btn-info" @click="onPickFile">
          Modifier son image
        </button>
        <input
          type="file"
          style="display: none"
          ref="fileInput"
          accept="image/jpeg, image/jpg, image/png,"
          @change="onFilePicked"
        />
        <span class="imgContent"
          >{{ newImage !== null ? newImage.name : emptyMessage
          }}<i
            class="fas fa-times-circle"
            v-if="newImage !== null"
            @click="clearImg"
          ></i
        ></span>
        <p>
          <span class="profileTitle">Pseudonyme</span>
          <input
            type="text"
            class="profileContent"
            v-model="username"
            :placeholder="username"
          />
          <span class="fas fa-eye"></span>
        </p>
        <p>
          <span class="profileTitle">E-mail</span>
          <input
            type="text"
            class="profileContent"
            v-model="email"
            :placeholder="email"
          />
          <span class="fas fa-eye"></span>
        </p>
        <!-- <p>
          <span class="profileTitle">Mot de passe</span>
          <input
            type="text"
            class="profileContent"
            v-model="password"
            :placeholder="password"
          />
          <span class="fas fa-eye"></span>
        </p> -->
        <p>
          <span class="profileTitle">Bio</span>
          <input
            type="text"
            class="profileContent"
            v-model="bio"
            :placeholder="bio"
          />
          <span class="fas fa-eye"></span>
        </p>
        <span class="fas fa-cog" @click="modifyUser">Modifier son profil</span>
      </div>
      <div class="actions">
        <p class="membership">
          Devenu membre le {{ moment(createdAt).format("DD MMM YYYY à LT") }}
        </p>
        <span class="fas fa-trash-alt" @click="deleteProfileUser"
          >Supprimer le compte</span
        >
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
      emptyMessage: "Aucune image sélectionnée",
      user: [],
      token: "",
      userId: "",
      isAdmin: "",
      id: "",
      image: avatar,
      newImage: null,
      username: "",
      email: "",
      emailTest: "",
      bio: "",
      password: "",
      createdAt: "",
      testingPassword: "********",
    };
  },
  methods: {
    clearImg() {
      this.newImage = null;
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      // let filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.newImage = files[0];
    },
    async modifyUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.token = user.token;
      let updateUser = new FormData();
      if (this.newImage !== null) {
        updateUser.append("image", this.newImage);
      }
      updateUser.append("username", this.username);
      updateUser.append("email", this.email);
      updateUser.append("bio", this.bio);
      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
          "Content-Type": "application/form-data",
        },
      };
      let id = this.user.userId;
      await axios
        .patch(
          `http://localhost:3000/api/auth/profil/${id}`,
          updateUser,
          config
        )
        .then((res) => {
          console.log(res.data.message);
          if (res.status === 200) {
            this.newImage = null;
            this.getProfileUser();
            this.$refs.header.getUser();
          }
        })
        .catch((e) => {
          console.error("erreur : " + e);
        });
    },
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
          this.bio = data.bio;
          if (data.image !== null) {
            this.image = data.image;
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    deleteProfileUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
      let token = this.user.token;
      let userId = this.user.userId;
      let config = {
        headers: {
          authorization: `Bearer: ${token}`,
        },
      };
      axios
        .delete(`http://localhost:3000/api/auth/profil/${userId}`, config)
        .then(() => {
          this.$refs.header.logout();
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
    .btn {
      border: none;
    }
    .imgContent {
      height: 2rem;
      margin: 1rem 0 2rem 0;
    }
    p {
      width: 80%;
      display: flex;
    }
    .fa-times-circle {
      font-size: 2rem;
      color: var(--Secondary-Color-Alt);
      margin-left: 1rem;
      cursor: pointer;
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
      text-align: center;
    }
    .profileContent {
      border-radius: 0 1rem 1rem 0;
      padding: 1.5rem;
      background-color: var(--Secondary-Color-Alt);
      color: var(--Light-Color);
      flex: 1;
      text-align: center;
    }
    .fa-eye {
      margin-left: 0.5rem;
      color: green;
      align-self: center;
      width: 5rem;
      text-align: center;
      font-size: 5rem;
    }
  }
  @media screen and (min-width: 1024px) {
    .profile {
      width: 80%;
      #image::file-selector-button {
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      }
      .fa-cog,
      .btn {
        background-image: linear-gradient(
          315deg,
          #4f6791 0%,
          rgba(35, 49, 73, 0.972) 74%
        );
        padding: 1.5rem;
        font-size: 2rem;
        border-radius: 1.5rem;
        color: var(--Light-Color);
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        &:hover {
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
        }
        &:before {
          padding: 1rem;
        }
      }
    }
  }
  .imgProfile {
    width: 20rem;
    border-radius: 50%;
    height: 20rem;
    object-fit: cover;
    margin-bottom: 1.5rem;
  }
  .actions {
    background-color: rgba(35, 49, 73, 0.972);
    background-image: var(--Gradient-Color-Alt);
    color: var(--Light-Color);
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
    .fa-trash-alt {
      color: var(--Secondary-Color-Alt);
      background-color: var(--Light-Color);
      padding: 1.5rem;
      border-radius: 1.5rem;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
          0 10px 10px rgba(0, 0, 0, 0.22);
      }
      &:before {
        padding: 1rem;
      }
    }
  }
}
</style>
