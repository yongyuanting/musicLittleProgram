import {
  HYEventStore
} from "hy-event-store"

const playerStore = new HYEventStore({
  state: {
    palySongList: [],
    playSongIndex: 0
  }
})

export default playerStore