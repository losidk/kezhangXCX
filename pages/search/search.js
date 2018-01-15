//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    authorListStatus:true,
    page:1,//名家列表页页码
    authorList:[
    ],
    searchResult:{
      "author":"",
      "list":[]
    }
    ,
    animationData:'',

  },
  onLoad: function () {

  },
  onReady:function(){
    this.animationData = wx.createAnimation({
      duration:500,
      timingFunction:'ease',
    })
    this.loadAuthorList();
  },
  //点击显示(隐藏)名家
  chooseAuthorHandle:function(){

    if(this.data.authorListStatus){
      this.animationData.left('-454rpx').width('510rpx').step();
      this.setData({
        'authorListStatus':false,
        'animationData':this.animationData.export(),
      })
    }else{
      this.animationData.left('20rpx').width(0).step();
      this.setData({
        'authorListStatus':true,
        'animationData':this.animationData.export()
      });
    }
  },
  // 加载名家列表：
  loadAuthorList:function(size){
    // 请求名家列表
      wx.request({
      url:app.globalData.baseUrl+'api/stamp/listCarvingMaster',
      data:{
        page:this.data.page,
        size:size||18
      },
      type:"post",
      dataType:'json',
      success:(res)=>{
        // console.log(res);
        // 错误处理
        if(res.statusCode!=200){
          wx.showToast({
            title: '获取名家列表失败',
            icon: 'loading',
            duration: 2000
          });
          return;
        };
        if(res.data.data.length<1){
         wx.showToast({
          title:"没有更多数据了",
          icon:"../../images/search-bg.png",//需要修改
          duration:2000
         });
          return;
        }
       res.data.data = this.data.authorList.concat(res.data.data);
        console.log(this.data.authorList);
        this.setData({
          "authorList":res.data.data
        })
      }
    });
  },
  // 名家列表页加载更多
  loadMoreHandle:function(e){
    this.data.page++;
    // console.log(e);
    // console.log("loadmore");
    this.loadAuthorList(12);

  }
})
