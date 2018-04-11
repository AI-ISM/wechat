//index.js
//获取应用实例
var feed = require('../../utils/feed.js')
var common = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    feeds: {},
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
      url: common.baseUrl + 'article/index',
      data: {
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var feeds = feed.getArticles(res.data.feed.entry);
        wx.setStorage({
          key: "article_feeds",
          data: feeds
        })
        that.setData({
          feeds: feeds
        })
      }
    })
  },
  //事件处理函数
  bindViewTap: function (e) {
    var articleId = e.currentTarget.dataset.articleid;
    var current = feed.findArticle(articleId, this.data.feeds);
    try {
      wx.setStorageSync('current_article', current)
    } catch (e) {
    }
    wx.navigateTo({
      url: '../article/item'
    }) 
  },
  onLoad: function () {
    var that = this
    var feeds = wx.getStorageSync('article_feeds')
    if (feeds) {
      that.setData({
        feeds: feeds
      })
    } else {
      that.updateData()
    }
  },
  imageError: function (e) {
    console.log('image发生error事件，携带值为', e.detail.errMsg)
  }
})