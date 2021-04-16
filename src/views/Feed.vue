<template>
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
</template>

<script>
export default {
  name: "Feed",
  props: {
    msg: String,
  },
};
</script>

<style>

</style>