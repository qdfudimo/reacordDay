// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabData: [{
      name: "我的",
      id: "mine"
    }, {
      name: "空间",
      id: "other"
    }],
    activeTab: "mine",
    movePx: "0px",
    inputValue: "",
    showClose: false
  },
  switchTab(e) {
    let {
      dataset,
      offsetLeft,
    } = e.target
    this.setData({
      activeTab: dataset.name,
      movePx: `${offsetLeft - 3}px`
    })
  },
  focusInput(e) {
    this.setData({
      showClose: e.type == "focus"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        selected: 0
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