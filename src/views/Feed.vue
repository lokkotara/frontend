<template>
  <div>
    <Header />
    <main class="mainFeed">
      <h1>Fil d'actualité</h1>
      <article class="postArticle" v-for="post in allPosts" :key="post.id">
        <header>
          <div class="infos">
            <img :src="post.User.image" alt="" />
            <div class="subInfos">
              <span>{{ post.User.username }}</span>
              <span class="date">{{ moment(post.createdAt).fromNow() }}</span>
            </div>
          </div>
          <div class="icons">
            <span class="fas fa-heart" @click="likePost(post.id)"></span>
            <span class="fas fa-ellipsis-h"></span>
          </div>
        </header>
        <div class="content">
          <p>
            {{ post.content }}
          </p>
        </div>
        <footer>
          <div class="numbers">
            <span>{{ post.likes }} likes</span>
            <span>{{ post.comments }} commentaires</span>
          </div>
          <div
            class="comment"
            v-for="comment in post.Comments"
            :key="comment.id"
          >
            {{ moment(comment.createdAt).fromNow() }} : {{ comment.content }}
          </div>
          <span
            class="postComments"
            v-for="comment in allComments"
            :key="comment.id"
          >
            <img :src="post.User.image" alt="" />
            <p>{{ comment.id }}</p>
          </span>
          <div class="commentLine">
            <img src="../assets/beau_gosse1617867815195.jpg" alt="" />
            <input type="text" placeholder="Votre commentaire..." />
            <span class="fas fa-chevron-right validate"></span>
          </div>
        </footer>
      </article>
    </main>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
const moment = require("moment");
moment.locale("fr");
import axios from "axios";
export default {
  name: "Feed",
  components: {
    Header,
  },
  data() {
    return {
      moment: moment,
      token: "",
      userId: "",
      isAdmin: "",
      allPosts: [],
      allComments: [],
    };
  },
  methods: {
    likePost(id) {
      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      axios
        .post(
          "http://localhost:3000/api/feed/" + id + "/like",
          {
            likes: 1,
          },
          config
        )
        .then((res) => {
          if (res.status === 200) {
            console.log("Vote pris en compte !");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
          this.allPosts = res.data;
        })
        .catch((error) => {
          console.error({ error });
        });
    },
  },
  beforeMount() {
    this.getAllPosts();
  },
};
</script>

<style scoped lang="scss">
.commentLine img,
.infos img {
  object-fit: cover;
  margin: 0 1rem 0 0;
  border-radius: 50%;
}
.commentLine img {
  width: 4rem;
  height: 4rem;
}
.infos img {
  width: 6rem;
  height: 6rem;
}
.date {
  font-style: italic;
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
  .content {
    padding: 0 1.5rem;
    p {
      text-overflow: fade;
    }
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
      }
    }
    .icons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 6rem;
      .fa-ellipsis-h {
        font-size: 2rem;
      }
      .fa-heart {
        font-size: 3rem;
        color: #d6bcbc;
        &:hover {
          transition: 1s cubic-bezier(0.53, 0.48, 0, 1);
          color: transparent;
          background-color: #861657;
          background-image: linear-gradient(326deg, #861657 0%, #ffa69e 74%);
          background-clip: text;
        }
      }
    }
  }
  input {
    width: auto;
    &::placeholder {
      font-size: 1.4rem;
    }
  }
  footer {
    width: 100%;
    .numbers {
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
    .comment {
      padding: 0.5rem 1.5rem;
      background-color: #fff2f2;
      font-size: 1.6rem;
    }
  }
}

.mainFeed {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.commentLine {
  display: flex;
  background-color: #fff1f4;
  width: 100%;
  align-items: center;
  padding: 0.5rem 1.5rem;
  justify-content: space-between;
  flex: 1;
  border-radius: 0 0 2rem 2rem;
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
  }
}
</style>
