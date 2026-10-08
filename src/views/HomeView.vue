<script setup lang="ts">
import videoProdImage from '@/assets/images/CST-video-prod.jpeg'
import droneImage from '@/assets/images/CST-drone.jpeg'
import photoImage from '@/assets/images/CST-photo.jpeg'
import eventImage from '@/assets/images/CST-event.jpeg'
import socialImage from '@/assets/images/CST-social.jpeg'
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
      <footer class="full-width">
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
          <div>
            <h2> 01 <span class="red">—</span> PRODUCTION VIDÉO </h2>
            <h3>Vidéo d'Entreprise</h3>
            <p>Films institutionnels, publicités digitales, interviews corporate, reportages événementiels. L'exigence du cinéma au service de votre message.</p>
          </div>
          <img :src="videoProdImage" alt="Video Production" />
        </div>
      </article>
      <article>
        <div>
          <div>
            <h2> 02 <span class="red">—</span> IMAGERIE AÉRIENNE </h2>
            <h3>Drone & Aérien</h3>
            <p>Drone certifié catégorie A1/A3, prises de vue 4K à 360°, time-lapse aériens. Des angles impossibles qui subliment vos espaces et événements.</p>
          </div>
          <img :src="droneImage" alt="Drone & Aérien" />
      </div>
      </article>
      <article>
        <div>
          <div>
            <h2> 03 <span class="red">—</span> PHOTOGRAPHIE </h2>
            <h3>Photo Corporate</h3>
            <p>Portraits corporate, shooting événementiel, photographie d'architecture et de produit. Des images qui renforcent votre identité visuelle.</p>
          </div>
          <img :src="photoImage" alt="Photo Corporate" />
      </div>
      </article>
      <article>
        <div>
          <div>
            <h2> 04 <span class="red">—</span> ÉVÉNEMENTIEL </h2>
            <h3>Couverture & Interviews</h3>
            <p>Captation d'événements, interviews sur le vif, aftermovies et contenus immersifs. Nous racontons l'énergie de vos événements à travers des images spontanées et authentiques.</p>
          </div>
          <img :src="eventImage" alt="Web & Digital" />
      </div>
      </article>
      <article>
        <div>
          <div>
            <h2> 05 <span class="red">—</span> RÉSEAUX SOCIAUX </h2>
            <h3>Social Media Content</h3>
            <p>Reels, vidéos courtes, interviews et contenus verticaux pensés pour les réseaux sociaux. Du tournage à la publication, des formats qui captent l'attention et font vivre votre actualité.</p>
          </div>
          <img :src="socialImage" alt="Web & Digital" />
      </div>
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
          <div>
            <h2> 01 <span class="red">—</span> PRODUCTION #1 </h2>
            <h3>#1</h3>
            <p>Plongez dans nos dernières réalisations : films d'entreprise, événements, interviews et contenus pour les réseaux sociaux. Un aperçu de notre savoir-faire et de nos projets récents.</p>
          </div>
          <img :src="wipImage" alt="Web & Digital" />
      </div>
      </article>
      <article>
        <div>
          <div>
            <h2> 02 <span class="red">—</span> PRODUCTION #2 </h2>
            <h3>#2</h3>
            <p>Plongez dans nos dernières réalisations : films d'entreprise, événements, interviews et contenus pour les réseaux sociaux. Un aperçu de notre savoir-faire et de nos projets récents.</p>
          </div>
          <img :src="wipImage" alt="Web & Digital" />
      </div>
      </article>
      <article>
        <div>
          <div>
            <h2> 03 <span class="red">—</span> PRODUCTION #3 </h2>
            <h3>#3</h3>
            <p>Plongez dans nos dernières réalisations : films d'entreprise, événements, interviews et contenus pour les réseaux sociaux. Un aperçu de notre savoir-faire et de nos projets récents.</p>
          </div>
          <img :src="wipImage" alt="Web & Digital" />
      </div>
      </article>
      <article>
        <div>
          <div>
            <h2> 04 <span class="red">—</span> PRODUCTION #4 </h2>
            <h3>#4</h3>
            <p>Plongez dans nos dernières réalisations : films d'entreprise, événements, interviews et contenus pour les réseaux sociaux. Un aperçu de notre savoir-faire et de nos projets récents.</p>
          </div>
          <img :src="wipImage" alt="Web & Digital" />
      </div>
      </article>
    </main>
    <footer>
      <p class="quote">Du premier brief au dernier plan, chaque image compte.</p>
    </footer>
  </div>
