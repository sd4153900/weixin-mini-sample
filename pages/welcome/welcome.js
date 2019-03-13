Page({
  onTap:function(){

    //转发 执行onHide
    // wx.navigateTo({
    //   url: '/pages/posts/posts',
    // })
    //重定向 执行onUnload
    wx.redirectTo({
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