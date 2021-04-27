<template>
  <div class="publish">
    <textarea
      v-model="message"
      placeholder="Que voulez-vous partagez... ?"
    ></textarea>
    <div class="optionWrapper">
      <span class="fas fa-grin-beam"></span>
      <span class="fas fa-paperclip"></span>
      <span class="fas fa-chevron-right validate"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Publish",
  data() {
    return {};
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
