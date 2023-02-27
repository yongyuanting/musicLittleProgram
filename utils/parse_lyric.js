// 使用正则
const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lrcString) {
  const lyricInfos = []
  const lyricLine = lrcString.split("\n")
  for (const lineString of lyricLine) {
    const results = timeReg.exec(lineString)
    if (!results) continue
    const minute = results[1] * 60 * 1000
    const second = results[2] * 1000
    const mSecond = results[3].length === 2 ? results[3] * 10 : results[3] * 1
    const time = minute + second + mSecond
    const text = lineString.replace(timeReg, "")
    lyricInfos.push({
      text,
      time
    })
  }
  return lyricInfos
}