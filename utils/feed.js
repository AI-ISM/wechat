var common = require('./util.js')
//从json里解析博客列表
function getArticles(jsonStr) {
  var feeds = new Array();
  for (var x in jsonStr) {
    var item = jsonStr[x];
    var author = item['author'];
    var name = author['name'];
    var feed = {
      'title': formatText(item['title']),
      'id': item['id'],
      'pubDate': formatPubedtime(item['published']),
      'summary': item['summary'],
      'diggs': item['diggs'],
      'views': item['views'],
      'comments': item['comments'],
      'link': item['link']['href'],
      'name': name,
    }
    feeds.push(feed);
  }
  return feeds;
}

//获取某篇博客文章信息
function findArticle(articleId, feeds) {
  for (var x in feeds) {
    if (feeds[x]['id'] == articleId) {
      return feeds[x];
    }
  }
  return null;
}

// ----------获取LeetCode数据-----------  //

//从json里解析博客列表
function getLeetcode(jsonStr) {
  var feeds = new Array();
  jsonStr = jsonStr['stat_status_pairs']
  for (var x in jsonStr) {
    var item = jsonStr[x]['stat'];
    var feed = {
      'title': item['question__title'],
      'id': item['question_id']
    }
    feeds.push(feed);
    if(x == 20) break;
  }
  return feeds;
}

//获取某篇文章内容
function findProble(probleId, feeds) {
  for (var x in feeds) {
    if (feeds[x]['link']['href'] == link) {
      return feeds[x];
    }
  }
  return null;
}

//解析新闻时间
//Thu, 13 Oct 2016 07:22:57 GMT ==> 13 Oct 2016
function formatTime(str) {
  var pattern = /,\s+(.*\d{4})/;
  var matches = str.match(pattern);
  if (undefined == matches[1]) {
    return str;
  } else {
    return matches[1];
  }
}

//解析博客时间
//2016-10-14T11:55:00+08:00 ==> 2016-10-14 11:55:00
function formatPubedtime(str) {
  var pattern = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/;
  var matches = str.match(pattern);
  if (undefined == matches[1]) {
    return str;
  } else {
    return matches[1] + ' ' + matches[2];
  }
}

//解析图片
function formatImage(str) {
  var pattern = /src="(.*?)"/;
  var matches = str.match(pattern);
  var url;
  if (undefined == matches[1]) {
    url = "";
  } else if (matches[1].indexOf('http:') == -1) {
    url = 'http:' + matches[1];
  } else {
    url = matches[1];
  }
  if (url.indexOf('rssclick') == -1) {
    return url;
  } else {
    return "";
  }
}

//格式化文本
function formatText(str) {
  if (str.length == 0) {
    return "";
  }
  
  return str
}

module.exports = {
  findArticle: findArticle,
  getArticles: getArticles,
  getLeetcode: getLeetcode,
  formatText: formatText
}