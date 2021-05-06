<template>
  <div class="container">
    <header>
      <div class="infos">
        <router-link
          :to="{
            name: 'UserProfile',
            params: { id: post.User.id },
          }"
        >
          <img
            :src="post.User.image === null ? avatar : post.User.image"
            alt=""
          />
        </router-link>
        <div class="subInfos">
          <router-link
            :to="{
              name: 'UserProfile',
              params: { id: post.User.id },
            }"
          >
            <span class="postUsername">
              {{ post.User.username }}
            </span>
          </router-link>
          <span class="date">{{
            moment(post.createdAt).fromNow(currentTime)
          }}</span>
        </div>
      </div>
      <div class="icons">
        <span
          class="fas fa-heart"
          :class="{ active: isLiked }"
          @click="isItLiked, likePost(post.id)"
        ></span>
        <span
          v-if="post.User.id === userId"
          class="fas fa-ellipsis-h"
          @click="showAlert(post.id)"
        ></span>
        <span
          v-else-if="isAdmin === true"
          class="fas fa-trash-alt"
          @click="adminAlert(post.id)"
        ></span>
      </div>
    </header>
    <div class="content">
      <p v-if="post.content !== null">{{ post.content }}</p>
      <img
        :src="post.image"
        alt="image de contenu"
        class="imagePost"
        v-if="post.image !== null"
      />
    </div>
    <footer>
      <div class="numbers" @click="toggle">
        <span>{{ like.length }} {{ like.length > 1 ? "likes" : "like" }}</span>
        <span
          >{{ post.Comments.length }}
          {{ post.Comments.length > 1 ? "commentaires" : "commentaire" }}</span
        >
      </div>
      <div v-show="isDisplay">
        <div
          class="commentWrapper"
          v-for="comment in post.Comments"
          :key="comment.id"
        >
          <div>
            <router-link
              :to="{
                name: 'UserProfile',
                params: { id: comment.User.id },
              }"
            >
              <img
                :src="comment.User.image === null ? avatar : comment.User.image"
                alt=""
              />
            </router-link>
            <span class="comment">
              <span class="test">
                <span class="dateComment">
                  <router-link
                    :to="{
                      name: 'UserProfile',
                      params: { id: comment.User.id },
                    }"
                  >
                    <span class="usernameComment">
                      {{ comment.User.username }}
                    </span>
                  </router-link>
                  {{ moment(comment.createdAt).fromNow(currentTime) }}</span
                ><span
                  v-if="comment.User.id === userId || isAdmin === true"
                  @click="deleteComment(comment.id)"
                  class="fas fa-times"
                ></span>
              </span>
              <span class="contentComment">{{ comment.content }} </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import avatar from "../assets/avatarDefault.png";
