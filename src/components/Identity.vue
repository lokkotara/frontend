<template>
  <section class="leftPart">
    <img src="../assets/logo.png" alt="Emplacement logo" />
    <h1>Groupomania</h1>
    <h2>{{ msg }}</h2>
  </section>
</template>

<script>
export default {
  name: "Identity",
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
.leftPart {
  justify-content: space-around;
  text-align: center;
  img {
    width: 20rem;
    border-radius: 50%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  h1 {
    font-size: 5rem;
  }
  h2 {
    font-size: 3rem;
  }
}
</style>
