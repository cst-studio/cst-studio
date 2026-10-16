import { gsap } from "gsap";
import { isMobile, segmentedEase } from "./utils.ts";

type SectionTrack = {
  section: HTMLElement
  track: HTMLElement
}


export class DomScroll {
  private tracks:SectionTrack[]=[]
  private heightService:number = 1
  private heightProds:number = 1
  public heightServiceRound:number = 1
  public heightProdsRound:number = 1
  private _isMobile = isMobile()
  constructor() {
  }
  public init(){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
      });
    }, {
        threshold: 0.25,
    });
    
    
    document.querySelectorAll('video.video').forEach((video) => {
      observer.observe(video);
    });





  document.querySelectorAll<HTMLElement>('.horizontal-section').forEach((section) => {
    const track = section.querySelector<HTMLElement>('.horizontal-track')
    this.tracks.push({section:section, track:track!})
    if (this._isMobile) return
    if (!track) return
    

    this.updateHeight()

    gsap.to({}, {
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        // onRefresh: () => {
        //   resize()
        // },
        onUpdate: (self) => {
        const { segment, progress } = segmentedEase(self.progress, track.children.length-1)
        const p = (segment+progress)/(track.children.length-1)
        track.style.transform = `translateX(${- (track.scrollWidth - document.documentElement.clientWidth) * p}px)`
      }
      },
    })
  })
  }


  public updateHeight(){
    this.tracks.forEach((trackSection) => {
    const track = trackSection.track
    const section = trackSection.section
    const distance = track.scrollWidth - document.documentElement.clientWidth
    const height = distance + window.innerHeight
    section.style.height = `${height}px`
    if(section.className.includes('services')) {
      this.heightService = height
    }
    if(section.className.includes('prods')) {
      this.heightProds = height
    }
    this.heightServiceRound = Math.round(this.heightService/document.documentElement.clientHeight)
    this.heightProdsRound = Math.round(this.heightProds/document.documentElement.clientHeight)
  })
  }
  
}

