// pages/mine/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusBar: app.globalData.statusBar,
    customBar: app.globalData.customBar,
    custom: app.globalData.custom,
    imgList: [],
    showBackground: false,
    currentBackground: "/image/background/rainbow.jpg",
    isLogin: true,
    ifCollect: false,
    defaultImg: "/image/background/rainbow.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const fs = wx.getFileSystemManager();
    const pathName = "/image/background";
    fs.readdir({
      dirPath: pathName,
      // dirPath: `${wx.env.USER_DATA_PATH}/recordDay/image`,
      success: (res) => {
        this.setData({
          imgList: res.files.map(item => `${pathName}/${item}`)
        })
      },
      fail(res) {
        console.error(res)
      }
    })
  },
  showIfBackground() {
    this.setData({
      showBackground: !this.data.showBackground
    })
  },
  selectImage(e) {
    this.setData({
      currentBackground: e.target.dataset.url
    })
  },
  /**自定义背景 */
  selectBackground() {

  },
  /**收藏小程序 */
  collectApplet() {
    this.setData({
      ifCollect: true
    })
    setTimeout(()=>{
      this.setData({
        ifCollect: false
      })
    },3000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})