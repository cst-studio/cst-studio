<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ThreeCanvas from './views/ThreeCanvas.vue'
import Home from './views/HomeView.vue'
import TopNav from './components/TopNav.vue'
import { eventBus } from '@/eventBus'
import { ref } from 'vue'

const sceneIsReady = ref<Boolean | null>(null)
const hasLoader = ref<Boolean>(true)
const percentGLB = ref<number>(0)
const percentTexture = ref<number>(0)
const percenAll = ref<number>(0)
const checkLoading = () => {
  percenAll.value = (percentGLB.value + percentTexture.value)*1.1
  if(percentGLB.value==100 && percentTexture.value==100){
    document.querySelector("#cst--app")?.classList.remove('loading')
    hasLoader.value = false
    setTimeout(()=>{
      sceneIsReady.value = true
    }, 2000)
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
  <div v-if="!sceneIsReady" class="loader" :class="{'hide' : !hasLoader}">
    <div class="loader-bar">
      <span></span>
      <span :style="`width:calc((100% - 20px) * ${(percentGLB + percentTexture) / 200} + 10px)`"></span>
      <span :style="`left:calc((100% - 20px) * ${(percentGLB + percentTexture) / 200})`"></span>
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
  opacity: 1;
  transition: opacity 2s ease;
  &.hide{
    opacity: 0;
  }
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
        background-color: white;
        opacity: 0.2;
        border-radius: 10px;
      }
      &:nth-child(2){
        background-color: white;
        opacity: 0.2;
        width: 0%;
        border-radius: 10px;
      }
      &:nth-child(3){
        background-color: var(--red);
        width: 20px;
        border-radius: 10px;
      }
    }
  }
}
.logo {
  display: block;
  margin: 0 auto 1.2rem;
}


</style>
