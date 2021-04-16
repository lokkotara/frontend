<template>
  <div class="mainWrapper">
    <Identity msg="Réseau social d'entreprise" />
    <Connexion/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Identity from "@/components/Identity.vue";
import Connexion from "@/components/Connexion.vue";

export default {
  name: "Home",
  components: {
    Identity,
    Connexion,
  },
};
</script>

<style scoped lang="scss">

</style>
