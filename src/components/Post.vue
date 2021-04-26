<template>
  <div class="container">
    <header>
      <div class="infos">
        <img
          :src="post.User.image === null ? avatar : post.User.image"
          alt=""
        />
        <div class="subInfos">
          <span>{{ post.User.username }} | {{ isLiked }}</span>
          <span class="date">{{ moment(post.createdAt).fromNow() }}</span>
        </div>
      </div>
      <div class="icons">
        <span
          class="fas fa-heart"
          :class="classLike"
          @click="likePost(post.id), $emit('likeThePost')"
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
        <span>{{ post.comments }} commentaires</span>
      </div>
      <div v-if="isDisplay">
        <div class="comment" v-for="comment in post.Comments" :key="comment.id">
          {{ moment(comment.createdAt).fromNow() }} : {{ comment.content }}
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import avatar from "../assets/avatarDefault.png";
const moment = require("moment");
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
    };
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
    displayColor() {},
    toggle() {
      if (this.isDisplay) {
        this.isDisplay = false;
      } else {
        this.isDisplay = true;
      }
    },
    isItLiked() {
      let isLiked = this.isLiked;
      if (isLiked) {
        console.log("if : " + this.isLiked);
        this.isLiked = false;
        return -1;
      } else {
        console.log("else : " + this.isLiked);
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
            this.isLiked = !this.isLiked;
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
            console.log(res.data);
            this.like = res.data;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.getLike();
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
  .comment {
    padding: 0.5rem 1.5rem;
    background-color: #fff2f2;
    font-size: 1.6rem;
  }
}
</style>