import axios from "axios";
export default {
  name: "Feed",
  components: {},
  data() {
    return {
      token: "",
      avatar: avatar,
      active: false,
      isDisplay: false,
      isLiked: "",
      like: [],
      newContent: null,
      newImage: null,
      currentTime: "",
    };
  },
  computed: {
    moment: function () {
      let moment = require("moment");
      moment.locale("fr");
      return moment;
    },
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
    likes: {
      type: Object,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async showAlert(postId) {
      this.$swal({
        title: "Options du message",
        text: "Que voulez-vous faire ?",
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonText: "Modifier le message",
        denyButtonText: "Supprimer le message",
        cancelButtonText: "Annuler",
        showCloseButton: true,
        showLoaderOnConfirm: true,
      }).then(async (res) => {
        if (res.value) {
          await this.$swal
            .fire({
              title: "Changer le contenu",
              input: "textarea",
              inputPlaceholder: "Modifiez votre post ici",
              showCloseButton: true,
              showDenyButton: true,
              returnInputValueOnDeny: true,
              confirmButtonText: "Changer l'image ?",
              denyButtonText: "Modifier le post",
            })
            .then(async (res) => {
              if (res.value.length !== 0) {
                this.newContent = res.value;
              }
              if (res.isConfirmed) {
                const { value: image } = await this.$swal.fire({
                  title: "Select image",
                  input: "file",
                  inputAttributes: {
                    accept: "image/jpg, image/jpeg, image/png",
                    "aria-label": "Upload your profile picture",
                  },
                });
                console.log("file : " + image);
                if (image) {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  this.newImage = image;
                }
                this.$swal({
                  title: "Modifié !!",
                  text: "Ce message a été mis à jour",
                  icon: "success",
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 1500,
                });
                let updatePost = new FormData();
                if (this.newImage !== null) {
                  updatePost.append("image", this.newImage);
                }
                if (this.newContent !== null) {
                  updatePost.append("content", this.newContent);
                }
                let config = {
                  headers: {
                    authorization: "Bearer: " + this.token,
                    "Content-Type": "application/form-data",
                  },
                };
                let id = this.post.id;
                axios
                  .patch(
                    `http://localhost:3000/api/feed/${id}`,
                    updatePost,
                    config
                  )
                  .then(() => {
                    this.$emit("get-all-posts");
                  })
                  .catch((e) => {
                    console.error("erreur : " + e);
                  });
              } else if (res.isDenied) {
                this.$swal({
                  title: "Modifié !!",
                  text: "Ce message a été mis à jour",
                  icon: "success",
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 1500,
                });
                let updatePost = new FormData();
                if (this.newContent !== null) {
                  updatePost.append("content", this.newContent);
                }
                let config = {
                  headers: {
                    authorization: "Bearer: " + this.token,
                    "Content-Type": "application/form-data",
                  },
                };
                let id = this.post.id;
                axios
                  .patch(
                    `http://localhost:3000/api/feed/${id}`,
                    updatePost,
                    config
                  )
                  .then(() => {
                    this.$emit("get-all-posts");
                  })
                  .catch((e) => {
                    console.error("erreur : " + e);
                  });
              }
            });
        } else if (res.value === false) {
          this.$swal({
            title: "Supprimé !!",
            text: "Le message a bien été retiré",
            icon: "error",
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
          });
          this.deletePost(postId);
        }
      });
    },
    adminAlert(postId) {
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
              position: "top-end",
              title: "Supprimé !",
              text: "Le post a été correctement supprimé.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.deletePost(postId);
          }
        });
    },
    deleteComment(commentId) {
      console.log("commentaire supprimé !");
      let config = {
        headers: {
          authorization: `Bearer: ${this.token}`,
        },
      };
      axios
        .delete(
          `http://localhost:3000/api/feed/${this.post.id}/comment/${commentId}`,
          config
        )
        .then(() => {
          this.$emit("get-all-posts");
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    deletePost(postId) {
      let config = {
        headers: {
          authorization: `Bearer: ${this.token}`,
        },
      };
      axios
        .delete(`http://localhost:3000/api/feed/${postId}`, config)
        .then(() => {
          this.$emit("get-all-posts");
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    toggle() {
      if (this.isDisplay) {
        this.isDisplay = false;
      } else {
        this.isDisplay = true;
      }
    },
    isItLiked() {
      if (this.isLiked) {
        this.isLiked = false;
        return -1;
      } else {
        this.isLiked = true;
        return 1;
      }
    },
    likePost(id) {
      let bodyLike = this.isItLiked();
      let user = JSON.parse(sessionStorage.getItem("user"));
      this.token = user.token;
      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      axios
        .post(
          `http://localhost:3000/api/feed/${id}/like`,
          {
            likes: bodyLike,
          },
          config
        )
        .then((res) => {
          if (res.status === 200) {
            this.getLike();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getLike() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      this.token = user.token;
      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      axios
        .get(`http://localhost:3000/api/feed/${this.post.id}/like`, config)
        .then((res) => {
          if (res.status === 200) {
            this.like = res.data;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    displayLiked() {
      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      axios
        .get(
          `http://localhost:3000/api/feed/${this.post.id}/like/${this.userId}`,
          config
        )
        .then((res) => {
          if (res.data !== null) {
            this.isLiked = true;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setInterval() {
      setInterval(() => {
        this.currentTime = new Date().toLocaleTimeString();
      }, 60000);
    },
  },
  mounted() {
    this.getLike();
    this.displayLiked();
  },
  created() {
    this.setInterval();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}
.infos img {
  object-fit: cover;
  margin: 0 1rem 0 0;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
}
.content {
  width: 100%;
  background-color: white;
  padding: 1.5rem 1.5rem 0;
  display: flex;
  flex-direction: column;
  p {
    text-overflow: fade;
  }
}
.imagePost {
  max-width: 100%;
  align-self: center;
  border-radius: 2.5rem;
  margin-bottom: 1.5rem;
}
header {
  border-radius: 2rem 2rem 0 0;
  display: flex;
  background-color: rgba(35, 49, 73, 0.972);
  background-image: linear-gradient(
    315deg,
    #4f6791 0%,
    rgba(35, 49, 73, 0.972) 74%
  );
  color: #fff2f2;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  .infos {
    display: flex;
    .subInfos {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .postUsername {
        font-weight: bold;
      }
    }
  }
  .icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 6rem;
    cursor: pointer;
    .fa-ellipsis-h {
      font-size: 2rem;
    }
    .fa-trash-alt {
      font-size: 2.5rem;
      color: var(--Secondary-Color-Alt);
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
    .fa-heart {
      font-size: 3rem;
      color: #d6bcbc;
    }
    .active {
      transition: 1s cubic-bezier(0.53, 0.48, 0, 1);
      color: transparent;
      background-color: #861657;
      background-image: linear-gradient(326deg, #861657 0%, #ffa69e 74%);
      background-clip: text;
    }
  }
}
footer {
  width: 100%;
  background-color: white;
  .numbers {
    cursor: pointer;
    display: flex;
    background-color: #d6bcbc;
    background-image: linear-gradient(
      315deg,
      #4f6791 0%,
      rgba(35, 49, 73, 0.972) 74%
    );
    color: #fff2f2;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1.5rem;
  }
  .commentWrapper {
    background-color: white;
    div {
      display: flex;
      align-items: center;
      padding: 1rem;
      margin: 0 1rem;
    }
    img {
      object-fit: cover;
      margin: 0 1rem 0 0;
      border-radius: 50%;
      width: 6rem;
      height: 6rem;
    }
  }
  .test {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff2f2;
    .fa-times {
      padding: 0 0.5rem;
      color: var(--Secondary-Color-Alt);
      cursor: pointer;
    }
  }
  .comment {
    font-size: 1.6rem;
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: white;
    .usernameComment {
      padding-right: 1.5rem;
      font-weight: 600;
    }
    .dateComment {
      font-size: 1.2rem;
      font-style: italic;
      display: flex;
      align-items: center;
      padding: 1rem;
    }
    .contentComment {
      padding: 1rem;
      flex: 1;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
