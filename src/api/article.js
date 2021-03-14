import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}

export function addHotel(data) {
  return request({
    url: '/api/hotel/create',
    method: 'get',
    params: data,
    baseURL: 'http://127.0.0.1:4002'
  })
}

export function getHotel(data) {
  return request({
    url: '/api/hotel/list',
    method: 'get',
    params: data,
    baseURL: 'http://127.0.0.1:4002'
  })
}

export function delHotel(data) {
  return request({
    url: '/api/hotel/delete',
    method: 'get',
    params: data,
    baseURL: 'http://127.0.0.1:4002'
  })
}

export function fetchDeviceList(data) {
  return request({
    url: '/api/device/list',
    method: 'get',
    params: data,
    baseURL: 'http://127.0.0.1:4002'
  })
}

export function fetchAllCountList(data) {
  return request({
    url: '/api/allcount',
    method: 'get',
    params: data,
    baseURL: 'http://127.0.0.1:4002'
  })
}

export function fetchAllCountByProvinceList(data) {
  return request({
    url: '/api/allcountbyprovince',
    method: 'get',
    params: data,
    baseURL: 'http://127.0.0.1:4002'
  })
}

export function fetchAllProvinceList() {
  return request({
    url: '/api/hotel/province',
    method: 'get',
    baseURL: 'http://127.0.0.1:4002'
  })
}
