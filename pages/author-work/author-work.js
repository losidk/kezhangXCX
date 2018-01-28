//author-work.js
//获取应用实例
const app = getApp()

Page({
  data: {
    searchResult:[],//搜索印章列表结果
    activeId:0,//当前选择的名家id
    allNum:0,//已搜索索引
    allNumList:[0],//allNum
    prevAllNumList:[]// 向上翻页标记
  },
  onLoad: function(e){
    this.setData({
      'activeId':e.logiciansId-0
    });
    this.globalSearchHandle();
  },
  onReady:function(){

  },

  //下一页 搜索
  searchStampHandle:function(){
     let _this = this;
     let innerAllNumList = this.data.allNumList;
       wx.request({
         url:app.globalData.baseUrl+'api/stamp/stampsQuery',
         type:'post',
         data:{
           'logiciansId':this.data.activeId,//名家id
           'size':8,//每页显示的数据个数
           'allNum':this.data.allNum
         },
         dataType:'json',
         success:function(res){
           // 错误处理
           if(res.statusCode!=200){
             app.toast('获取名家列表失败');
             return;
           }
           //未请求到数据
           if(res.data.data.stampList.length==0){
             app.toast('无更多内容');
             return;
           }

           innerAllNumList.push(res.data.data.allNum);

           // 设置最新的allNum（用于翻页）
           _this.setData({
             'searchResult':res.data.data,
             'allNum':res.data.data.allNum,
             'disabled':false,
             'allNumList':innerAllNumList
           });
         }
       });
  },
  //上一页 搜索
  prevSearchStampHandle:function(){
    let _this = this;
    let innerAllNumList = this.data.allNumList;
     if(this.data.prevAllNumList.length==this.data.allNumList.length){
      app.toast('没有更多数据');
      return;
    }
    this.setData({
      'prevAllNumList':this.data.allNumList
    });

    if(innerAllNumList.length==2){
      innerAllNumList.pop();
    }else {
      innerAllNumList.pop();
      innerAllNumList.pop();
    }

    // innerAllNumList.pop();
     wx.request({
       url:app.globalData.baseUrl+'api/stamp/stampsQuery',
       type:'post',
       data:{
         'logiciansId':this.data.activeId,//名家id
         'size':8,//每页显示的数据个数
         'allNum':innerAllNumList[innerAllNumList.length-1]
       },
       dataType:'json',
       success:function(res){
         // 错误处理
         if(res.statusCode!=200){
           app.toast('获取名家列表失败');
           return;
         }
         //未请求到数据
         if(res.data.data.stampList.length==0){
           app.toast('没有更多数据');
           return;
         }

         innerAllNumList.push(res.data.data.allNum);

         // 设置最新的allNum（用于翻页）
         _this.setData({
           'searchResult':res.data.data,
           'allNum':res.data.data.allNum,
           'disabled':false,
           'allNumList':innerAllNumList
         });
       }
     });
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
          // 错误处理
          if(res.statusCode!=200){
            app.toast('获取名家列表失败');
            return;
          }
          //未请求到数据
          if(res.data.data.stampList.length==0){
            app.toast('无更多内容');
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
