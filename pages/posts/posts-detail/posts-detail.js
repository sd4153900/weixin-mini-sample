// pages/posts/posts-detail/posts-etail.js
var postsData = require("../../../data/posts-data.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMusicPlay : false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var postId = options.id;
    var postData = postsData.postList[postId];
    this.setData({postData});
    // this.data.postData = postData;//无效？

    this.initStorage(postId);
    
    this.initMusicStatus(postId);
      
    this.listenMusicManager(postId);


    // //缓存 sync 同步
    // //缓存上限10MB
    // //缓存设置
    // wx.setStorageSync('key', "学习奋斗");
    // //缓存获取
    // wx.getStorageSync("key");
    // //删除缓存
    // wx.getStorageSync("key");
    // //清空缓存
    // wx.clearStorageSync()；
  },

  //初始化缓存数据
  initStorage: function (postId){
    var postsCollected = wx.getStorageSync("posts_coolected");

    if (postsCollected) {
      var postCollectde = postsCollected[postId];
      if (postCollectde){
        this.setData({
          collected: postCollectde
        });
      }
    } else {
      postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_coolected", postsCollected);
    }
  },
  //初始化音乐播放状态
  initMusicStatus: function (postId){
    var globalData = app.globalData;

    if (globalData.g_isPlayingMusic && globalData.g_currentMusicPostId === postId) {
      this.setData({
        isMusicPlay: true,
      });
    }
  },
  //监听音乐播放事件
  listenMusicManager: function (postId){
    var globalData = app.globalData;
    var that = this;
    const BackgroundAudioManager = wx.getBackgroundAudioManager();

    BackgroundAudioManager.onPlay(function () {
      that.setData({
        isMusicPlay: true,
      });
      globalData.g_isPlayingMusic = true;
      globalData.g_currentMusicPostId = postId;
    });

    BackgroundAudioManager.onPause(function () {
      that.setData({
        isMusicPlay: false,
      });
      globalData.g_isPlayingMusic = false;
    });
  },
  //收藏功能
  onCollectionTap:function(event){
    // var postCollectde = this.data.collected;
    var postId = this.data.postData.postId;
    var postsCollected = wx.getStorageSync("posts_coolected");
    var postCollectde = postsCollected[postId];
    //取反
    postCollectde = !postCollectde;
    postsCollected[postId] = postCollectde;
    wx.setStorageSync("posts_coolected", postsCollected);
    //更新画面显示
    this.setData({
      collected: postCollectde
    });

    wx.showToast({
      title: postCollectde ? '收藏成功' : '取消收藏',
      duration : 1000,
    })
  },
  //分享功能（假的）
  onShareTap:function(event){
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success:function(res){
        // res.cancel
        // res.tapIndex
        if (!res.cancel){
          // console.log(itemList[res.tapIndex]);
          wx.showModal({
            title: '分享',
            content: '是否' + itemList[res.tapIndex] + '?',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '',
            confirmText: '分享',
            confirmColor: '',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      }
    });
      // wx.removeStorageSync("key");
  },
  //音乐播放功能
  onMusicTap:function(event){
    var music = this.data.postData.music; 
    var isMusicPlay = this.data.isMusicPlay;
    const BackgroundAudioManager = wx.getBackgroundAudioManager();
    if (isMusicPlay){
      this.setData({
        isMusicPlay: false,
      });
      BackgroundAudioManager.pause();
    }else{
      this.setData({
        isMusicPlay: true,
      });
      BackgroundAudioManager.title = music.title;
      BackgroundAudioManager.coverImgUrl = music.coverImg;
      BackgroundAudioManager.src = music.url;
    }
    
   
    
    // BackgroundAudioManager.play();
    // wx.playBackgroundAudio({
    //   dataUrl: 'http://music.163.com/song/media/outer/url?id=142604.mp3',
    //   title:'夜夜夜夜-齐秦',
    //   coverImgUrl:'http://y.gtimg.cn/music/photo_new/T002R150x150M000001TEc6V0kjpVC.jpg?max_age=2592000',

    // })
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