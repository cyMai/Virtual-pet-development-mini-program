import request from '@/utils/request'



// 查询【请填写功能名称】列表
export function listPet(query) {
  return request({
    url: '/project/pet/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPet(data) {
  return request({
    url: '/project/pet/detail' ,
    method: 'post',
    data:data
  })
}

// 新增【请填写功能名称】
export function addPet(data) {
  return request({
    url: '/project/pet/add',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePet(data) {
  return request({
    url: '/project/pet/edit',
    method: 'post',
    data: data
  })
}

// 删除【请填写功能名称】
export function delPet(data) {
  return request({
    url: '/project/pet/del',
    method: 'post',
    data: data
  })
}


