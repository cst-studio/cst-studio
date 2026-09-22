<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from "vue";
import { eventBus } from "@/eventBus";

const widthRef = ref(window.innerWidth);
const heightRef = ref(window.innerHeight);
const isExportActive = ref(false);
const marginLeft = 25;
const marginTopRef = ref(25);
const marginBottomRef = ref(25);

const onResize = (payload) => {
  const mixBtHeight = 48;
  const gap = 17;
  const marginSize = (payload.height - payload.width)/2;
  
  const mb = marginSize + payload.width*0.1
  marginBottomRef.value = mb - mb*0.2 - 0.05*payload.width;
  marginTopRef.value = marginSize - payload.width*0.1 - mb*0.2 - 0.05*payload.width
  

// flex: 0 0 calc((var(--vh) - 120vw) * 0.5 - 10vw);
marginTopRef.value = (payload.height-payload.width*1.2)*0.5 - 0.1*payload.width
marginBottomRef.value = (payload.height-payload.width*1.2)*0.5 + 0.1*payload.width




  widthRef.value = payload.width;
  heightRef.value = payload.height;
};
const onActiveExport = (value: boolean) => {
  isExportActive.value = value;
};
onMounted(() => {
  eventBus.on("resize", onResize);
  eventBus.on("activeExport", onActiveExport);
});

onBeforeUnmount(() => {
  eventBus.off("resize", onResize);
  eventBus.off("activeExport", onActiveExport);
});
</script>

<template>
  <svg
    class="overlay"
    :class="{ 'show-export': isExportActive }"
    :width="widthRef"
    :height="heightRef"
    :viewBox="`0 0 ${widthRef} ${heightRef}`"
  >
    <defs>
      <mask id="cutout">
        <rect :width="widthRef" :height="heightRef" fill="white" />
        <rect
          :x="marginLeft"
          :y="marginTopRef"
          :width="widthRef - marginLeft * 2"
          :height="heightRef - marginTopRef - marginBottomRef"
          rx="30"
          fill="black"
        />
      </mask>
    </defs>

    <rect
      :width="widthRef"
      :height="heightRef"
      fill="currentColor"
      mask="url(#cutout)"
    />
  </svg>
</template>

<style scoped>
.overlay {
  /* background-color: red; */
  pointer-events: none;
  color: var(--color-background);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transform: scale(1.2);
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
  &.show-export {
    opacity: 1;
    /* opacity: 0; */
    transform: scale(1);
  }
}
</style>
