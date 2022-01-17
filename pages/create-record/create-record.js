// pages/mine/index.js
//   "navigationStyle": "custom"
import {
  chooseFile,
  isImageFile
} from "../../utils/upload"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 20,
    focus: false,
    maxCount: 9,
    files: [],
    maxSize: 10 * 1024 * 1024,
    address: "请选择位置信息",
    location: {},
    place: {
      address: "江苏省宿迁市沭阳县智慧树幼儿园东北(小街路东)",
      errMsg: "chooseLocation:ok",
      latitude: 34.187418,
      longitude: 118.81498,
      name: "黄金物流",
    },
    array: ['公开', '私密'],
    canSee: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    wx.setNavigationBarTitle({
      title: "写说说"
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff', // 必写项【该字体颜色仅支持 #ffffff 和 #000000 】
      backgroundColor: '#25BDCE', // 传递的颜色值【仅支持有效值为十六进制颜色】
      animation: { // 可选项
        duration: 1000,
        timingFunc: 'easeIn'
      }
    })
  },
  chooseImage(event) {
    const {
      type
    } = event.currentTarget.dataset;
    let files = this.data.files;
    chooseFile({
        accept: type,
        maxCount: this.data.maxCount - files.length,
      })
      .then((res) => {
        this.onAfterRead(res);
      })
      .catch((error) => {
        // wx.showToast({
        //   title: '图片选择失败',
        //   icon: 'none'
        // });
      });
  },
  onAfterRead(file) {
    const {
      maxSize
    } = this.data;
    const oversize = Array.isArray(file) ?
      file.some((item) => item.size > maxSize) :
      file.size > maxSize;
    if (oversize) {
      wx.showToast({
        title: '单个图片大小不能超过10M',
        icon: 'none'
      });
      return;
    }
    this.setData({
      files: this.data.files.concat(Array.isArray(file) ? file : [file]),
    });
  },
  onPreviewImage(event) {
    const {
      index
    } = event.currentTarget.dataset;
    const {
      files
    } = this.data;
    const item = files[index];
    wx.previewImage({
      urls: files.filter((item) => isImageFile(item)).map((item) => item.url),
      current: item.url,
      fail() {
        wx.showToast({
          title: '预览图片失败',
          icon: 'none'
        });
      },
    });
  },
  deleteItem(event) {
    const {
      index
    } = event.currentTarget.dataset;
    this.setData({
      files: this.data.files.filter((item, i) => i !== index),
    });
  },
  choosiePlace() {
    let that = this;
    wx.chooseLocation({
      success(res) {
        console.log(res);
        const {
          address,
          name,
          latitude,
          longitude
        } = res;
        // const regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
        // const address2 =regex.exec(address);
        that.setData({
          location: {
            address,
            name,
            latitude,
            longitude
          }
        })
      },
      fail(res) {
        console.log(res);
      }
    })
  },
  choosiePlaces() {
    let {
      latitude,
      longitude
    } = this.data.place;
    wx.chooseLocation({
      latitude,
      longitude,
      success(res) {
        console.log(res);
      }
    })
  },
  // 获取地址位置信息
  getLocation() {
    const that = this;
    // 获取当前位置的经纬度
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          // 在地图上显示当前位置
          success(res) {},
          fail() {
            console.log(res)
          }
        })
      }
    })
  },
  bindPickerChange(e) {
    this.setData({
      canSee: e.detail.value
    })
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
    setTimeout(() => {
      wx.hideNavigationBarLoading()
    }, 2000);
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