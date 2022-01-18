// app.js
App({
  globalData: {
    userInfo: null,
    isIPX: false, // 当前设备是否为 iPhone X
  },
  onLaunch() {
    // 判断设备是否为 iPhone X
    this.checkIsIPhoneX()
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  checkIsIPhoneX: function () {
    const self = this
    wx.getSystemInfo({
      success: e => {
        console.log(e);
        self.globalData.statusBar = e.statusBarHeight; //状态栏高度
        let custom = wx.getMenuButtonBoundingClientRect();//菜单按钮
        self.globalData.custom = custom;
        console.log(custom);
        self.globalData.customBar = custom.bottom + custom.top - e.statusBarHeight;
        //计算得到定义的状态栏高度
      }
    })
  },
})