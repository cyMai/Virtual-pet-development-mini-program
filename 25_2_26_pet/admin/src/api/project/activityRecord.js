import request from '@/utils/request'



// 查询【请填写功能名称】列表
export function listActivityRecord(query) {
  return request({
    url: '/project/activityRecord/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getActivityRecord(data) {
  return request({
    url: '/project/activityRecord/detail' ,
    method: 'post',
    data:data
  })
}

// 新增【请填写功能名称】
export function addActivityRecord(data) {
  return request({
    url: '/project/activityRecord/add',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateActivityRecord(data) {
  return request({
    url: '/project/activityRecord/edit',
    method: 'post',
    data: data
  })
}

// 删除【请填写功能名称】
export function delActivityRecord(data) {
  return request({
    url: '/project/activityRecord/del',
    method: 'post',
    data: data
  })
}


