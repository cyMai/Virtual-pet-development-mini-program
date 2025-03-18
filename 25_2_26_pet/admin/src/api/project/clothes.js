import request from '@/utils/request'



// 查询橱窗管理列表
export function listClothes(query) {
  return request({
    url: '/project/clothes/list',
    method: 'get',
    params: query
  })
}

// 查询橱窗管理详细
export function getClothes(data) {
  return request({
    url: '/project/clothes/detail' ,
    method: 'post',
    data:data
  })
}

// 新增橱窗管理
export function addClothes(data) {
  return request({
    url: '/project/clothes/add',
    method: 'post',
    data: data
  })
}

// 修改橱窗管理
export function updateClothes(data) {
  return request({
    url: '/project/clothes/edit',
    method: 'post',
    data: data
  })
}

// 删除橱窗管理
export function delClothes(data) {
  return request({
    url: '/project/clothes/del',
    method: 'post',
    data: data
  })
}


