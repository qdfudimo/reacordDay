// pages/mine/index.js
const app = getApp();
import {
  chooseFile,
  isImageFile
} from "../../utils/upload"
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
    hasUserInfo: false,
    ifCollect: false,
    defaultImg: "/image/background/rainbow.jpg",
    scheduleLsits: [{
      scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
      // scheduleImg: ["https://sg.gxcqapp.cn//uploads/20211115/FtkZ0hcG3IZ6Fux7HyKEdxvzOsvJ.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FvNHV-2F2vQyg1ns38VrX3sRq2Sb.jpg", "https://sg.gxcqapp.cn//uploads/20211115/FrCyL8P9uC-aIVKLlKAWLlgkCaoX.jpg"],
      scheduleTime: "2022-01-12 03:30",
      likeCount: 1,
      ifMyLike: 1,
      commentCount: 0,
      scheduleContent: "新年开始了啊你在啥都hi打哈代发用于列表的索引分类显示和快速定位。货",
      userAvatrImage: "",
      userName: "旺仔果冻",
      userId: "11321313"
    }],
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
    wx.getStorage({
      key: "currentBackground",
      success: (res) => {
        this.setData({
          currentBackground: res.data,
        })
      },
      fail: (error) => {
        this.setData({
          currentBackground: "/image/background/rainbow.jpg"
        })
      }
    })
    wx.getStorage({
      key: "userInfo",
      success: (res) => {
        this.setData({
          userInfo: JSON.parse(res.data),
          hasUserInfo: true
        })
      },
      fail: (error) => {
        this.setData({
          hasUserInfo: false
        })
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
    wx.setStorage({
      key: "currentBackground",
      data: e.target.dataset.url
    })
  },
  /**自定义背景 */
  selectBackground() {
    chooseFile({
        accept: "img",
        maxCount: 1,
        multiple: false
      })
      .then((res) => {
        this.setData({
          currentBackground: res[0].url
        })
      })
      .catch((error) => {});
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorage({
          key: "userInfo",
          data: res.rawData
        })
      },
      fail: (error) => {

      }
    })
  },
  /**收藏小程序 */
  collectApplet() {
    this.setData({
      ifCollect: true
    })
    setTimeout(() => {
      this.setData({
        ifCollect: false
      })
    }, 3000)
  },
  setApplet() {
    wx.showToast({
      title: '暂未开发',
      icon: 'error',
      duration: 2000
    })
  },
  shareApplet() {
    // wx.showShareImageMenu({
    //   path: "/image/sun.gif",
    //   success() {},
    //   fail() {}
    // })

  },
  /**点赞 */
  changeLike(e) {
    let ifMyLike = this.data.scheduleLsits[e.detail].ifMyLike;
    let likeCount = this.data.scheduleLsits[e.detail].likeCount;
    let Count = !ifMyLike ? likeCount + 1 : ifMyLike == 0 ? 0 : likeCount - 1;
    this.setData({
      [`scheduleLsits[${e.detail}].ifMyLike`]: !this.data.scheduleLsits[e.detail].ifMyLike,
      [`scheduleLsits[${e.detail}].likeCount`]: Count
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(item) {
    // console.log(item);
    const shareimg = [
      "/image/write.png",
      "/image/write1.png",
      "/image/write2.png",
      "/image/write3.png",
    ]
    const randomImg = shareimg[Math.floor(Math.random() * shareimg.length)];
    return {
      title: '写下你的生活',
      path: '/page/mine/index',
      imageUrl: randomImg,
    }
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
})