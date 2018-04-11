//index.js
//获取应用实例
const app = getApp()
var common = require('../../utils/util.js')

Page({
  data: {
    motto: 'Hello World',
    articles: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  routeInfo: function() {
    wx.switchTab({
      url: '../profile/profile?id=1'
    })
  },
  onLoad: function () {
    wx.request({
      url: common.baseUrl+'articles', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        this.setData({
          articles: res.data.feed.entry
        })
        console.log(res.data)
      }
    })
  },
  routeInfo: function () {
    wx.switchTab({
      url: '../profile/profile?id=1'
    })
  },
  onPullDownRefresh: function () {
    wx.showModal({
      title: 'Tips',
      content: 'you have pull down',
      success: function (res) {
        if (res.confirm) {
          console.log("success")
        } else {
          console.log('user give up')
        }
      }
    })
  }
})
