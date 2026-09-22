<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { eventBus } from "@/eventBus";
import { COLORS } from "../datas.ts";
import { useAppState } from "../utils/State.ts";
import { hexToCSS } from "../utils/utils.ts";
import sparkleSvg from "../assets/svg/sparkles.svg?raw";
// import checkMarkSvg from "../assets/svg/checkMark.svg?raw";
import arrowDownSvg from "../assets/svg/arrowDown.svg?raw";
import { useRouter } from "vue-router";

const router = useRouter();

const isExportActive = ref(false);

const gradientMix1 = ref("#D80084");
const gradientMix2 = ref("#FF8F66");
const gradientExport1 = ref("#D80084");
const gradientExport2 = ref("#FF8F66");

function activeExport(value: boolean) {
  eventBus.emit("activeExport", value);
  router.push("save");
}
function onActiveExport(value: boolean) {
  isExportActive.value = value;
}
function rangoliColorize(value) {
  eventBus.emit("rangoliColorize", value);
}
function rangoliRandom() {
  eventBus.emit("rangoliRandom");
}
function onColorChanged(index: number) {
  const colors = COLORS[useAppState().colorCurrent.value];
  gradientMix1.value = hexToCSS(colors[0].dark);
  gradientMix2.value = hexToCSS(colors[0].pale);
  gradientExport1.value = hexToCSS(colors[1].dark);
  gradientExport2.value = hexToCSS(colors[2].dark);
}
onMounted(() => {
  eventBus.on("colorChanged", onColorChanged);
  eventBus.on("activeExport", onActiveExport);
  onColorChanged(0);
});
onBeforeUnmount(() => {
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
    <div class="rangoli_mix">
      <button @click="rangoliRandom">
        <span class="sparkle-icon" v-html="sparkleSvg"></span>
        <span>Mix it up</span>
      </button>
    </div>

    <hr />

    <div class="rangoli_ui2" :class="{ 'show-export': isExportActive }">
      <div class="rangoli_colors">
        <ul>
          <li 
            v-for="(_, index) in COLORS"
            :key="index"
            :class="{ selected: index === useAppState().colorCurrent.value }"
            @click="rangoliColorize(index)"
          >
            <div
              :style="{
                '--gradient-start':
                  '#' +
                  COLORS[index][0].dark
                    .toString(16)
                    .padStart(6, '0')
                    .toUpperCase(),
                '--gradient-end':
                  '#' +
                  COLORS[index][0].pale
                    .toString(16)
                    .padStart(6, '0')
                    .toUpperCase(),
              }"
            ></div>
          </li>
          <li>
            <button
              class="nav-btn"
              @click="activeExport(true)"
              aria-label="Next Menu"
            >
              <span v-html="arrowDownSvg"></span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rangoli_ui {
  display: flex;
  flex-direction: column;
  gap: 17px;
  top: 50%;
  margin: -10px;
  position: relative;
  transform: translateY(-50%);
  hr {
    position: relative;
    width: calc(100vw - 80px);
    margin-left: 40px;
    border: none;
    border-top: 1px solid #8a8a8a;
    opacity: 0.2;
    transition: opacity var(--transition-speed) ease;
  }
  &.show-export {
    hr {
      opacity: 0;
    }
    .rangoli_mix {
      opacity: 0;
      visibility: hidden;
      transform: translateY(5px);
      transition:
        opacity var(--transition-speed) ease,
        visibility var(--transition-speed) linear,
        filter var(--transition-speed) ease,
        transform var(--transition-speed) ease;
    }
  }
}

.rangoli_mix {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  visibility: visible;
  transition:
    opacity var(--transition-speed) ease,
    visibility var(--transition-speed) linear,
    filter var(--transition-speed) ease,
    transform 0.5s ease;

  Button {
    display: inline-flex;
    align-items: center;

    padding: 10px 20px;
    border-radius: 9999px;
    border: none;

    color: var(--gradient-mix-1);
    background-color: transparent;
    transition:
      color 0.5s ease,
      background-color 0.5s ease;

    /* font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      sans-serif; */
    font-size: 14px;
    font-weight: 500;

    cursor: pointer;
  }

  .sparkle-icon {
    width: 28px;
    height: 28px;
  }

}

.rangoli_colors > ul {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  white-space: nowrap;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
  &::-webkit-scrollbar {
    display: none;
  }

  li {
    flex: 0 0 auto;
    display: flex;

    & > div {
      position: relative;
      width: 38px;
      height: 38px;
      display: flex;
      border-radius: 6.6rem;
      justify-content: center;
      align-items: center;

      background: linear-gradient(
        135deg,
        var(--gradient-start) 0%,
        var(--gradient-start) 50%,
        var(--gradient-end) 50%,
        var(--gradient-end) 100%
      );
      &:before {
        width: 50px;
        height: 50px;
        position: absolute;
        top: -6px;
        left: -6px;
        border: 3px solid #222;
        border-radius: 6.6rem;
        content: "";
        transform: scale(1.1);
        opacity: 0;
        pointer-events: none;
        transition:
          transform var(--transition-speed) ease,
          opacity var(--transition-speed) ease;
      }
    }

    &.selected {
        pointer-events: none;
        & > div:before {
          opacity: 1;
          transform: scale(1);
      }
    }
  }
}

.rangoli_ui2 {
  display: flex;

  flex-direction: column;
  padding-top: 12px;
  height: 60px;
  position: relative;
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
    &.rangoli_colors {
      /* transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1); */
      transition:
        opacity var(--transition-speed) ease,
        visibility var(--transition-speed) linear,
        filter var(--transition-speed) ease,
        transform var(--transition-speed) ease;
      position: absolute;
    }
    &.rangoli_colors {
      opacity: 1;
      filter: blur(0px);
      visibility: visible;
      transform: translateY(0px);
      pointer-events: auto;
    }
  }
  &.show-export > * {
    &.rangoli_colors {
      opacity: 0;
      transform: translateY(-10px);
      filter: blur(3px);
      visibility: hidden;
      pointer-events: none;
    }
  }

  .nav-btn {
    position: relative;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #1a1a1a;
    color: #ffffff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    transition:
    transform 0.2s ease,
    background-color 0.2s ease;
    span{
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      svg {
      }

    }
  }
}
</style>
