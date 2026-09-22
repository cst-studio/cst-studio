<script setup lang="ts">
import { gsap } from "gsap";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { t } from "@/strings";
import { eventBus } from "@/eventBus";
import { COLORS } from "../datas.ts";
import { hexToCSS } from "../utils/utils.ts";
import { useAppState } from "../utils/State.ts";

const gradientStart = ref("#D80084");
const gradientEnd = ref("#FF8F66");
const isTapCircleBump = ref(false);
const isTapCircleAnimate = ref(false);

const tapRight = ref(-50);
const tapTop = ref(0);
const animInTime = ref(900);

const isSkipTuto = ref(!false);
const appState = useAppState();
function onColorChanged(index: number) {
  const colors = COLORS[index];
  gradientStart.value = hexToCSS(colors[1].dark);
  gradientEnd.value = hexToCSS(colors[3].dark);
}

let tl: ReturnType<typeof gsap.timeline>;
onMounted(() => {
  eventBus.on("colorChanged", onColorChanged);
  const colors = COLORS[appState.colorCurrent.value];
  gradientStart.value = hexToCSS(colors[1].dark);
  gradientEnd.value = hexToCSS(colors[3].dark);
  tapRight.value = appState.screenWidth.value * 0.5 + 50;

  tl = gsap.timeline({
    repeatDelay: 0.1,
    delay: 0,
    repeat: -1,
  });
  const tapRights = [0.12, 0.48, -0.3, -0.12, 0.3];
  const tapTops = [-0.12, -0.48, -0.3, -0.12, -0.3];
  const tapLayers = [1, 3, 2, 1, 2];
  tapTops.forEach((item, i) => {
    const delay = 900 - tapRights[i];
    tl.call(
      () => {
        isTapCircleAnimate.value = true;
        animInTime.value = delay;
        tapTop.value = tapTops[i] * appState.screenWidth.value * 0.5;
        tapRight.value = tapRights[i] * appState.screenWidth.value * 0.5;
        isTapCircleBump.value = false;
      },
      [],
      "+=" + 0.1,
    )
      .call(
        () => {
          isTapCircleBump.value = true;
          eventBus.emit("addRipple", {
            x: 0.5 + tapRights[i] / 2,
            y:
              0.5 -
              (tapTops[i] / 2 / appState.screenHeight.value) *
                appState.screenWidth.value,
          });
        },
        [],
        "+=" + (delay / 1000 + 0.3),
      )
      .call(
        () => {
          eventBus.emit("rangoliLayerUp", tapLayers[i]);
          // eventBus.emit("saturateRangoli", true);
        },
        [],
        "+=" + 0.4,
      )
      .call(
        () => {
          isTapCircleAnimate.value = false;
          // let j = i+1
          // j = j>=tapTops.length?0:j
          // tapTop.value = tapTops[j];
          // tapRight.value = appState.screenWidth.value*0.5+50
        },
        [],
        "+=" + 0.9,
      )
      .call(() => {}, [], "+=1");
  });
});
onBeforeUnmount(() => {
  tl.kill();
});
</script>

<template>
  <main>
    <div class="h-3 tuto">
      <header class="rgi-title-header">
        <h2 v-html="t('drawTutoEyebrow')" style="margin-bottom: 5px;"></h2>
        <h1 v-html="t('drawTutoTitle')"></h1>
      </header>
      <div>
        <div
          class="tap-circle"
          :class="{ bump: isTapCircleBump, animated: isTapCircleAnimate }"
          :style="{
            '--anim-in-time': animInTime + 'ms',
            transform:
              'translateY(' +
              tapTop +
              'px)' +
              ' ' +
              'translateX(' +
              tapRight +
              'px)',
          }"
        ></div>
      </div>
      <div
        :style="{
          '--gradient-start': gradientStart,
          '--gradient-end': gradientEnd,
        }"
      >
        <RouterLink
          to="/draw"
          class="BtSkip gradient-btn"
          :class="{ show: isSkipTuto }"
        >
          {{ t("drawTutoSkip") }}
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes bump {
  0% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.5);
  }
  30% {
    transform: scale(0.9);
  }
  35% {
    transform: scale(1);
    opacity: 1;
  }
  40% {
  }
  100% {
    opacity: 0;
  }
}

.tap-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  &.animated {
    transition: transform var(--anim-in-time) ease;
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    /* background-color: rgba(209, 218, 222, 0.3); */
    /* border: 2px solid #a3bcca; */
    background-color: rgba(72, 176, 255, 0.2);
    border: 2px solid #48b0ff;
    border-radius: 9999px;
    width: 50px;
    height: 50px;
    margin-top: -25px;
    margin-left: -25px;
    opacity: 1;
  }
  &.bump {
    &::after {
      animation: bump 900ms ease-out forwards;
    }
  }
}

.BtSkip {
  position: absolute;
  top: 50%;
  transform: translateY(calc(-50%));
  color: var(--gradient-start);
  transition:
    color 0.5s ease,
    opacity 0.5s ease;
  visibility: hidden;
  &.show {
    visibility: visible;
  }
}
</style>
