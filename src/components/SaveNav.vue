<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { eventBus } from "@/eventBus";
import { COLORS } from "../datas.ts";
import { useAppState } from "../utils/State.ts";
import { hexToCSS } from "../utils/utils.ts";
import closeSvg from "../assets/svg/close.svg?raw";
import restartSvg from "../assets/svg/restart.svg?raw";
import arSvg from "../assets/svg/ar.svg?raw";
import { useRouter } from "vue-router";

const router = useRouter();

const isUsdzReady = ref(false);
const USDZBlob = ref<string | null>(null);
const isUsdzProcessing = ref(false);
const linkAr = ref<HTMLAnchorElement | null>(null);

const isExportActive = ref(false);
const isImgReady = ref(false);
const IMGBlob = ref<string | null>(null);
const isImgProcessing = ref(false);
const linkImg = ref<HTMLAnchorElement | null>(null);

const gradientMix1 = ref("#D80084");
const gradientMix2 = ref("#FF8F66");
const gradientExport1 = ref("#D80084");
const gradientExport2 = ref("#FF8F66");
const isIos = ref(true);

function activeExport(value: boolean) {
  eventBus.emit("activeExport", value);
  router.push("draw");
}
function onActiveExport(value: boolean) {
  isExportActive.value = value;
}
function exportUsdz() {
  if (isUsdzProcessing.value) return;
  isUsdzProcessing.value = true;
  eventBus.emit("exportUsdz");
}
function exportPng() {
  if (isImgProcessing.value) return;
  isImgProcessing.value = true;
  setTimeout(() => {
    eventBus.emit("exportImg");
  }, 50);
}
function usdzReady(blob: string) {
  USDZBlob.value = blob;
  isUsdzReady.value = true;
  nextTick(() => {
    if (linkAr.value) {
      linkAr.value.click();
    }
  });
}
function imgReady(blob: string) {
  IMGBlob.value = blob;
  isImgReady.value = true;
  nextTick(() => {
    if (linkImg.value) {
      linkImg.value.click();
    }
  });
}
function onColorChanged(index: number) {
  const colors = COLORS[useAppState().colorCurrent.value];
  gradientMix1.value = hexToCSS(colors[0].dark);
  gradientMix2.value = hexToCSS(colors[0].pale);
  gradientExport1.value = hexToCSS(colors[2].dark);
  gradientExport2.value = hexToCSS(colors[1].dark);
}
onMounted(() => {
  eventBus.on("imgReady", imgReady);
  eventBus.on("usdzReady", usdzReady);
  eventBus.on("colorChanged", onColorChanged);
  eventBus.on("activeExport", onActiveExport);
  onColorChanged(0);
});
onBeforeUnmount(() => {
  eventBus.off("imgReady", imgReady);
  eventBus.off("usdzReady", usdzReady);
  eventBus.off("colorChanged", onColorChanged);
  eventBus.off("activeExport", onActiveExport);
});
</script>

<template>
  <div
    class="rangoli_ui"
    :class="{ 'show-export': isExportActive }"
    :style="{
      '--gradient-mix-1': gradientMix1,
      '--gradient-mix-2': gradientMix2,
      '--gradient-export-1': gradientExport1,
      '--gradient-export-2': gradientExport2,
    }"
  >
    <div class="rangoli_export">
      <ul :class="{ isIos: isIos }">
        <li class="imgExport">
          <div>
            <a
              v-if="!isImgReady"
              @click="exportPng"
              :style="{ opacity: isImgProcessing ? 0.4 : 1 }"
              ><div><span>Download</span></div></a
            >
            <a
              v-if="isImgReady"
              ref="linkImg"
              :href="IMGBlob || undefined"
              download="Rangoli_Wallpaper.png"
              ><div><span>Download</span></div></a
            >
          </div>
        </li>
        <li v-if="isIos" class="arExport">
          <div>
            <a
              v-if="!isUsdzReady"
              @click="exportUsdz"
              :style="{ opacity: isUsdzProcessing ? 0.4 : 1 }"
              ><img width="1" height="1" /><span><span v-html="arSvg"></span>View
              AR</span></a
            >
            <a
              v-if="isUsdzReady"
              ref="linkAr"
              rel="ar"
              :href="USDZBlob || undefined"
              download="Rangoli.usdz"
              ><img width="1" height="1" /><span><span v-html="arSvg"></span>View
              AR</span></a
            >
          </div>
        </li>
        <li>
          <button
            class="nav-btn"
            @click="activeExport(false)"
            aria-label="Close Menu"
          >
            <span v-html="restartSvg"></span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.rangoli_export > ul {
  position: relative;
  display: flex;
  &.isIos {
    justify-content: center !important;
  }
  align-items: center;
  gap: inherit;
  z-index: 1;
  visibility: hidden;
  white-space: nowrap;
  visibility: visible;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
  &::-webkit-scrollbar {
    display: none;
  }
  gap: 12px;
  li {
    flex: 0 0 auto;
    display: flex;
    &:nth-child(1),
    &:nth-child(2) {
      flex: 1;
    }
    --gradient: linear-gradient(
      90deg,
      var(--gradient-export-1) 20%,
      var(--gradient-export-2) 80%
    );
    &.imgExport {
      & > div {
        background: var(--gradient);
        color: #fff;
      }
    }
    &.arExport {
      & > div {
        background: var(--gradient);
        color: var(--gradient-export-1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        border: 3px solid transparent;
        &::before {
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: 9999px;
          padding: 3px;
          background: var(--gradient);
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      }
    }
    & > div {
      
      position: relative;
      width: 100%;
      height: 44px;
      font-size: 1.0rem;
      display: flex;
      border-radius: 6.6rem;
      a {
        width: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
        /* background-color: red; */
        /* &>div{ */
          &>img{
            position: absolute;
          }
            &>span {
              display: flex;
              &>span {
                height: 24px;
                width: 24px;
                display: inline-block;
                margin-right: 1px;
            }
          }
        /* } */
      }
    }
  }
}

.rangoli_ui {
  width: 100vw;
  & > * {
    width: 100%;
    flex-shrink: 0;
    padding: 0px 25px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    & > ul {
      position: relative;
      width: 100%;
      justify-content: space-between;
      & > li {
      }
    }
    transition:
      transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  & > * {
    &.rangoli_export {
      top: 50%;
      transform: translateY(-50%);
      
      /* transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1); */
      transition:
        opacity var(--transition-speed) ease,
        visibility var(--transition-speed) linear,
        filter var(--transition-speed) ease,
        transform var(--transition-speed) ease;
      position: absolute;
    }
  }

  .nav-btn {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: transparent;
    border: 3px solid var(--gradient-export-2);
    color: var(--gradient-export-2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;


    svg {
      display: block;
    }
  }
}
</style>
