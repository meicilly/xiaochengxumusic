// components/song-menu-area/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songMenu:{
      type:Array,
      value:[]
    },
    title:{
      type:String,
      value:"默认歌单"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWitdh:app.globalData.screenWitdh
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleMenuItemClick:function(event){
      //console.log("歌单item的点击")
      const item = event.currentTarget.dataset.item
      //console.log(item)
      wx.navigateTo({
        url: `/pages/detail-songs/index?id=${item.id}&type=menu`,
      })
    }
  }
})
