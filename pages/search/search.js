//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    authorListStatus:true,
    authorList:[],
    animationData:'',

  },

  onLoad: function () {

  },
  onReady:function(){
    this.animationData = wx.createAnimation({
      duration:500,
      timingFunction:'ease',
    })
  },
  //点击显示(隐藏)名家
  chooseAuthorHandle:function(){
    if(this.data.authorListStatus){
      this.animationData.left('-454rpx').width('510rpx').step()
      this.setData({
        'authorListStatus':false,
        'animationData':this.animationData.export(),
      })
    }else{
      this.animationData.left('20rpx').width(0).step();
      this.setData({
        'authorListStatus':true,
        'animationData':this.animationData.export(),
      });
    }
  }
})
