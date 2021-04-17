<template>
  <!-- <div class="mainWrapper"> -->
  <section class="leftPart">
    <img src="../assets/logo.png" alt="Emplacement logo" />
    <h1>Groupomania</h1>
    <h2>{{ msg }}</h2>
  </section>
  <!-- </div> -->
</template>

<script>
export default {
  name: "Identity",
  props: {
    msg: String,
  },
};
</script>

<style></style>
