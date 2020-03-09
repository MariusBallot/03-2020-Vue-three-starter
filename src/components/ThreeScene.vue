<template>
  <div class="threeScene"></div>
</template>

<script>
import ThreeScene from "@/classes/ThreeScene";

export default {
  name: "ThreeScene",
  mounted() {
    ThreeScene.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"></style>
