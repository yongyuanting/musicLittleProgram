import {
  HYEventStore
} from "hy-event-store"

const playerStore = new HYEventStore({
  state: {
    palySongList: {}
  }
})

export default playerStore