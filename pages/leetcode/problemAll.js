//index.js
//获取应用实例
var feed = require('../../utils/feed.js')
var common = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    leetcodeFeeds: {},
  },
  upper: function () {
    this.updateData()
  },
  onPullDownRefresh: function () {
    this.updateData()
  },
  updateData: function () {
    var that = this
    wx.request({
      url: common.baseUrl + 'leetcode/lists',
      data: {
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var leetcodeFeeds = feed.getLeetcode(res.data);
        wx.setStorage({
          key: "leetcodeFeeds",
          data: leetcodeFeeds
        })
        that.setData({
          leetcodeFeeds: leetcodeFeeds
        })
      }
    })
  },
  //事件处理函数
  bindViewTap: function (e) {
    var problemid = e.currentTarget.dataset.problemid;
    var current = feed.findArticle(problemid, this.data.leetcodeFeeds);
    try {
      wx.setStorageSync('current_leetcode', current)
    } catch (e) {
    }
    wx.navigateTo({
      url: '../article/item'
    })
  },
  onLoad: function () {
    var that = this
    var leetcodeFeeds = wx.getStorageSync('leetcodeFeeds')
    if (0) {
      that.setData({
        leetcodeFeeds: leetcodeFeeds
      })
    } else {
      that.updateData()
    }
  }
})