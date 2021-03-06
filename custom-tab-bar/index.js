Component({
  data: {
    selected: 0,
    color: "#2c2c2c",
    selectedColor: "#1296db",
    list: [{
      pagePath: "/pages/home/index",
      iconPath: "/image/home.png",
      selectedIconPath: "/image/active_home.png",
      text: "้ฆ้กต"
    }, {
      pagePath: "/pages/mine/index",
      iconPath: "/image/mine.png",
      selectedIconPath: "/image/active_mine.png",
      text: "ๆ็"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})