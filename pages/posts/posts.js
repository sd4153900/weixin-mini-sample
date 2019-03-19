// pages/posts/posts.js

//只能用相对路径
var postsData = require('../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // date : "Sep 18 2016"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var data1 = [{
    //   date : "Sep 18 2016",
    //   img: "/images/avatar/2.png",
    //   message:{
    //     title:"正是虾肥蟹壮时"
    //   }
    // },
    // {
    //   date: "Sep 18 2015",
    //   img: "/images/avatar/3.png",
    //   message: {
    //     title: "正是虾肥蟹壮时1"
    //   }
    // }]

    
    //绑定服务器获取的数据
    var postList = postsData.postList;
    this.setData({postList});

      var swiperList = [];
      for(var i = 0;i < postList.length; i++){
        var postItem = postList[i];
        swiperList[i] = {
          postId : i,
          imgSrc: postItem.imgSrc,
        };
          if(i == 2){
            break;
          }
      }
      this.setData({swiperList});
    // this.setData({data1});//ES6
  },
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'posts-detail/posts-detail?id=' + postId,
    })
  },
  onSwiperTap: function (event){
    //target 当前点击组件 currentTarget 事件捕获组件
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: 'posts-detail/posts-detail?id=' + postId,
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