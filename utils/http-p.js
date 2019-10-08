import {config} from '../config.js'  //import中一定要使用相对路径，不能使用绝对路径

const tips = {
  1 : '抱歉，出现了一个错误',
  1005 : '您当前的appkey无效',
  3000 : '期刊不存在' 
}

class HTTP{
  request({url,data={},method="GET"}){   //解构赋值
    return new Promise((resolve,reject)=>{
      this._request(url, resolve, reject, data , method)
    })  
  }

  _request(url,resolve,reject,data={},method='GET'){
    wx.request({
      url: config.api_base_url + url,
      method:method,
      data:data,
      header:{
        'content-type':'application/json',
        'appkey':config.appkey
      },
      success:(res)=>{
        const code = res.statusCode.toString()    //校验状态码
        if(code.startsWith('2')){
          resolve(res.data)   //返回获取成功的data值
        }
        else{
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err) => {
        reject()
        this._show_error(1)
      }
    })
  }

  _show_error(error_code){
    if(!error_code){
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip: tips[1],
      icon: 'none',
      duration: 2000     
    })
  }
}

export {HTTP}