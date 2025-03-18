import request from '@/utils/request'



// 查询【请填写功能名称】列表
export function listRecord(query) {
  return request({
    url: '/project/gameRecord/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getRecord(data) {
  return request({
    url: '/project/gameRecord/detail' ,
    method: 'post',
    data:data
  })
}

// 新增【请填写功能名称】
export function addRecord(data) {
  return request({
    url: '/project/gameRecord/add',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateRecord(data) {
  return request({
    url: '/project/gameRecord/edit',
    method: 'post',
    data: data
  })
}

// 删除【请填写功能名称】
export function delRecord(data) {
  return request({
    url: '/project/gameRecord/del',
    method: 'post',
    data: data
  })
}


