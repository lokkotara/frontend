<template>
    <header class="mainHeader">
        <img src="../assets/logoLong.png" class="logoLong" alt="">
        <img src="../assets/logo.png" class="logoShort" alt="">
    <div class="profileBtn">
      <span>Lokkotara</span>
      <img src="../assets/beau_gosse1617867815195.jpg" alt="">
      <span class="fas fa-sort-down"></span>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
}
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
.logoLong {
    display: none;
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
@media screen and(min-width:768px){
  .logoLong {
    display: block;
  }
  .logoShort {
    display: none;
  }
}
</style>