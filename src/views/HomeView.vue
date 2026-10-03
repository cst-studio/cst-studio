<script setup lang="ts">
import videoProdImage from '@/assets/images/CST-video-prod.jpeg'
import droneImage from '@/assets/images/CST-drone.jpg'
import photoImage from '@/assets/images/CST-photo.jpeg'
import wipImage from '@/assets/images/work-in-progress.jpg'
import { RouterLink } from "vue-router";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { eventBus } from "@/eventBus";
import { hexToCSS } from "../utils/utils.ts";
import { useAppState } from "../utils/State.ts";

import { t } from "@/strings";

const gradientStart = ref("#D80084");
const gradientEnd = ref("#FF8F66");

onMounted(() => {
  eventBus.emit("introCst");
});

onBeforeUnmount(() => {});
</script>

<template>
  <main class="main">
    <div id="main-hero">
      <div id="main-hero-p1"></div>
      <div id="main-hero-p2"></div>
    </div>
    <section class="main-hero-section" >
      <div class="main-hero-section-sticky" >
      <header>
        
      </header>
      <main></main>
      <footer>
        <h1 class="font-display">Votre vision<br>
en Image<span class="dot"></span></h1>
        <p>Du concept à la livraison, nous transformons vos idées <br>en contenus visuels qui captivent, convertissent et marquent les esprits.</p>

      </footer>
      </div>
    </section>



<section class="horizontal-section services-section">
  <div class="horizontal-sticky">
    <header>
      <h1>Nos Services<span class="dot"></span></h1>
      <p>Production audiovisuelle clé en main, de la conception à la diffusion.</p>
    </header>
    <main class="horizontal-track">
      <article>
        <div>
          <h2> 01 <span class="red">—</span> PRODUCTION VIDÉO </h2>
          <h3>Vidéo d'Entreprise</h3>
          <p>Films institutionnels, publicités digitales, interviews corporate, reportages événementiels. L'exigence du cinéma au service de votre message.</p>
        </div>
        <img :src="videoProdImage" alt="Video Production" />
      </article>
      <article>
        <div>
          <h2> 02 <span class="red">—</span> IMAGERIE AÉRIENNE </h2>
          <h3>Drone & Aérien</h3>
          <p>Drone certifié catégorie A1/A3, prises de vue 4K à 360°, time-lapse aériens. Des angles impossibles qui subliment vos espaces et événements.</p>
        </div>
        <img :src="droneImage" alt="Drone & Aérien" />
      </article>
      <article>
        <div>
          <h2> 03 <span class="red">—</span> PHOTOGRAPHIE </h2>
          <h3>Photo Corporate</h3>
          <p>Portraits corporate, shooting événementiel, photographie d'architecture et de produit. Des images qui renforcent votre identité visuelle.</p>
        </div>
        <img :src="photoImage" alt="Photo Corporate" />
      </article>
      <article>
        <div>
          <h2> 04 <span class="red">—</span> ÉVÉNEMENTIEL </h2>
          <h3>Couverture & Interviews</h3>
          <p>Captation d'événements, interviews sur le vif, aftermovies et contenus immersifs. Nous racontons l'énergie de vos événements à travers des images spontanées et authentiques.</p>
        </div>
        <img :src="wipImage" alt="Web & Digital" />
      </article>
      <article>
        <div>
          <h2> 05 <span class="red">—</span> RÉSEAUX SOCIAUX </h2>
          <h3>Social Media Content</h3>
          <p>Reels, vidéos courtes, interviews et contenus verticaux pensés pour les réseaux sociaux. Du tournage à la publication, des formats qui captent l'attention et font vivre votre actualité.</p>
        </div>
        <img :src="wipImage" alt="Web & Digital" />
      </article>
    </main>
    <footer>
      <p class="quote">Chaque projet reçoit l'exigence d'un film et la précision d'un brief stratégique.</p>
    </footer>
  </div>
</section>





<section class="horizontal-section prods-section">
  <div class="horizontal-sticky">
    <header>
      <h1>Dernieres Prods<span class="dot"></span></h1>
      <p>Les dernières histoires que nous avons imaginées, produites et mises en images.</p>
    </header>
    <main class="horizontal-track">
      <article>
        <div>
          <h2> 01 <span class="red">—</span> PRODUCTION VIDÉO </h2>
          <h3>Vidéo d'Entreprise</h3>
          <p>Films institutionnels, publicités digitales, interviews corporate, reportages événementiels. L'exigence du cinéma au service de votre message.</p>
        </div>
      </article>
      <article>
        <div>
          <h2> 02 <span class="red">—</span> IMAGERIE AÉRIENNE </h2>
          <h3>Drone & Aérien</h3>
          <p>Drone certifié catégorie A1/A3, prises de vue 4K à 360°, time-lapse aériens. Des angles impossibles qui subliment vos espaces et événements.</p>
        </div>
      </article>
      <article>
        <div>
          <h2> 03 <span class="red">—</span> PHOTOGRAPHIE </h2>
          <h3>Photo Corporate</h3>
          <p>Portraits corporate, shooting événementiel, photographie d'architecture et de produit. Des images qui renforcent votre identité visuelle.</p>
        </div>
      </article>
      <article>
        <div>
          <h2> 04 <span class="red">—</span> WEB & DIGITAL </h2>
          <h3>Site Internet</h3>
          <p>Conception web sur mesure, identité digitale, landing pages haute performance. Votre vitrine en ligne pensée pour attirer, convaincre et convertir.</p>
        </div>
      </article>
    </main>
    <footer>
      <p class="quote">Du premier brief au dernier plan, chaque image compte.</p>
    </footer>
  </div>
