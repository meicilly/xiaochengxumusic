// pages/home-music/index.js
import {rankingStore,rankingMap} from "../../store/ranking-store"
import {getBanners,getSongMenu} from "../../service/api_music"
import queryRect from "../../utils/query-rect"

import throttle from '../../utils/throttle'

const throttleQueryRect = throttle(queryRect, 1000)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    swiperHeight: 0,
    hotSongMenu: [],
    recommendSongs:[],
    recommendSongMenu: [],
    rankings: { 0: {}, 2: {}, 3: {} }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取页面数据
    this.getPageData()
    //发起共享请求
    rankingStore.dispatch("getRankingDataAction")
    //从store中获取共享数据
    rankingStore.onState("hotRanking",(res) => {
     if(res.tracks){
      const recommendSongs = res.tracks.slice(0,6)
      //console.log(recommendSongs)
      this.setData({recommendSongs:recommendSongs})
     }
     rankingStore.onState("newRanking", this.getRankingHandler(0))
     rankingStore.onState("originRanking", this.getRankingHandler(2))
     rankingStore.onState("upRanking", this.getRankingHandler(3))
     getSongMenu().then(res => {
       //console.log(res)
       this.setData({hotSongMenu:res.playlists})
     })
     getSongMenu("华语").then(res => {
      this.setData({ recommendSongMenu: res.playlists })
    })
    })
    
  },
  //网络请求
  getPageData:function(){
    getBanners().then(res => {
      //console.log(res)
      this.setData({banners:res.banners})
    })
  },
  //图片加载
  handleSwiperImageLoaded:function(){
      // 获取图片的高度(如果去获取某一个组件的高度)
    throttleQueryRect(".swiper-image").then(res => {
      const rect = res[0]
      this.setData({ swiperHeight: rect.height })
    })
},
handleSearchClick: function() {
  wx.navigateTo({
    url: "/pages/detail-search/index",
  })
},
handleMoreClick:function(){
  //console.log("监听到更多的点击")
  this.navigateToDetailSongsPage("hotRanking")
},
handleRankingClick:function(event){
  //console.log(event) 
  const idx = event.currentTarget.dataset.idx
  //console.log(event)
  const rankingName = rankingMap[idx]
  //console.log(rankingName)
  this.navigateToDetailSongsPage(rankingName)
},
navigateToDetailSongsPage:function(rangkingname){
  wx.navigateTo({
    url: `/pages/detail-songs/index?ranking=${rangkingname}&type=rank`,
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
  getRankingHandler: function(idx) {
    return (res) => {
      //console.log(res)
      if (Object.keys(res).length === 0) return
      //console.log("idx:", idx)
      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const songList = res.tracks.slice(0, 3)
      const rankingObj = {name, coverImgUrl, playCount, songList}
      const newRankings = { ...this.data.rankings, [idx]: rankingObj}
      this.setData({ 
        rankings: newRankings
      })
      //console.log(this.data.rankings)
    }
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