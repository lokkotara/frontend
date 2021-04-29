<template>
  <div>
    <Header />
    <main class="mainFeed">
      <Publish @get-all-posts="getAllPosts" />
      <h1>Fil d'actualité</h1>
      <article class="postArticle" v-for="post in allPosts" :key="post.id">
        <Post :post="post" :likes="post.likes" :commentsProps="post.comments" />
        <Comments :postId="post" @get-all-posts="getAllPosts" />
      </article>
    </main>
  </div>
</template>

<script>
import Comments from "../components/Comments.vue";
import Post from "../components/Post.vue";
import Header from "../components/Header.vue";
import Publish from "../components/Publish.vue";
import avatar from "../assets/avatarDefault.png";
const moment = require("moment");
moment.locale("fr");
import axios from "axios";
export default {
  name: "Feed",
  components: {
    Header,
    Publish,
    Post,
    Comments,
  },
  data() {
    return {
      moment: moment,
      token: "",
      commentsContainer: null,
      userId: "",
      isAdmin: "",
      avatar: avatar,
      image: "",
      allPosts: [],
      allComments: [],
    };
  },
  methods: {
    getAllPosts() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.token = user.token;
      this.userId = user.userId;
      this.isAdmin = user.isAdmin;
      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      axios
        .get("http://localhost:3000/api/feed/", config)
        .then((res) => {
          return res;
        })
        .then((res) => {
          this.allPosts = res.data;
        })
        .catch((error) => {
          console.error({ error });
        });
    },
  },
  mounted() {
    this.getAllPosts();
  },
};
</script>

<style scoped lang="scss">
.mainFeed {
  background-image: url(../assets/ville.jpg);
  background-attachment: fixed;
}
.commentLine img {
  object-fit: cover;
  margin: 0 1rem 0 0;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
}
.postArticle {
  border-radius: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 90%;
  max-width: 80rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: auto;
    &::placeholder {
      font-size: 1.4rem;
    }
  }
}
.mainFeed {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
