<template>
  <div class="commentLine">
    <img :src="image" alt="Photo de profil" />
    <input
      @keyup.enter="sendComment"
      v-model="comment"
      type="text"
      placeholder="Votre commentaire..."
    />
    <span @click="sendComment" class="fas fa-chevron-right validate"></span>
  </div>
</template>

<script>
import avatar from "../assets/avatarDefault.png";
import axios from "axios";
export default {
  name: "Comments",
  data() {
    return {
      image: "",
      comment: "",
    };
  },
  props: {
    postId: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getCurrentUser() {
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
    async sendComment() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      this.token = user.token;
      let newComment = {
        content: this.comment,
      };
      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      let id = this.postId.id;
      await axios
        .post(
          `http://localhost:3000/api/feed/${id}/comment`,
          newComment,
          config
        )
        .then((res) => {
          if (res.status === 201) {
            console.log("Commentaire envoyé" + res);
          }
        })
        .then(() => {
          this.$emit("get-all-posts");
        })
        .then(() => {
          this.comment = null;
        })
        .catch((e) => {
          console.error("erreur : " + e);
        });
    },
  },
  mounted() {
    this.getCurrentUser();
  },
};
</script>

<style lang="scss" scoped>
.commentLine {
  display: flex;
  background-color: #fff1f4;
  width: 100%;
  align-items: center;
  padding: 0.5rem 1.5rem;
  justify-content: space-between;
  flex: 1;
  border-radius: 0 0 2rem 2rem;
  img {
    object-fit: cover;
    margin: 0 1rem 0 0;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
  }
  .validate {
    background-image: linear-gradient(
      315deg,
      #4f6791 0%,
      rgba(35, 49, 73, 0.972) 74%
    );
    color: #fff2f2;
    padding: 1rem;
    width: 3.75rem;
    text-align: center;
    border-radius: 50%;
    margin: 0.5rem 1rem;
    font-size: 2rem;
  }
  input {
    flex: 1;
    border: 1px solid lightgrey;
    width: auto;
    &::placeholder {
      font-size: 1.4rem;
    }
  }
}
</style>
