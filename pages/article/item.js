var feed = require('../../utils/feed.js')
var common = require('../../utils/util.js')
var WxParse= require('../../wxParse/wxParse.js')
var app = getApp()
Page({
  data: {
    item: [],
  },
  onLoad: function () {
    var that = this
    var current_article = wx.getStorageSync('current_article')
    if (current_article) {
      wx.request({
        url: common.baseUrl + 'article/item/' + current_article['id'],
        data: {},
        header: {
          'Content-Type': 'text/html'
        },
        success: function (res) {
          current_article['detail'] = 1;
          current_article['content'] = res['data'];
          WxParse.wxParse('article', 'html', current_article['content'], that, 5);
          that.setData({
            item: current_article,
          })
        }
      })
    } else {
      console.log('获取博客内容失败');
    }
  }
})