import {request} from "../utils/request"



export function articleslist(){
  return request(
  "/project/articles/list",
    "get",{}
  )
}


export function userregister(e){
  return request(
  "/project/user/register",
    "post",e
  )
}
export function userlogin(e){
  return request(
  "/project/user/login",
    "post",e
  )
}
export function getUserInfo(e){
  return request(
  "/project/user/detil",
    "post",e
  )
}
export function updateUserInfo(e){
  return request(
  "/project/user/edit",
    "post",e
  )
}

export function addPet(e){
  return request(
    "/project/pet/add",
    "post",
    e
  )
}

export function getPet(e){
  return request(
    "/project/pet/getPet",
    "post",
    e
  )
}

// 添加专注记录
export function addFocusRecord(e) {
  return request(
    "/project/focus/add",
    "post",
    e
  )
}


export function getFocusRecord(e) {
  return request(
    "/project/focus/list/" + e.userId,
    "get",
    e
  )
}


export function getActivityRecords(e) {
  return request(
    "/project/activityRecord/list/" + e.userId,
    "get",
    e
  )
}

export function getGameRecords(e) {
  return request(
    "/project/gameRecord/list/" + e.userId,
    "get",
    e
  )
}


export function getClothes(e) {
  return request(
    "/project/clothes/list",
    "get",
    e
  )
}

export function updateClothes(e) {
  return request(
    "/project/clothes/edit",
    "post",
    e
  )
}

export function activityRecord(e) {
  return request(
    "/project/activityRecord/randomActivity",
    "post",
    e
  )
}

export function merge2048(e) {
  return request(
    "/project/gameRecord/merge2048",
    "post",
    e
  )
}

export function getManualPages(e) {
  return request(
    "/project/manualPages/list",
    "get",  
    e
  )
}

export function addManualPage(e) {
  return request(
    "/project/manualPages/add",
    "post",
    e
  )
}