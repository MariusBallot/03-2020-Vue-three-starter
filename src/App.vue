<template>
  <div id="app">
    <div ref="textCanvas" class="textCanvas"></div>
    <div class="inContainer">
      <input type="text" ref="textInput" placeholder="Type something" autofocus />
    </div>
    <ThreeScene />
  </div>
</template>

<script>
import ThreeScene from "./components/ThreeScene.vue";
import TextCanvas from "./classes/TextCanvas";

export default {
  name: "App",
  components: {
    ThreeScene
  },
  mounted() {
    TextCanvas.init(this.$refs.textCanvas, this.$refs.textInput);
  }
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@1,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .inContainer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    input {
      pointer-events: all;
      background: none;
      font-family: 'Rubik' sans-serif;
      font-weight: 900;
      color: white;
      font-size: 4em;
      border: none;
      padding: 40px;
      border-radius: 30px;
      background: rgba(15, 15, 15, 0.3);

      &:focus {
        outline: none;
      }
    }
  }

  .textCanvas {
    width: 200px;
    height: 200px;
    position: absolute;
  }
}
</style>
