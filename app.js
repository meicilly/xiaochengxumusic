// app.js
App({
  onLaunch() {
    const info = wx.getSystemInfoSync()
    //console.log(info)
    this.globalData.screenHeight = info.screenHeight
    this.globalData.screenWidth = info.screenWidth
    this.globalData.statusBarHeight = info.statusBarHeight

    console.log(info.screenHeight / info.screenWidth)
    const deviceRadio = info.screenHeight / info.screenWidth
    this.globalData.deviceRadio = deviceRadio
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    screenWidth:0,
    screenHeight: 0,
    statusBarHeight:0,
    navBarHeight: 44,
    deviceRadio: 0
  }
  
})
