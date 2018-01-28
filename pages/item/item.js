//item.js 章详情页
//获取应用实例
const app = getApp()

Page({
  data: {
    stampId:-1,
    stampDesc:{},
    animationData:'',//释文、边款、详情列表动画
    activeId:0,//名家id
    imgList:[],
    scrollTop:0//详情scrollTop值
  },
  onLoad: function (e) {
    // console.log(e);
    this.setData({
      'stampId':e.stampId-0
    });
    // console.log(this.data.stampId);
    this.loadStampDesc();
  },
  onReady:function(){
    this.animationData = wx.createAnimation({
      duration:500,
      timingFunction:'ease',
    })
  },
  //点击显示(隐藏)释文、边款、详情列表
  chooseAuthorHandle:function(){
    // console.log('123');
    if(this.data.authorListStatus){
    // 打开释文、边款、详情列表
      this.closeAuthorListHandle();
    }else{
      // 关闭释文、边款、详情列表
      this.openAuthorListHandle();
    }
  },
  //打开释文、边款、详情列表
  openAuthorListHandle:function(){
    this.animationData.left('-476rpx').width('584rpx').step();
    this.setData({
      'authorListStatus':true,
      'animationData':this.animationData.export(),
    })
  },
  //关闭释文、边款、详情列表
  closeAuthorListHandle:function(){
    this.animationData.left('20rpx').width('0rpx').step();
    this.setData({
      'authorListStatus':false,
      'animationData':this.animationData.export(),
      'scrollTop':0
      // 'activeId':-1
    });
  },
  // 加载印章详情：
  loadStampDesc:function(){
    var _this = this;
    wx.request({
      url:app.globalData.baseUrl+'api/stamp/stampDetailQry',
      data:{
        stampId:this.data.stampId
      },
      success:function(res){
        var orgUrl =  'https://stamp.qingkequn.com/wu-small.png';
        var sealUrl = 'https://stamp.qingkequn.com/wu-small.png';
        var sideUrl = 'https://stamp.qingkequn.com/wu-small.png';
        if(res.data.data.orgMapBean){
          orgUrl ='https://stamp.qingkequn.com/'+res.data.data.orgMapBean.imgurl;
        }
        if(res.data.data.sealMapBean){
          sealUrl ='https://stamp.qingkequn.com/'+res.data.data.sealMapBean.imgurl;
        }
        if(res.data.data.sideImg[0]){
          sideUrl ='https://stamp.qingkequn.com/'+res.data.data.sideImg[0].imgurl;
        }

        _this.setData({
          'stampDesc':res.data.data,
          'activeId':res.data.data.logiciansId,
          'imgList':[sealUrl+'',sideUrl+'',orgUrl+'']
        });
      }
    });
  },
  //预览图片：
  previewImgHandle:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls:this.data.imgList // 需要预览的图片http链接列表
    })
  }
})