</section>

<section class="section-half">
</section>


  </main>
</template>

<style scoped>
#main-hero{
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 400vh;
  #main-hero-p1{
    position: relative;
    /* background: #00f6; */
    height: 300vh;
    width: 100%;
  }
  #main-hero-p2{
    /* background: #0f06; */
    position: relative;
    height: 100vh;
    width: 100%;
  }

}
.main-hero{
  
}
main.main {
  position: relative;
  display: flex;
  flex-direction: column;
  .main-hero-section{
    height: 400vh;
    position: relative;
    top: 0;
    margin-bottom: 50vh;
    /* background: linear-gradient(to bottom, #f0f6, #0f06); */
    .main-hero-section-sticky{
      position: sticky;
      top: 0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      /* align-items: center; */
      header{
        flex: 1;
        /* background: linear-gradient(to bottom, #f0f6, #f006); */
      }
      main{
        /* flex: 1; */
        /* background: linear-gradient(to bottom, #f0f6, #00f6); */
      }
      footer{
        /* background: linear-gradient(to bottom, #f0f6, #0f06); */
        margin-left: 60px;
        margin-bottom: 60px;
      }
    }
  }
  .services-section,.prods-section{
    /* background: linear-gradient(to bottom, #f0f6, #0f06); */
    margin-bottom: 50vh;
    .horizontal-sticky{
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 100px;
      padding-bottom: 20px;
      header{
        /* flex: 1; */
        /* background: linear-gradient(to bottom, #f0f6, #f006); */
        margin-left: 60px;
      }
      main{
        /* flex: 1; */
        flex: 1;
        /* background: linear-gradient(to bottom, #f0f6, #00f6); */
        article{
          display: flex;
          flex-direction: row;
          align-items: center;
                                  justify-content: center;
          width: 100vw;
          /* padding-left: 10vw; */
          /* padding-right: 10vw; */
          &>div{
            display: flex;
            flex-direction: column;
                                    width: 450px;
            /* align-items: center; */
          }
          img{
            object-fit: cover;
            object-position: center;
            width: 350px;
            height: 200px;
            border-radius: 10px;
            margin-left: 20px;
          }
        }
      }
      footer{
        text-align: center;
        opacity: 0.4;
        /* background: linear-gradient(to bottom, #f0f6, #0f06); */
        /* flex: 1; */
        /* background: linear-gradient(to bottom, #f0f6, #0f06); */
        /* margin-left: 60px; */
        /* margin-bottom: 60px; */
      }
    }
  }
  .section-half {
    min-height: 50vh;
    display: flex;
  }
  /* .section {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: calc(100dvh - 80px);
    margin-top: 80px;
    padding-left: 20px;
    header{
      flex: 0 0 15%;
    }
    main{
      flex: 0 0 65%;
    }
    footer{
      flex: 0 0 20%;
    }
    p{
      opacity: 0.4;
    }
  } */
  .horizontal-section {
    position: relative;
    height: 400vh;
    align-items: normal;
    .horizontal-sticky {
      position: sticky;
      top: 0;
      height: 100vh;
      overflow: hidden;
      /* header{
        padding-left: 20px;
        position: absolute;
        top: 60px;
        p{
          opacity: 0.4;
        }
      }
      footer{
        position: absolute;
        bottom: 60px;
        text-align: center;
        padding-left: 20px;
        padding-right: 20px;
        opacity: 0.4;
      } */
      .horizontal-track {
        display: flex;
        /* background-color: blue; */
        width: max-content;
        height: 100%;
        article {
          /* width: 100vw;
          padding-left: 60px; */
          /* 
          height: 100%;
          padding-right: 20px;
          flex: 0 0 100vw;
          display: flex;
          justify-content: center;
          flex-direction: column;
          p{
            opacity: 0.4;
          } */
          /* font-size: 60px; */
          /* background-color: aquamarine; */
          &:nth-child(2){
            /* background-color:bisque; */
          }
        }
      }
    }
  }



}
</style>
