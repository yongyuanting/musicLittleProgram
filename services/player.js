import {
  yytRequest
}
from "./index"

export function getSongDetail(ids) {
  return yytRequest.get({
    url: 'song/detail',
    data: {
      ids
    }
  })
}

export function getSongLyric(id) {
  return yytRequest.get({
    url: 'lyric',
    data: {
      id
    }
  })
}