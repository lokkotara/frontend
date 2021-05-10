<template>
  <div class="mainWrapper">
    <Identity msg="Le réseau qui nous rapproche" />
    <Connexion />
  </div>
</template>

<script>
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
.mainWrapper {
  background-color: var(--Primary-Color);
}
</style>
