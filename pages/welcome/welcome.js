Page({
  onTap:function(){

    //转发 执行onHide
    // wx.navigateTo({
    //   url: '/pages/posts/posts',
    // })
    //重定向 执行onUnload
    // wx.redirectTo({
    //   url: '/pages/posts/posts',
    // })
    //使用tabBar 页面跳转用
    wx.switchTab({
      url: '/pages/posts/posts',
    })
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
})