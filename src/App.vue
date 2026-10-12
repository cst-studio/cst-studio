<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ThreeCanvas from './views/ThreeCanvas.vue'
import Home from './views/HomeView.vue'
import TopNav from './components/TopNav.vue'
import { eventBus } from '@/eventBus'
import { ref } from 'vue'

const sceneIsReady = ref<Boolean | null>(null)
const percentGLB = ref<number>(0)
const percentTexture = ref<number>(0)
const checkLoading = () => {
  if(percentGLB.value==100 && percentTexture.value==100){
    document.querySelector("#cst--app")?.classList.remove('loading')
    setTimeout(()=>{
      sceneIsReady.value = true
    }, 1000)
  }
}
const onLoadTexture = (progress:number) => {
  percentTexture.value = Math.min(100, progress)
  checkLoading()
}
const onLoadGLB = (progress:number) => {
  percentGLB.value = Math.min(100, progress)
  checkLoading()
}
// const sceneReady = (isReady:boolean) => {
//   sceneIsReady.value = true
// }
// eventBus.on('sceneReady', sceneReady)
eventBus.on('loadGLB', onLoadGLB)
eventBus.on('loadTexture', onLoadTexture)
</script>

<template>
  <div v-if="!sceneIsReady" class="loader">
    <div class="loader-bar">
      <span></span>
      <span :style="`width:${Math.round((percentGLB + percentTexture) / 2)}%`"></span>
    </div>
    <!-- <div class="loader-digit" v-html="`${Math.round((percentGLB + percentTexture) / 2)}%`"></div> -->
  </div>
  <div class="cst--app" :class="{'intro' :!sceneIsReady}">
    <ThreeCanvas />
    <TopNav />
    <Home />
  </div>
</template>

<style scoped>
.cst--app{
  opacity: 1;
  transition: opacity 2s ease;
}
.cst--app.intro{
  opacity: 0;
}
#footer{
  position: relative;
  height: 40vh;
  width: 80vw;
  /* background-color: #d80084; */
  opacity: 0.1;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}
.loader {
  position: fixed;
  width: 100%;
  height: 100%;
  inset:0;
  font-size: 2rem;
  color: var(--red);
  background: var(--dark);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: var(--font-display);
  .loader-bar{
    position: relative;
    height: 20px;
    width: 50vw;
    &>span{
      position: absolute;
      display: block;
      height: 100%;
      &:nth-child(1){
        width: 100%;
        background-color: var(--red);
        opacity: 0.2;
      }
      &:nth-child(2){
        background-color: var(--red);
        width: 0%;
      }
    }
  }
}
.logo {
  display: block;
  margin: 0 auto 1.2rem;
}


</style>
