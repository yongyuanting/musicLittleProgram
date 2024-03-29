import {
  HYEventStore
} from "hy-event-store"
import {
  parseLyric
} from "../utils/parse_lyric"
import {
  getSongDetail,
  getSongLyric
} from "../services/player"
import {
  historyCollection
} from "../database/index"

export const audioContext = wx.createInnerAudioContext()
audioContext.autoplay = true

const playerStore = new HYEventStore({
  state: {
    palySongList: [],
    playSongIndex: 0,
    id: "",
    currentSong: {},
    isFirst: true,
    currentTime: 0,
    durationTime: 0,
    lyricInfos: [],
    currentLyricIndex: -1,
    currentLyricText: "",
    showLyric: "",
    isPlay: true,
    playSongIndex: 0,
    playSongList: [],
    isSliderChange: false,
    playModelIndex: 0, // 0 顺序播放，1单曲循环，2随机播放
    isPlaying: false,

  },
  actions: {
    playMusicWithSongId(ctx, nowId) {
      // 初始化
      ctx.currentSong = {}
      ctx.durationTime = 0
      ctx.showLyric = ""
      ctx.currentLyricIndex = 0
      ctx.lyricInfos = []
      // 1.获取传入的id
      ctx.id = nowId
      ctx.isPlaying = true
      // this.setData({
      //   id: id
      // })
      // 2.1根据id获取歌曲数据
      getSongDetail(ctx.id).then(res => {
        console.log("获取到了歌曲的数据", res)
        ctx.currentSong = res.songs[0];
        ctx.durationTime = res.songs[0].dt
        historyCollection.add(res.songs[0])
      })
      // 2.2根据ID获取歌词
      getSongLyric(ctx.id).then(res => {
        // console.log(res);
        const lrcString = res.lrc.lyric
        const lyricInfo = parseLyric(lrcString)
        // console.log(lyricInfo)
        // console.log(lrcString)
        ctx.lyricInfos = lyricInfo
      })
      // 3.播放当前歌曲
      audioContext.src = `http://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
      // audioContext.src = "http://music.163.com/song/media/outer/url?id=1974443814.mp3"

      audioContext.onStop(() => {
        console.log("停止中")
      })
      audioContext.onPause(() => {
        console.log("暂停中")
        if (this.state.isPlaying === true && this.state.isFirst === true) {
          audioContext.play()
          this.state.isFirst = false
        }
      })
      audioContext.onWaiting(() => {
        console.log("等待中")

      })
      audioContext.onPlay(() => {
        console.log("播放中")
      })

      // console.log("看一下播放器", audioContext)
      // audioContext.onError((event) => {
      //   console.log(event)
      // })

      // 4.监听播放时间
      audioContext.onTimeUpdate(() => {
        // 4.1 更新歌曲的进度
        ctx.currentTime = audioContext.currentTime * 1000
        // 4.2 匹配正确的歌词
        if (!ctx.lyricInfos.length) return
        let index = ctx.lyricInfos.length - 1
        for (let i = 0; i < ctx.lyricInfos.length; i++) {
          const info = ctx.lyricInfos[i]
          if (info.time > audioContext.currentTime * 1000) {
            index = i - 1
            break;
          }
        }
        // 匹配次数太多了，优化
        if (ctx.currentLyricIndex === index || index === -1) {
          return
        } else {
          // 3.获取歌词索引和文本
          // 4.改变歌词滚动页面的位置
          const currentLyric = ctx.lyricInfos[index].text
          ctx.showLyric = currentLyric;
          ctx.currentLyricIndex = index;
        }
      })
      audioContext.onEnded(() => {
        if (ctx.playModelIndex === 1) {
          // this.setData({
          //   currentTime: 0
          // })
          ctx.currentTime = 0
          // audioContext.play()
          // audioContext.loop = true
        } else {
          // this.changeNewSong()
          // TOOD:切换下一首歌曲
          playerStore.dispatch("playNewMusicAction")
        }
      })
    },
    playMusicStatusAction(ctx) {
      if (!audioContext.paused && ctx.isFirst === true) {
        audioContext.pause()
        ctx.isPlaying = false
      } else if (audioContext.paused && ctx.isFirst === true) {
        audioContext.play()
        // this.data.isPlay = true
        ctx.isPlaying = true
      }
    },
    playMusicModelAction(ctx) {
      let modeIndex = ctx.playModelIndex
      modeIndex = modeIndex + 1
      if (modeIndex === 3) modeIndex = 0
      ctx.playModelIndex = modeIndex
      if (modeIndex === 1) {
        audioContext.loop = true
      } else {
        audioContext.loop = false
      }
    },
    playNewMusicAction(ctx, isNext = true) {
      let index = ctx.playSongIndex
      console.log("看看模式", ctx.playModelIndex)
      switch (ctx.playModelIndex) {
        case 0:
        case 1:
          isNext ? index++ : index--
          if (index === ctx.playSongList.length) {
            index = 0
          }
          if (index === -1) {
            index = ctx.playSongList.length - 1
          }
          break
        case 2:
          let nowIndex = index
          while (nowIndex === index) {
            nowIndex = Math.floor(Math.random() * ctx.playSongList.length)
          }
          index = nowIndex
          break
      }

      const newSong = ctx.playSongList[index]
      // 保存最新的索引
      // playerStore.setState("playSongIndex", index)
      ctx.playSongIndex = index
      this.dispatch("playMusicWithSongId", newSong.id)
    }
  }
})

export default playerStore