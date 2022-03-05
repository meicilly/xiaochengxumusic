// pages/music-player/index.js
import {getSongDetail} from "../../service/api_player"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    currentSong:{},
    currentPage:0,
    contentHeight:0,
    isMusicLyric: true,
    duration: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.获取传入的id
    const id = options.id
    this.setData({id})
    //2.根据id获取歌曲的信息
    this.getPageData(id)
    //3.动态计算内容高度
      const globalData = getApp().globalData
      const screenHeight = globalData.screenHeight
      const statusBarHeight = globalData.statusBarHeight
      const navBarHeight = globalData.navBarHeight
      const contentHeight = screenHeight - statusBarHeight - navBarHeight
      const deviceRadio = globalData.deviceRadio
      this.setData({ contentHeight,isMusicLyric: deviceRadio >= 2 })
    //4.创建播放器
    const audioContext = wx.createInnerAudioContext()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
   // audioContext.play()
    audioContext.onCanplay(() => {

    })
  },
    //网络请求相关的代码
    getPageData:function(id){
      getSongDetail(id).then(res => {
        //console.log(res)
        this.setData({currentSong:res.songs[0],duration: res.songs[0].dt})
      })
    },
    //事件处理
    handleSwiperChange:function (event) {
      //console.log(event)
      const current = event.detail.current
      this.setData({ currentPage: current })
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