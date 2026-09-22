import mitt from 'mitt'
import type { Point } from './utils/utils'

type RouteChange = {
  to: string
  from: string
}
type Events = {
  introRangoli: undefined,
  colorChanged: number,
  rangoliClick: Point,
  addRipple: {x:number, y:number},
  sizeRipple: {size:number, duration:number},
  rangoliColorize: number,
  rangoliLayerUp: number,
  sceneReady: boolean,
  'route-has-changed': RouteChange,
  'route-will-change': RouteChange,
  tutoIsoCamera: boolean,
  rangoliRandom: undefined,
  exportUsdz: undefined,
  exportImg: undefined,
  usdzReady: string,
  imgReady: string,
  activeExport: boolean,
  saturateRangoli: boolean,
  resize: {width:number, height:number}
}

export const eventBus = mitt<Events>()