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
          <span class="date">{{ moment(post.createdAt).fromNow() }}</span>
        </div>
      </div>
      <div class="icons">
        <span
          class="fas fa-heart"
          :class="{ active: isLiked }"
          @click="isItLiked, likePost(post.id)"
        ></span>
        <span class="fas fa-ellipsis-h"></span>
      </div>
    </header>
    <div class="content">
      <p>{{ post.content }}</p>
    </div>
    <footer>
      <div class="numbers" @click="toggle">
        <span>{{ like.length }} likes</span>
        <span>{{ comments.length }} commentaires</span>
      </div>
      <div v-if="isDisplay">
        <div
          class="commentWrapper"
          v-for="comment in comments"
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
                {{ moment(comment.createdAt).fromNow() }}</span
              >
              <span class="contentComment">{{ comment.content }}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import avatar from "../assets/avatarDefault.png";
let moment = require("moment");
moment.locale("fr");
import axios from "axios";
export default {
  name: "Feed",
  components: {},
  data() {
    return {
      token: "",
      moment: moment,
      avatar: avatar,
      active: false,
      isDisplay: false,
      isLiked: "",
      like: [],
      comments: [],
    };
  },
  computed: {
    date: function () {
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
  },
  methods: {
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
      let user = JSON.parse(localStorage.getItem("user"));
      this.token = user.token;
      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      console.log("bodyLike likes : " + bodyLike);
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
            console.log("Vote pris en compte !");
            this.getLike();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getLike() {
      let user = JSON.parse(localStorage.getItem("user"));
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
      let user = JSON.parse(localStorage.getItem("user"));
      this.token = user.token;
      this.userId = user.userId;
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
    getComments() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.token = user.token;
      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      axios
        .get(`http://localhost:3000/api/feed/${this.post.id}/comment`, config)
        .then((res) => {
          if (res.status === 200) {
            this.comments = res.data;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.getLike();
    this.getComments();
    this.displayLiked();
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
  // padding: 1rem;
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
      background-color: #fff2f2;
      font-style: italic;
      display: flex;
      align-items: center;
      padding: 1rem;
      // border-radius: 0 1.5rem 1.5rem 0;
    }
    .contentComment {
      padding: 1rem;
      // background-color: white;
      flex: 1;
      // border-radius: 1.5rem 0 0 1.5rem;
    }
  }
}
</style>
