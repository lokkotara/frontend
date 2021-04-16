<template>
  <div>
    <Header/>
    <main class="mainFeed">
      <h1>Fil d'actualité</h1>
      <article class="postArticle">
        <header>
          <div class="infos">
            <span>Lokkotara</span>
            <span>15/04/2021</span>
          </div>
          <div class="icons">
            <span class="fas fa-heart"></span>
            <span class="fas fa-ellipsis-h"></span>
          </div>
        </header>
        <div class="content">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A suscipit necessitatibus unde enim vel repellat doloremque dignissimos nobis omnis. Quas suscipit incidunt fuga maiores tenetur delectus possimus impedit? Enim, animi?</p>
        </div>
        <footer>
          <div class="numbers">
            <span>18 likes</span>
            <span>3 commentaires</span>
          </div>
          <div class="commentLine">
            <img src="../assets/femme_au_voile1618230036501.jpg" alt="">
            <input type="text" placeholder="Votre commentaire...">
            <span class="fas fa-chevron-right validate"></span>
          </div>
        </footer>
      </article>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
export default {
  name: "Feed",
  components: {
    Header,
  },
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
  .mainHeader {
  width: 100%;
  background-color: rgba(35, 49, 73, 0.972);
  background-image: linear-gradient(315deg, #4f6791 0%, rgba(35, 49, 73, 0.972) 74%);
  color: #fff2f2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem 0;
  img {
    height: 5rem;
  }
}
.profileBtn {
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  img {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    margin-left: 1rem;
  }
  .fa-sort-down {
    font-size: 2.5rem;
    margin-left: 1.5rem;
    border-radius: 50%;
    text-align: center;
  }
}
.dropDown {
  margin-left: auto;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  width: max-content;
  padding: 0 2rem 2rem 1rem;
  color: #fff2f2;
  background-image: linear-gradient(315deg, #4f6791 0%, rgba(35, 49, 73, 0.972) 74%);
}
nav ul{
  display: flex;
  flex-direction: column;
}
.commentLine img{
  width: 3rem;
  height: 3rem;
  margin: 0.5rem 1rem;
  border-radius: 50%;
}
.postArticle {
  border-radius: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  width: 90%;
  max-width: 80rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    padding: 0 1.5rem;
  }
  header {
    border-radius: 2rem 2rem 0 0;
    display: flex;
    background-color: rgba(35, 49, 73, 0.972);
    background-image: linear-gradient(315deg, #4f6791 0%, rgba(35, 49, 73, 0.972) 74%);
    color: #fff2f2;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    .infos {
      display: flex;
      flex-direction: column;
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
          transition: 1s cubic-bezier(.53,.48,0,1);
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
      background-image: linear-gradient(315deg, #4f6791 0%, rgba(35, 49, 73, 0.972) 74%);
      color: #fff2f2;
      width: 100%; 
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1.5rem;
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
    background-image: linear-gradient(315deg, #4f6791 0%, rgba(35, 49, 73, 0.972) 74%);
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