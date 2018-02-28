//author-work.js
//获取应用实例
const app = getApp()

Page({
  data: {
    searchResult:[],//搜索印章列表结果
    activeId:0,//当前选择的名家id
    allNum:0,//已搜索索引
    lastNum:0,//
    preAllNum:0,
  },
  onLoad: function(e){
    this.setData({
      'activeId':e.logiciansId-0
    });
    this.globalSearchHandle(0,0);
  },
  onReady:function(){

  },

  //下一页 搜索
  searchStampHandle:function(){
     this.globalSearchHandle(this.data.allNum,this.data.lastNum)
  },
  //上一页 搜索
  prevSearchStampHandle:function(){
    if (this.data.preAllNum < 0) {
      this.setData({
        'preAllNum': 0
      })
      app.toast('无更多内容');
      return;
    }
    this.globalSearchHandle(this.data.preAllNum, this.data.lastNum);
  },
  // 搜索印章方法封装：
  globalSearchHandle:function(allNum,lastNum){
    var allNum = (allNum-0)||0;
    var lastNum = (lastNum-0)||0;
    var _this = this;
      wx.request({
        url:app.globalData.baseUrl+'api/stamp/stampsQuery',
        type:'post',
        data:{
          'logiciansId':this.data.activeId,//名家id
          'size':8,//每页显示的数据个数
          'allNum':allNum,
          'lastNum':lastNum
        },
        dataType:'json',
        success:function(res){
          // 错误处理
          if(res.statusCode!=200){
            app.toast('获取名家列表失败');
            return;
          }
          //未请求到数据
          if(res.data.data.stampList.length == 0){
            app.toast('无更多内容');
            return;
          }
          // 设置最新的allNum（用于翻页）
          _this.setData({
            'searchResult':res.data.data,
            'allNum':res.data.data.allNum,
            'lastNum':res.data.data.stampList.length,
            'preAllNum':res.data.data.preAllNum,
            'disabled':false
          });
        }
      });
  }
})
