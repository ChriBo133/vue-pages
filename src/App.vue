<template>
  <div id="nav">
    <router-link to="/"><img style="height:auto; width:4vw" src="./assets/leaguelogo2.png"/></router-link>
  </div>
 <!-- <button @click="toggleFullscreen" class="fullscreenbutton">
      <img src="@/assets/fullscreen-icon.png" alt="Fullscreen Icon"  style="min-width: 30px; width:1.75vw; height: auto;"/>
  </button>    -->
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
    
    export default {
        methods: {
          toggleFullscreen() {
      const element = document.documentElement;

      if (!document.fullscreenElement) {
        // If not in fullscreen, request fullscreen
        if (element.requestFullscreen) {
          element.requestFullscreen();
        }
      } else {
        // If in fullscreen, exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  }
}
          
            

  
</script>

<style scoped>
button.fullscreenbutton {
    width: 0;
    position: fixed;
    top: 2.5vh;
    right: 2.75vw;
    background: none;
    border: none;
    margin: 0 !important;
    padding: 0 !important;
    cursor: pointer;
}

</style>