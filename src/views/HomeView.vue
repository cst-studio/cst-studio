<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { eventBus } from "@/eventBus";
import config from '@/config/config.json';

const hasScolled = ref(false)
const handleScroll = () => {
  if(window.scrollY > 0) {
    hasScolled.value = true
  }
}
onMounted(() => {
  eventBus.emit("introCst");
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<template>
  <div v-if="!hasScolled" id="scroll-down">﹀</div>
  <div id="scroller">
      <div id="scroller-p1"></div>
      <div id="scroller-p2"></div>
    </div>
  
  <main class="main">
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
<div id="scroller-services"></div>
  <div class="horizontal-sticky">
    <header>
      <h1>{{ config.services.title }}<span class="dot"></span></h1>
      <p>{{ config.services.eyebrow }}</p>
    </header>
    <main class="horizontal-track">

      <article v-for="(service, index) in config.services.content" :key="index">
        <div>
          <div>
            <h2> {{ String(index + 1).padStart(2, '0') }} <span class="red">—</span> {{ service.title }} </h2>
            <h3> {{ service.eyebrow }} </h3>
            <p> {{ service.desc }} </p>
          </div>
          <img :src="`./${service.img}`" :alt="service.title" />
        </div>
      </article>
      
    </main>
    <footer>
      <p class="quote">{{ config.services.footer }}</p>
    </footer>
  </div>
</section>






<section class="horizontal-section prods-section">
  <div id="scroller-prods"></div>
  <div class="horizontal-sticky">
    <header>
      <h1>{{ config.prods.title }}<span class="dot"></span></h1>
      <p>{{ config.prods.eyebrow }}</p>
    </header>
    <main class="horizontal-track">
      
      <article v-for="(prod, index) in config.prods.content" :key="index">
        <div>
          <div>
            <h2> {{ String(index + 1).padStart(2, '0') }} <span class="red">—</span> {{ prod.title }} </h2>
            <h3> {{ prod.eyebrow }} </h3>
            <p> {{ prod.desc }} </p>
          </div>
          <video v-if="prod.video" class="video" controls loop="true" muted="true" loading="lazy" :poster="`./${prod.img}`" >
            <source :src="`./${prod.video}`" type="video/mp4" />
          </video>
          <img v-else :src="`./${prod.img}`" :alt="prod.title" />
        </div>
      </article>
      
    </main>
    <footer>
      <p class="quote">{{ config.prods.footer }}</p>
    </footer>
  </div>
</section>



<section class="contact-section">
  <div id="scroller-contact"></div>
    <header>
      <h1>Faisons quelque chose<br> de grand ensemble<span class="dot"></span></h1>
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
#scroll-down{
  position: fixed;
  bottom: -5px;
  font-size: 1.0rem;
  text-align: center;
  width: 100%;
  color:#FFF;
  filter: drop-shadow(2px 2px 4px black);
  animation: moveUpDown 3s ease-in-out infinite;
}

@keyframes moveUpDown {
  0%, 10%, 90%, 100% {
    transform: translateY(20px);
  }
  30% {
    transform: translateY(0px);
  }
  70% {
    transform: translateY(0px);
  }
}
#scroller{
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  /* height: 350vh; */
  /* background: #d006; */
  #scroller-p1{
    position: relative;
    /* background: #00f6; */
    height: 300vh;
    width: 100%;
    width: 5px;
  }
  #scroller-p2{
    position: relative;
    height: 250px;
    width: 100%;
    width: 5px;
    /* background: #d006; */
  }
}
#scroller-services, #scroller-prods, #scroller-contact{
  position: absolute;
  width: 30px;
}
#scroller-services{
  top:-40vh;
  height: calc(100% + 40vh);
}
#scroller-prods{
  top:-10vh;
  height: calc(100% + 10vh);
}
#scroller-contact{
  top:-10vh;
  width: 40px;
  height: calc(100% + 10vh);
  /* background: linear-gradient(to bottom, #f0f6, #00f6); */
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
          img, video{
            object-fit: cover;
            object-position: center;
            width: 350px;
            height: 200px;
            width: 600px;
            height: 400px;
            max-width:30vw;
            max-height:40vh;
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
      position: relative;
      height: 100vh;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      header{
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
      margin-bottom: 0px;
      & .horizontal-sticky {
        position: relative;
        padding-top: 0px;
        height: auto; 
          & .horizontal-track {
            flex-direction: column;
            article{
              margin: 50px 0;
              &:first-child{
                margin-top: 80px;
              }
              &:last-child{
                /* margin-bottom: 60px; */
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
                      width: 90vw;              
                    }
                  }
                  img, video{
                    width: 90vw;
                    max-width: 90vw;
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
      margin-bottom: 0vh;
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
          margin-bottom: 10px;
          margin-top: 30px;
        }
      }
    }
  }


  #scroller{
    #scroller-p1{
      height: 200vh;
    }
    #scroller-p2{
      height: 150px;
    }
  }
  main.main {
    .main-hero-section{
      height: calc(200vh + 250px);
    }
  }
}
</style>
