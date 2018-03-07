//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    firstId:0,
    secondId:0,
    logiciansId:0,
    authorInfo:{}
  },
  onLoad: function (e) {
    this.setData({
      'firstId':e.firstId-0,
      'secondId':e.secondId-0
    });
    this.loadAuthorInfo();
  },
  onReady:function(){

  },
  // 加载名家详情数据:
  loadAuthorInfo:function(){
    let _this = this;
    wx.request({
      url:app.globalData.baseUrl+'api/stamp/logiciansDetailQry',
      data:{
        'logiciansId':this.data.firstId||this.data.secondId
      },
      type:'post',
      success:function(res){
        _this.setData({
          'authorInfo':res.data.data
        });
      }
    });
  },
  //加载全部作品：
  loadAllWorks:function(){
    let _this=this;
    this.setData({
      'logiciansId':_this.data.firstId||_this.data.secondId
    });
    wx.navigateTo({
      url:'../author-work/author-work?logiciansId='+this.data.logiciansId
    })
  }
})
