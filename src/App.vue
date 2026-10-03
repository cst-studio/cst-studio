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
const onLoadTexture = (progress:number) => {
  percentTexture.value = progress
}
const onLoadGLB = (progress:number) => {
  percentGLB.value = progress
}
const sceneReady = (isReady:boolean) => {
  sceneIsReady.value = true
}
eventBus.on('sceneReady', sceneReady)
eventBus.on('loadGLB', onLoadGLB)
eventBus.on('loadTexture', onLoadTexture)
</script>

<template>
  <div v-if="!sceneIsReady" class="loader">
    <span v-html="`${Math.round((percentGLB + percentTexture) / 2)}%`"></span>
  </div>
  <div class="cst--app">
    <ThreeCanvas />
    <!-- <CutOut /> -->
    <TopNav />
    <Home />
    <!-- <div v-if="sceneIsReady">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </div> -->
    <div id="footer">FOOTER</div>
    
  </div>
</template>

<style scoped>
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
  position: absolute;
  width: 100%;
  height: 100%;
  inset:0;
  font-size: 12rem;
  color: var(--red);
  background: var(--dark);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo {
  display: block;
  margin: 0 auto 1.2rem;
}


</style>
