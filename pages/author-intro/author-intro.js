//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    authorListStatus:true,
    animationData:'',
    authorInfo:{
      "intro":"王福庵（1880～1960），现代书法篆刻家，“西泠印社”创始人之一。原名禔、寿祺，字维季，号福庵，以号行，别号印奴、印佣，别署屈瓠、罗刹江民，七十岁后称持默老人，斋名麋研斋。浙江杭州人，年五十居上海。精篆刻，是。书法工篆、隶。得吴昌硕鼓励，另辟蹊径，专工小篆与金文。所书小篆工整规范，秀美遒劲。所篆《说文部首》字帖、《说文作篆通假》，向为行家肯定，成为学篆范本。",
      "img":"../../images/photo.png",
      "productImg":'../../images/stemp.png'
    }
  },
  onLoad: function (e) {
    console.log(e);
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
