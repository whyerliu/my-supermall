import {request} from "network/request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    // 把后面的也传进来，home/data/type&page
    params: {
      type,
      page
    }
  })
}