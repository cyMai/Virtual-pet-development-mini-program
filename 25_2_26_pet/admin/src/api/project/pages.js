import request from '@/utils/request'



// 查询【请填写功能名称】列表
export function listPages(query) {
  return request({
    url: '/project/manualPages/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPages(data) {
  return request({
    url: '/project/manualPages/detail' ,
    method: 'post',
    data:data
  })
}

// 新增【请填写功能名称】
export function addPages(data) {
  return request({
    url: '/project/manualPages/add',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePages(data) {
  return request({
    url: '/project/manualPages/edit',
    method: 'post',
    data: data
  })
}

// 删除【请填写功能名称】
export function delPages(data) {
  return request({
    url: '/project/manualPages/del',
    method: 'post',
    data: data
  })
}


