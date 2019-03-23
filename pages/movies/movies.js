// pages/movies/movies.js
var apiUrl = require("../../data/api-url.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var urls = apiUrl.urls;
    var urlList = [urls.theaters, urls.coming, urls.top250];
    var titleList = ["热映", "即将上映", "top250"];
    this.getMovieInfo(urlList, titleList, 0, []);
  },

  getMovieInfo: function(urlList, titleList, seq, movieData) {
    if (!urlList || urlList.length <= 0) {
      return;
    }
    var url = urlList[seq];
    var title = titleList[seq];
    var globalData = app.globalData;
    var that = this;
    wx.request({
      url: globalData.doubanBase + url,
      data: {},
      method: "GET",
      success: function(res) {
        var movieInfo = {};
        movieInfo.title = title;
        movieInfo.movies = [];
        var subjects = res.data.subjects;
        for (var i = 0; i < subjects.length; i++) {
          var subject = subjects[i];
          var movie = {};
          movie.id = subject.id;
          movie.title = subject.title;
          movie.img = subject.images.large;
          movie.stars = {};
          movie.stars.score = subject.rating.average;
          movie.stars.star = subject.rating.stars;
          movieInfo.movies[i] = movie;

        }
        movieData[movieData.length] = movieInfo;
        seq++;
        if (urlList.length <= seq) {
          that.setData({
            movieData
          });
        } else {
          that.getMovieInfo(urlList, titleList, seq, movieData);
        }

      },
      fail: function() {

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})