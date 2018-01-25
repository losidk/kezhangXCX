//author-work.js
//获取应用实例
const app = getApp()

Page({
  data: {
    searchResult:[],//搜索印章列表结果
    activeId:0,//当前选择的名家id
    allNum:0,//已搜索索引
  },
  onLoad: function(e){
    console.log(e);
    this.setData({
      'activeId':e.logiciansId-0
    });
    this.globalSearchHandle();
  },
  onReady:function(){

  },

  //下一页印章
  searchStampHandle:function(){
    this.globalSearchHandle(this.data.allNum);
  },
  // 搜索印章方法封装：
  globalSearchHandle:function(allNum){
    var allNum1 = (allNum-0)||0;
    var _this = this;
      wx.request({
        url:app.globalData.baseUrl+'api/stamp/stampsQuery',
        type:'post',
        data:{
          'logiciansId':this.data.activeId,//名家id
          // 'chars':this.data.chars,//搜索印章关键字
          'size':8,//每页显示的数据个数
          'allNum':allNum1
        },
        dataType:'json',
        success:function(res){
          console.log(res);
          // 错误处理
          if(res.statusCode!=200){
            wx.showToast({
              title: '获取名家列表失败',
              icon: 'loading',
              duration: 2000
            })
            return;
          }
          //未请求到数据
          if(res.data.data.stampList.length==0){
            wx.showToast({
              title:'无更多内容',
              icon:'success',
              duration:2000
            });
            return;
          }
          // 设置最新的allNum（用于翻页）
          _this.setData({
            'searchResult':res.data.data,
            'allNum':res.data.data.allNum,
            'disabled':false
          });
        }
      });
  }
})
