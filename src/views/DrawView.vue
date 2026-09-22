<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { eventBus } from "@/eventBus";
import CustomNav from "../components/CustomNav.vue";
import { t } from "@/strings";
import type { Point } from "../utils/utils.ts";

const isExportActive = ref(false);
function onActiveExport(value: boolean) {
  isExportActive.value = value;
}
onMounted(() => {
  console.warn("DRAW VIEW MOUNTED!!");
  eventBus.on("activeExport", onActiveExport);
});
onBeforeUnmount(() => {
  eventBus.off("activeExport", onActiveExport);
});

const drawArea = ref<HTMLDivElement | null>(null);
let rect: DOMRect;

function getMousePoint(e: MouseEvent | TouchEvent): Point {
  const rect = drawArea.value!.getBoundingClientRect();
  const t = (e as TouchEvent).touches?.[0];
  const clientX = t ? t.clientX : (e as MouseEvent).clientX;
  const clientY = t ? t.clientY : (e as MouseEvent).clientY;
  return {
    x: Math.round(clientX - rect.left),
    y: Math.round(clientY - rect.top),
  };
}
function pointerDown(e: MouseEvent | TouchEvent) {
  const p = getMousePoint(e);
  rect = drawArea.value!.getBoundingClientRect();
  const mouse: Point = {
    x: (p.x / rect.width) * 2 - 1,
    y: (-p.y / rect.height) * 2 + 1,
  };
  eventBus.emit("rangoliClick", mouse);
}
const pointerDownTouch = (e: TouchEvent) => pointerDown(e);

function pointerUp() {}
</script>

<template>
  <main>
    <div
      class="draw-area"
      :class="{ 'show-export': isExportActive }"
      ref="drawArea"
      @mousedown="pointerDown"
      @mouseup="pointerUp"
      @mouseleave="pointerUp"
      @touchstart.prevent="pointerDownTouch"
      @touchend.prevent="pointerUp"
      @touchcancel.prevent="pointerUp"
    >
      <hr class="line-1" />
      <hr class="line-2" />
      <hr class="line-3" />
      <hr class="line-4" />
    </div>
    <div class="h-3 draw">
      <header class="rgi-title-header">
        <span v-html="t('drawYourOwn')"></span>
      </header>
      <div></div>
      <div>
        <CustomNav />
      </div>
    </div>
  </main>
</template>

<style scoped>
.h-3 > *:nth-child(3) {
  /* background-color: rgba(0,0,250,0.5); */
}
.h-3 > *:nth-child(1) {
  /* background-color: rgba(0,250,0,0.5); */
}
.h-3 > *:nth-child(2) {
  pointer-events: none;
  /* background-color: rgba(250,0,0,0.5); */
}

.draw-area {
  width: 100%;
  height: 100%;
  position: absolute;
  top: -10vw;
  hr {
    position: absolute;
    background-color: red;
    top: 50%;
    left: 0;
    width: 100vw;
    height: 2px;
    border: none;
    opacity: 0;
    &.line-1 {
      transform: rotateZ(45deg);
    }
    &.line-2 {
      transform: rotateZ(-45deg);
    }
    &.line-3 {
      background-color: green;
      transform: rotateZ(30deg);
    }
    &.line-4 {
      background-color: green;
      transform: rotateZ(-30deg);
    }
  }
  &.show-export {
    pointer-events: none;
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100vw;
    height: 100vw;
    top: calc(50% - 50vw);
    border-radius: 99999px;
    opacity: 0.1;
    opacity: 0;
  }
  &::before {
    border: 3px solid red;
    transform: scale(0.7);
  }
  &::after {
    border: 3px solid blue;
    transform: scale(1);
  }
}
</style>
