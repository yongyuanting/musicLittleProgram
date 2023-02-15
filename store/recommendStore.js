import {HYEventStore} from "hy-event-store"
import {getMusicPlayListDetail} from "../services/music"

const recommendStore = new HYEventStore({
  state:{
    recommendSongs:[]
  },
  actions:{
    fetchRecommendSongsAction(ctx){
      getMusicPlayListDetail(3778678).then(res=>{
        // console.log(res)
        ctx.recommendSongs = res.playlist.tracks
      })
    }
  }
})

export default recommendStore