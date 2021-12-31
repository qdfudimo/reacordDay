// pages/home/index.js
// const util = require('../../utils/util.js')
// util.formatTime(new Date(log))
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
    showClose: false,
    scheduleLsits: [{
      scheduleImg: "",
      scheduleTime: "2/14日",
      scheduleTheme: "新年安排",
      likeCount: 6,
      ifMyLike: 1,
      scheduleLists: [{
          id: 1,
          time: "",
          data: "新年开始了啊"
        },
        {
          id: 2,
          time: "",
          data: "新年开始了啊"
        },
        {
          id: 3,
          time: "2021-11-22",
          data: "新年开始了啊你在啥都hi打哈代发用于列表的索引分类显示和快速定位。货"
        }
      ],
      userAvatr: "",
      userName: "旺仔果冻"
    }],
    triggered: false,
    arr: [1, 2, 3]
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
  clearInput() {
    this.setData({
      inputValue: ""
    })
  },
  onRefresh(e) {
    if (this._refreshing) return
    this._refreshing = true;
    setTimeout(() => {
      this.setData({
        triggered: false,
        arr: [1, 2]
      })
      this._refreshing = false;
    }, 3000)
    console.log("onRefresh 自定义下拉刷新被触发", e);
  },
  onPulling(e) {
    // bindrefresherpulling="onPulling"
    console.log("onPulling 自定义下拉刷新控件被下拉", e);
  },
  loadMore(e) {
    console.log("loadMore loadMore", e);
    if (this._loadmoreIng) return
    this._loadmoreIng = true;
    setTimeout(() => {
      this.setData({
        arr: [1, 2, 3, 4, 5, 6]
      })
      this._loadmoreIng = false;
    }, 2000)
  },
  onRestore(e) {
    console.log("onRestore 自定义下拉刷新被复位", e);
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