//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    logiciansId:-1,
    authorInfo:{}
  },
  onLoad: function (e) {
    console.log(e);
    this.setData({
      'logiciansId':e.logiciansId
    });
    console.log(this.data.logiciansId);
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
        'logiciansId':this.data.logiciansId
      },
      type:'post',
      success:function(res){
        console.log(res);
        _this.setData({
          'authorInfo':res.data.data
        });
      }
    });
  }
})
