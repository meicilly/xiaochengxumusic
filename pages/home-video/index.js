import {getTopMV} from "../../service/api_video"

// pages/home-video/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVs:[],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    this.getTopMVData(0)
  },
 //封装网络请求
  getTopMVData: async function(offset){
    //判断是否还可以请求
    if(!this.data.hasMore) return
    //展示加载动画
    wx.showNavigationBarLoading()
    const res = await getTopMV(offset)
    let newData = this.data.topMVs
    //console.log(res.data)
    if(offset == 0){
      newData = res.data
    }else{
      newData = [...newData,...res.data]
     //newData = newData.concat(res.data)
    }
    //设置数据
    this.setData({topMVs:newData})
    this.setData({ hasMore: res.hasMore })
    wx.hideNavigationBarLoading()
    if (offset === 0) {
      wx.stopPullDownRefresh()
    }
  },
  //封装事件处理函数
  handleVideoItemClick: function(event){
    //console.log(1)
    //console.log(event)
    //获取id
    const id = event.currentTarget.dataset.item.id
    //console.log(id)
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`,
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
    // console.log("下拉了")
     this.getTopMVData(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getTopMVData(this.data.topMVs.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})