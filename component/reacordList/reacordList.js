// component/reacordList/reacordList.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    //https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html
    styleIsolation: 'apply-shared'
  },
  properties: {
    reacordList: Object,
    onlyIndex: Number,
    // myProperty: { // 属性名
    //   type: String,
    //   value: ''
    // },
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {},
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () {},
  /**
   * 组件的初始数据
   */
  data: {

  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },
  /**
   * 组件的方法列表
   */
  methods: {
    gotoSongList(e) {
      wx.navigateTo({
        url: `../songList/songList?listId=${listId}`,
      })
    },
    changeLike(e) {
      this.triggerEvent('changeLike',this.data.onlyIndex)
    }
  }
})