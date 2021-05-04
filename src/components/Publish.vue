<template>
  <div class="publish">
    <div class="optionWrapper">
      <span class="fas fa-paragraph" @click="getContent">Texte</span>
      <span class="fas fa-paperclip" @click="getImage">Image</span>
      <span class="fas fa-chevron-right validate" @click="send">Publiez</span>
    </div>
    <div class="content">
      <p>{{ message }}</p>
      <img :src="newImage" alt="" class="imagePost" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Publish",
  data() {
    return {
      message: null,
      image: null,
      newImage: null,
      content: null,
    };
  },
  methods: {
    async getContent() {
      const { value: contentPost } = await this.$swal.fire({
        title: "Charger le contenu",
        input: "textarea",
        inputPlaceholder: "Modifiez votre post ici",
        showCloseButton: true,
        confirmButtonText: "Ajouter le texte",
      });
      if (contentPost) {
        console.log("contentPost : " + contentPost);
        this.message = contentPost;
      }
    },
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
        reader.onload = (e) => {
          this.newImage = e.target.result;
        };
        reader.readAsDataURL(imagePost);
        this.image = imagePost;
      }
    },
    async send() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      this.token = user.token;
      let newPost = new FormData();
      if (this.message !== null) {
        newPost.append("content", this.message);
      }
      if (this.newImage !== null) {
        newPost.append("image", this.image);
      }
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
          this.newImage = null;
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
  flex-direction: column;
  border-radius: 25px;
  padding: 0.5rem;
  .optionWrapper {
    display: flex;
    // flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
    // height: 100%;
    position: relative;
    top: 0;
    .fas {
      padding: 1rem;
      font-size: 2.5rem;
      height: 5rem;
      color: var(--Light-Color);
      cursor: pointer;
      &:before {
        padding-right: 0.5rem;
      }
    }
  }
  .content {
    background-color: white;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 1.5rem;
    border-radius: 2rem;
    .imagePost {
      max-width: 100%;
      align-self: center;
      border-radius: 2.5rem;
      margin-bottom: 1.5rem;
    }
  }
}
</style>
