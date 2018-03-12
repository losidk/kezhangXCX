//获取应用实例
const app = getApp()

Page({
  data: {
    stampId: -1,
    stampDesc: {},
    stampIntro:null,//详情
    stampSideIntro:'无',//边款
    orgMapBean:null,//
    sideUrl:null,
    sealUrl:null,
    animationData: '', //释文、边款、详情列表动画
    activeId: 0, //名家id
    imgList: []
  },
  onLoad: function(e) {
    this.setData({
      'stampId': e.stampId - 0
    });
    this.loadStampDesc();
  },
  onReady: function() {
    this.animationData = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
  },
  //点击显示(隐藏)释文、边款、详情列表
  chooseAuthorHandle: function() {
    if (this.data.authorListStatus) {
      // 打开释文、边款、详情列表
      this.closeAuthorListHandle();
    } else {
      // 关闭释文、边款、详情列表
      this.openAuthorListHandle();
    }
  },
  //打开释文、边款、详情列表
  openAuthorListHandle: function() {
    this.animationData.left('-476rpx').width('584rpx').step();
    this.setData({
      'authorListStatus': true,
      'animationData': this.animationData.export(),
    })
  },
  //关闭释文、边款、详情列表
  closeAuthorListHandle: function() {
    this.animationData.left('20rpx').width('0rpx').step();
    this.setData({
      'authorListStatus': false,
      'animationData': this.animationData.export(),
      // 'activeId':-1
    });
  },
  // 加载印章详情：
  loadStampDesc: function() {
    var _this = this;
    wx.request({
      url: app.globalData.baseUrl + 'api/stamp/stampDetailQry',
      data: {
        stampId: this.data.stampId
      },
      success: function(res) {
        console.log(res.data.data);
        var orgUrl = 'https://api.duyin.ren/wu-small.png';
        var sealUrl = 'https://api.duyin.ren/wu-small.png';
        var sideUrl = 'https://api.duyin.ren/wu-small.png';
        if (res.data.data.orgMapBean.imgurl!=='null') {
          orgUrl = 'https://api.duyin.ren/api/aliyun/oss/' + res.data.data.orgMapBean.imgurl;
          _this.setData({
            'orgMapBean':orgUrl
          })
        }
        if (res.data.data.sealMapBean.imgurl!=='null') {
          sealUrl = 'https://api.duyin.ren/api/aliyun/oss/' + res.data.data.sealMapBean.imgurl;
          _this.setData({
            'sealUrl':sealUrl
          })
        }
        if (res.data.data.sideImg[0].imgurl!=='null') {
          sideUrl = 'https://api.duyin.ren/api/aliyun/oss/' + res.data.data.sideImg[0].imgurl;
          _this.setData({
            'sideUrl':'https://api.duyin.ren/api/aliyun/oss/'+res.data.data.sideImg[0].imgurl
          })
        }
        _this.setData({
          'stampDesc': res.data.data,
          'stampIntro':res.data.data.sampIntro||'无',
          'activeId': res.data.data.logiciansId,
          'imgList': [sealUrl + '', sideUrl + '', orgUrl + '']
        });
        if(res.data.data.sideImg[0].chars!=='null'){
          _this.setData({
            'stampSideIntro':res.data.data.sideImg[0].chars
          })
        }
      }
    });
  },
  //预览图片：
  previewImgHandle: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.imgList // 需要预览的图片http链接列表
    })
  }
})
