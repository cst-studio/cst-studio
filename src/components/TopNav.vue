<script setup lang="ts">
import { t } from "@/strings";
import Burger from "../components/icons/IconBurger.vue";
import Logo from "../components/icons/IconLogo.vue";
import Close from "../components/icons/IconClose.vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

import { eventBus } from "@/eventBus";
import { ref, onMounted, onUnmounted } from 'vue'

const router = useRouter();
const route = useRoute();

const isScrolling = ref(false)

const isBurgerActive = ref<Boolean>(false);
const showBurger = ref<Boolean>(true);

const handleScroll = () => {
  isScrolling.value = window.scrollY > 500
}
const sections = [
  ["Accueil",".main-hero-section"],
  ["Services",".services-section"],
  ["Porductions",".prods-section"],
  ["Contact",".contact-section"],
]

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function onCloseClick() {
  if (route.path.includes("/draw")) {
    router.push(`/`);
    setTimeout(() => {
      eventBus.emit("activeExport", false);
    }, 300);
  } else if (route.path.includes("/save")) {
    eventBus.emit("activeExport", false);
    router.push(`/`);
  } else {
    router.push(`/`);
  }
}
function ScrollTo(selector : string) {
  isBurgerActive.value = false
  document.body.classList.remove("nav-opened")
  document.querySelector(selector)!.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}
function onBurgerClick() {
  isBurgerActive.value = !isBurgerActive.value
  if(isBurgerActive.value){
    document.body.classList.add("nav-opened")
  } else {
    document.body.classList.remove("nav-opened")
  }
  // async function shareLink() {
  //   try {
  //     await navigator.share({
  //       title: t("shareTitle"),
  //       text: t("shareText"),
  //       url: t("shareUrl"),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // shareLink();
}
</script>

<template>
  <header :class="{'top' : !isScrolling}"">
    <div>
      <div>
        <transition name="fade">
          <button @click="ScrollTo(sections[0][1])" class="icon-btn">
            <Logo />
          </button>
        </transition>
      </div>
      <div>
        <transition name="fade">
          <button v-if="showBurger" @click="onBurgerClick" class="icon-btn">
            <Burger :active=isBurgerActive />
          </button>
        </transition>
      </div>
    </div>
  </header>
  <main :class="{ 'opened': isBurgerActive }" v-on:click="isBurgerActive=false">
    <ul>
      <li v-for="section in sections" :key="section">
        <a v-on:click="ScrollTo(section[1])">
          {{ section[0] }}<span class="dot"></span>
        </a>
    </li>      
    </ul>
  </main>
</template>

<style scoped>
main{
  position: fixed;
  z-index: 98;
  inset: 0;
  background-color: #000E;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  &.opened{
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
    li{
      font-family: var(--font-display);
      font-size: 4.5rem;
      font-weight: 300;
      line-height: .87;
      letter-spacing: 2px;
      transition: transform 0.15s ease;
      &:hover{
        transform: translateX(10px);
      }
      a{
        cursor: pointer;
      }
    }
  }
}
button {
  -webkit-tap-highlight-color: transparent;
}
header {
  position: fixed;
  width: 100%;
  height: 100px;
  padding-left: 20px;
  padding-right: 20px;
      &:before{
        z-index: -1;
        transition: opacity 1s ease;
        content: '';
        position: absolute;
        inset:0;
        background: linear-gradient(to bottom, #080808FF, #08080800);
      }
      &.top{
        &:before{
          opacity: 0;
        }
      }      
      
      z-index: 10;
      z-index: 99;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > div {
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        /* background-color: red; */
        &>svg{
          
        }
      }
      &:first-child {
        /* transform: translateX(calc(var(--rgi--container-titl-marg) * -0.5)); */
        button {
          &>svg{
            width: 68px;
            height: 68px;
          }
      }
      }

      &:last-child {
        /* transform: translateX(calc(var(--rgi--container-titl-marg) * 0.5)); */
      }
    }
  }
}
.fade-leave-active {
  transition: opacity 0.7s ease;
}
.fade-enter-active {
  transition: opacity 0.7s ease 0.7s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
