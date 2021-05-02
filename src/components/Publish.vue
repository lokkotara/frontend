<template>
  <div class="publish">
    <textarea
      v-model="message"
      placeholder="Que voulez-vous partagez... ?"
    ></textarea>
    <img :src="image" alt="" />
    <div class="optionWrapper">
      <span class="fas fa-grin-beam"></span>
      <span class="fas fa-paperclip" @click="getImage"></span>
      <span class="fas fa-chevron-right validate" @click="send"></span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Publish",
  data() {
    return {
      message: "",
      image: null,
    };
  },
  methods: {
    async getImage() {
      const { value: imagePost } = await this.$swal.fire({
        title: "Choisissez une image",
        input: "file",
        inputAttributes: {
          accept: "image/jpg, image/jpeg, image/png",
          "aria-label": "Upload your profile picture",
        },
      });
      if (imagePost) {
        const reader = new FileReader();
        reader.readAsDataURL(imagePost);
        this.image = imagePost;
      }
      this.$swal("Une image a été ajouté!!", "", "success");
    },
    async send() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.token = user.token;
      let newPost = new FormData();
      newPost.append("content", this.message);
      newPost.append("image", this.image);
      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
          "Content-Type": "application/form-data",
        },
      };
      await axios
        .post(`http://localhost:3000/api/feed/`, newPost, config)
        .then((res) => {
          if (res.status === 201) {
            console.log("Post envoyé");
          }
        })
        .then(() => {
          this.$emit("get-all-posts");
        })
        .then(() => {
          this.message = null;
        })
        .catch((e) => {
          console.error("erreur : " + e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.publish {
  background-color: rgba(35, 49, 73, 0.972);
  background-image: linear-gradient(
    315deg,
    #4f6791 0%,
    rgba(35, 49, 73, 0.972) 74%
  );
  margin: 5rem 0 0 0;
  width: 90%;
  max-width: 80rem;
  display: flex;
  border-radius: 25px;
  padding: 0.5rem;
  textarea {
    height: 16rem;
    width: 100%;
    border-radius: 20px 0 0 20px;
    flex: 1;
    padding-left: 2rem;
  }
  .optionWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 7rem;
    height: 100%;
    position: relative;
    top: 0;
    .fas {
      padding: 1rem;
      font-size: 2.5rem;
      height: 5rem;
      color: var(--Light-Color);
    }
  }
}
.test {
  background-color: lightgray;
}
</style>