</section>



<section class="contact-section">
      <header>
      <h1>Faisons quelque de grand ensemble<span class="dot"></span></h1>
      <p>Une idée, un projet, une ambition : racontons-la avec des images qui marquent.</p>
    </header>
    <main>
      
    </main>
    <footer>
      <div>
        <h2>Shoot us a line @</h2>
        <a href="mailto:contact@cst-studio.prod">👉 contact@cst-studio.prod</a>
        <h2>Ou un simple coup de téléphone</h2>
        <a href="tel:+33667035154">🤙 06 67 03 51 54</a>
      </div>
    </footer>
  </section>

  </main>
</template>

<style scoped>
#main-hero{
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  /* height: 350vh; */
  background: #d006;
  #main-hero-p1{
    position: relative;
    /* background: #00f6; */
    height: 300vh;
    width: 100%;
  }
  #main-hero-p2{
    /* background: #0f06; */
    position: relative;
    height: 250px;
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
    height: calc(300vh + 250px);
    position: relative;
    top: 0;
    margin-bottom: 40vh;
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
        /* margin-left: 60px; */
        margin-bottom: 60px;
      }
    }
  }
  .services-section,.prods-section{
    /* background: linear-gradient(to bottom, #f0f6, #0f06); */
    margin-bottom: 10vh;
    .horizontal-sticky{
      display: flex;
      flex-direction: column;
      justify-content: center;
      /* padding-top: 100px; */
      /* padding-bottom: 20px; */
      header{
        /* flex: 1; */
        /* background: linear-gradient(to bottom, #f0f6, #f006); */
        /* margin-left: 60px; */
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
            &>div{
              width: 450px;
              display: flex;
              flex-direction: column;
            }
          }
          img{
            object-fit: cover;
            object-position: center;
            width: 350px;
            height: 200px;
            width: 600px;
            height: 400px;
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
  
  .contact-section{
    top: 0;
      height: 100vh;
      /* padding-top: 100px; */
      padding-bottom: 20px;
      /* margin-left: 60px; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      /* background: linear-gradient(to bottom, #f0f6, #0f06); */

      /* align-items: center; */
      header{
        /* flex: 1; */
        /* background: linear-gradient(to bottom, #f0f6, #f006); */
      }
      main{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* background: linear-gradient(to bottom, #f0f6, #00f6); */
        
      }
      footer{
        /* background: linear-gradient(to bottom, #f0f6, #0f06); */
        /* margin-left: 60px; */
        margin-bottom: 60px;
        text-align: center;
        &>div{
          display: flex;
          flex-direction: column;
          /* align-items: center; */
          /* background: linear-gradient(to bottom, #00f6, #0f06); */
          a{
            color: var(--red);
            text-decoration: none;
            font-size: 2rem;
            font-family: var(--font-quote);
            font-weight: 900;
          }
        }
      }
  }

  .horizontal-section {
    position: relative;
    /* TODO change this height based on its content */
    height: 400vh; 
    align-items: normal;
    .horizontal-sticky {
      position: sticky;
      top: 0;
      height: 100vh;
      overflow: hidden;
      .horizontal-track {
        display: flex;
        width: max-content;
        height: 100%;
      }
    }
  }



}


@media (max-width: 767px) {
  /* mobile */
  main.main {
    & .services-section, & .prods-section {
      height: auto; 
      & .horizontal-sticky {
        position: relative;
        padding-top: 70px;
        height: auto; 
          & .horizontal-track {
            flex-direction: column;
            article{
              margin: 30px 0;
              &:first-child{
                margin-top: 60px;
              }
              &:last-child{
                margin-bottom: 60px;
              }
            }
          }
            & header{
              margin-left: 10px;
            }
            & main {
                & article {
                  &>div{
            flex-direction: column;
            &>div{
              width: 80vw;              
            }
          }
          img{
            width: 350px;
            height: 200px;
            margin-left: 0px;
            margin-top: 20px;
          }
                  
                }
            }
        }
    }
    & .contact-section{
      margin-left: 10px;
      footer{
        margin-left: 0px;
      }
    }


.main-hero-section{
    .main-hero-section-sticky{
      header{
        flex: 1;
        /* background: linear-gradient(to bottom, #f0f6, #f006); */
      }
      main{
        /* flex: 1; */
        /* background: linear-gradient(to bottom, #f0f6, #00f6); */
      }
      footer{
        margin-left: 10px;
        margin-bottom: 90px;
      }
    }
  }

  }
}
</style>
