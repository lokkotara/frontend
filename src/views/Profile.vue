<template>
  <div class="profile">
    <Header :user="user" ref="header" />
    <main class="mainProfile">
      <div class="profile">
        <div class="leftPartProfile">
          <h2 class="title">Modification</h2>
          <span class="inputWrapper">
            <span class="btn inputBtn" @click="getUsername">Pseudonyme</span>
            <span class="newContent"
              >{{ newUsername
              }}<i
                class="fas fa-times-circle"
                v-if="newUsername !== null"
                @click="newUsername = null"
              ></i
            ></span>
          </span>
          <span class="inputWrapper">
            <span class="btn inputBtn" @click="getEmail">E-mail</span>
            <span class="newContent"
              >{{ newEmail
              }}<i
                class="fas fa-times-circle"
                v-if="newEmail !== null"
                @click="newEmail = null"
              ></i
            ></span>
          </span>
          <span class="inputWrapper">
            <span class="btn inputBtn" @click="getBio">Biographie</span>
            <span class="newContent"
              >{{ newBio
              }}<i
                class="fas fa-times-circle"
                v-if="newBio !== null"
                @click="newBio = null"
              ></i
            ></span>
          </span>
        </div>
        <div class="centerPart">
          <h1>Règlages du profil</h1>
          <p class="membership">
            Membre depuis le {{ moment(createdAt).format("DD MMM YYYY") }}
          </p>
          <img :src="tempImg ? tempImg : image" alt="" class="imgProfile" />
          <button class="btn btn-info" @click="getImage">
            Modifier son image
          </button>
          <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/jpeg, image/jpg, image/png,"
            @change="onFilePicked"
            aria-label="Chargement de la photo de profil"
          />
          <span class="imgContent"
            >{{ newImage !== null ? newImage.name : emptyMessage
            }}<i
              class="fas fa-times-circle"
              v-if="newImage !== null"
              @click="newImage = null"
            ></i
          ></span>
        </div>
        <div class="rightPartProfile">
          <h2 class="title">Actions</h2>
          <span class="fas fa-cog inputBtn" @click="changePassword"
            >Nouveau mot de passe
          </span>
          <span class="fas fa-clipboard-check inputBtn" @click="modifyUser"
            >Valider les changements</span
          >
          <span class="btn fas fa-trash-alt inputBtn" @click="deleteProfileUser"
            >Supprimer le compte</span
          >
          <div class="adminWrapper" v-if="isAdmin">
            <h2 id="AdminTitle" class="title">Zone administrateur</h2>
            <span class="deleteUser">
              <select class="select" v-model="selected">
                <option disabled value="">
                  Sélectionner le compte à supprimer
                </option>
                <option
                  :value="{ id: user.id }"
                  v-for="user in users"
                  :key="user.id"
                >
                  {{ user.username }}
                </option>
              </select>
              <span class="deleteBtn" @click="deleteSelectedUser(selected.id)"
                >Supprimer</span
              >
            </span>
          </div>
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
  name: "Profil",
  components: {
    Header,
  },
  data() {
    return {
      moment: moment,
      emptyMessage: "Aucune image sélectionnée",
      user: [],
      users: [],
      selected: "",
      token: "",
      userId: "",
      isAdmin: "",
      id: "",
      image: avatar,
      newImage: null,
      tempImg: null,
      username: "",
      newUsername: null,
      email: "",
      newEmail: null,
      bio: "",
      newBio: null,
      password: "",
      oldPassword: "",
      newPassword: "",
      createdAt: "",
    };
  },
  methods: {
    async getUsername() {
      const { value: username } = await this.$swal.fire({
        title: "Changer de pseudonyme",
        input: "text",
        inputValue: this.username,
        inputPlaceholder: "Entrer votre nouveau pseudo",
      });
      if (username) {
        this.newUsername = username;
      }
    },
    async getEmail() {
      const { value: email } = await this.$swal.fire({
        title: "Changer d'adresse mail",
        input: "email",
        inputValue: this.email,
        inputPlaceholder: "Entrer votre nouvelle adresse",
      });
      if (email) {
        this.newEmail = email;
      }
    },
    async getBio() {
      const { value: bio } = await this.$swal.fire({
        title: "Changer votre bio",
        input: "textarea",
        inputValue: this.bio,
        inputPlaceholder: "Entrer votre nouvelle biographie",
      });
      if (bio) {
        this.newBio = bio;
      }
    },
    async getImage() {
      const { value: file } = await this.$swal.fire({
        title: "Select image",
        input: "file",
        inputAttributes: {
          accept: "image/*",
          "aria-label": "Charger une nouvelle image",
        },
      });
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // this.$swal.fire({
          //   title: "Votre nouvel avatar",
          //   imageUrl: e.target.result,
          //   imageAlt: "L'image uploadé",
          // });
          this.tempImg = e.target.result;
        };
        reader.readAsDataURL(file);
        this.newImage = file;
      }
    },
    async changePassword() {
      this.$swal({
        title: "Changer de mot de passe",
        input: "password",
        inputPlaceholder: "Entrer votre mot de passe actuel",
      }).then(async (res) => {
        if (res.value) {
          let user = JSON.parse(sessionStorage.getItem("user"));
          this.token = user.token;
          this.oldPassword = res.value;
          let User = {
            username: this.username,
            email: this.email,
            password: this.oldPassword,
          };
          await axios
            .post("http://localhost:3000/api/auth/login", User)
            .then((res) => {
              if (res.status === 200) {
                this.$swal({
                  title: "Changer de mot de passe",
                  input: "password",
                  inputPlaceholder: "Entrer votre nouveau mot de passe",
                }).then((res) => {
                  if (res.value) {
                    this.newPassword = res.value;
                    let update = new FormData();
                    update.append("password", this.newPassword);
                    let config = {
                      headers: {
                        authorization: "Bearer: " + this.token,
                        "Content-Type": "application/form-data",
                      },
                    };
                    let id = this.user.userId;
                    axios.patch(
                      `http://localhost:3000/api/auth/profil/${id}/password`,
                      update,
                      config
                    );
                    this.success();
                  }
                });
              }
            })
            .catch((e) => {
              console.error("erreur : " + e);
            });
        }
      });
    },
    async modifyUser() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      this.token = user.token;
      let updateUser = new FormData();
      if (this.newImage !== null) {
        updateUser.append("image", this.newImage);
      }
      if (this.newUsername !== null) {
        updateUser.append("username", this.newUsername);
      }
      if (this.newEmail !== null) {
        updateUser.append("email", this.newEmail);
      }
      if (this.newBio !== null) {
        updateUser.append("bio", this.newBio);
      }
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
          if (res.status === 200) {
            this.newImage = null;
            this.newUsername = null;
            this.newBio = null;
            this.newEmail = null;
            this.getProfileUser();
            this.$refs.header.getUser();
            this.success();
          }
        })
        .catch((e) => {
          console.error("erreur : " + e);
        });
    },
    async success() {
      this.$swal.fire({
        toast: true,
        position: "top-end",
        title: "Modifié !",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    getProfileUser() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      let token = this.user.token;
      this.isAdmin = this.user.isAdmin;
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
    getAllUsers() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      let token = this.user.token;
      let config = {
        headers: {
          authorization: `Bearer: ${token}`,
        },
      };
      axios
        .get(`http://localhost:3000/api/auth/profil`, config)
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    deleteSelectedUser() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      let token = this.user.token;
      let userId = this.selected.id;
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
              .delete(`http://localhost:3000/api/auth/profil/${userId}`, config)
              .then(() => {
                this.getAllUsers();
              })
              .catch((error) => {
                console.log({ error });
              });
          }
        });
    },
    deleteProfileUser() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      let token = this.user.token;
      let userId = this.user.userId;
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
              .delete(`http://localhost:3000/api/auth/profil/${userId}`, config)
              .then(() => {
                this.$refs.header.logout();
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
    this.getAllUsers();
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
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    margin: 5rem 0 0 0;
    padding: 2.5rem;
    border-radius: 25px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    background-color: var(--Light-Color);
    width: 100%;
    .title {
      color: var(--Dark-Color);
      justify-content: center;
    }
    .inputBtn {
      text-align: center;
    }
    .leftPartProfile {
      flex: 1;
      height: 50rem;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .title {
        align-self: center;
        font-family: "Karla", sans-serif;
        font-size: 3.5rem;
        font-weight: 900;
      }
      .inputWrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        .inputBtn {
          flex: 1;
        }
        .newContent {
          flex: 1;
          border-radius: 0 2rem 2rem 0;
          align-self: center;
        }
      }
    }
    .centerPart {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
    }
    .rightPartProfile {
      flex: 1;
      height: 50rem;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .inputBtn {
        width: 100%;
      }
      span {
        text-align: center;
      }
      .title {
        align-self: center;
        font-family: "Karla", sans-serif;
        font-size: 3.5rem;
        font-weight: 900;
      }
    }
    .fa-clipboard-check,
    .fa-cog,
    .btn {
      background-image: linear-gradient(
        315deg,
        #4f6791 0%,
        rgba(35, 49, 73, 0.972) 74%
      );
      background-color: rgba(35, 49, 73, 0.972);
      border: none;
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
    .newContent {
      color: var(--Dark-Color);
      padding-left: 1.5rem;
    }
    .imgContent {
      height: 2rem;
      margin: 1rem 0 2rem 0;
    }
    .fa-times-circle {
      font-size: 2rem;
      color: var(--Secondary-Color-Alt);
      margin-left: 1rem;
      cursor: pointer;
    }
  }
  .rightPartProfile {
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
  @media screen and (min-width: 1024px) {
    .profile {
      width: 80%;
      height: 70rem;
      #image::file-selector-button {
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      }
    }
  }
  .imgProfile {
    width: 30rem;
    height: 30rem;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1.5rem;
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
    #AdminTitle {
      color: var(--Light-Color);
    }
  }
  .deleteUser {
    display: flex;
    .select {
      flex: 1;
    }
    .deleteBtn {
      padding: 1rem;
      margin-left: 0.5rem;
      color: var(--Light-Color);
      background-color: var(--Secondary-Color-Alt);
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
}
</style>
