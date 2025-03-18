import request from '@/utils/request'


// 登录
export function login(data) {
  return request({
    url: '/project/user/login' ,
    method: 'post',
    data:data
  })
}

// 注册
export function register(data) {
  return request({
    url: '/project/user/register' ,
    method: 'post',
    data:data
  })
}

// 查询用户管理列表
export function listUser(query) {
  return request({
    url: '/project/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户管理详细
export function getUser(data) {
  return request({
    url: '/project/user/detail' ,
    method: 'post',
    data:data
  })
}

// 新增用户管理
export function addUser(data) {
  return request({
    url: '/project/user/add',
    method: 'post',
    data: data
  })
}

// 修改用户管理
export function updateUser(data) {
  return request({
    url: '/project/user/edit',
    method: 'post',
    data: data
  })
}

// 删除用户管理
export function delUser(data) {
  return request({
    url: '/project/user/del',
    method: 'post',
    data: data
  })
}


