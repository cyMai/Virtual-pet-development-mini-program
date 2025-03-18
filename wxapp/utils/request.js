var baseURL = 'http://localhost:9999';




export function request(url,  method, data){
  
  let headerObj = {			
    'content-type': 'application/json;charset=utf-8'    
  }
  
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL + url,
      method:method,
      data:data,
      header:headerObj,
      success: function success(request) {
        resolve(request.data);
      },
      fail: function fail(error) {
        reject(error);
      },
      complete: function complete(aaa) {
        // 加载完成
      }
     
    })
  })
}





