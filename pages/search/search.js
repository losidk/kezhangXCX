//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    authorListStatus:true,//名家列表显示状态
    size:20,//名家列表页页码
    authorList:[],//名家列表
    searchResultList:[],//搜索印章列表结果
    animationData:'',//名家列表盒子动画
    chars:'',//用户搜索关键字
    activeId:-1//当前选择的名家id
  },
  onLoad: function(){},
  onReady:function(){
    this.animationData = wx.createAnimation({
      duration:500,
      timingFunction:'ease',
    })
    this.loadAuthorListHandle();
  },
  //点击显示(隐藏)名家
  chooseAuthorHandle:function(){
    if(this.data.authorListStatus){
    // 打开名家列表
      this.openAuthorListHandle();
    }else{
      // 关闭名家列表
      this.closeAuthorListHandle();
    }
  },
  //打开名家列表
  openAuthorListHandle:function(){
    this.animationData.left('-454rpx').width('510rpx').step();
    this.setData({
      'authorListStatus':false,
      'animationData':this.animationData.export(),
    })
  },
  //关闭名家列表
  closeAuthorListHandle:function(){
    this.animationData.left('20rpx').width(0).step();
    this.setData({
      'authorListStatus':true,
      'animationData':this.animationData.export(),
      'activeId':-1
    });
  },
  //加载名家列表：
  loadAuthorListHandle:function(){
    // 请求名家列表
      wx.request({
      url:app.globalData.baseUrl+'api/stamp/listCarvingMaster',
      data:{
        page:1,
        size:this.data.size
      },
      type:"post",
      dataType:'json',
      success:(res)=>{
        // 错误处理
        if(res.statusCode!=200){
          wx.showToast({
            title: '获取名家列表失败',
            icon: 'loading',
            duration: 2000
          });
          return;
        };
        if(res.data.data.length!==this.data.size){
         wx.showToast({
          title:"没有更多数据了",
          icon:"../../images/search-bg.png",//需要修改
          duration:2000
         });
          return;
        }
        this.setData({
          "authorList":res.data.data
        })
      }
    });
  },
  //名家列表页加载更多
  loadMoreHandle:function(){
    // console.log("loadmore");
    this.data.size+=10;
    // console.log(this);
    // console.log('size'+this.data.size);
    this.setData({
      'size':this.data.size
    });
    // console.log(e);
    // console.log("loadmore");
    this.loadAuthorListHandle();
  },
  //点击选中名家
  isSelectedHandle:function(e){
    // console.log(e.currentTarget.dataset.id);
    // this.data.activeId = e.currentTarget.dataset.id;
    this.setData({
      'activeId':e.currentTarget.dataset.id
    });
  },
  //搜索框文字变化
  inputChangeHandle:function(e){
    console.log(e.detail.value);
    this.setData({
      'chars':e.detail.value
    });
  },
  //搜索印章
  searchStampHandle:function(){
    var _this = this;
    //未选择名家
    if(this.data.activeId==-1){
      // 未选择名家、已输入搜索关键字
      if(this.data.chars!=''){
        wx.request({
          url:app.globalData.baseUrl+'api/stamp/stampsQuery',
          type:'post',
          data:{
            // 'logiciansId':this.data.activeId,//名家id
            'chars':this.data.chars,//搜索印章关键字
            'page':1,//开始页
            'size':10,//每页显示的数据个数
            'stampId':''
          },
          dataType:'json',
          success:function(res){
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
            if(res.data.data.length==0){
              wx.showToast({
                title:'内容未找到',
                icon:'loading',
                duration:2000
              });
              return;
            }
            _this.setData({
              'searchResultList':res.data.data
            });
          }
        });
        // 未选择名家、未输入关键字
      }else{
        wx.request({
          url:app.globalData.baseUrl+'api/stamp/stampsQuery',
          type:'post',
          data:{
            // 'logiciansId':this.data.activeId,//名家id
            'chars':this.data.chars,//搜索印章关键字
            'page':1,//开始页
            'size':10,//每页显示的数据个数
            'stampId':''
          },
          dataType:'json',
          success:function(res){
            // 错误处理
            if(res.statusCode!=200){
              wx.showToast({
                title: '获取名家列表失败',
                icon: 'loading',
                duration: 2000
              })
              // return;
            }
            //未请求到数据
            if(res.data.data.length==0){
              wx.showToast({
                title:'内容未找到',
                icon:'loading',
                duration:2000
              });
              return;
            }

            // console.log(res);
            _this.setData({
              'searchResultList':res.data.data
            });
          }
        });

        // 跳转到名家详情页
        // wx.redirectTo({
        //   url:'../author-intro/author-intro?id='+this.data.activeId
        // })
      }
      // 选择名家
    }else{
      // 选择名家、选择文字
      if(this.data.chars!=''){
        wx.request({
          url:app.globalData.baseUrl+'api/stamp/stampsQuery',
          type:'post',
          data:{
            'logiciansId':this.data.activeId,//名家id
            'chars':this.data.chars,//搜索印章关键字
            'page':1,//开始页
            'size':10,//每页显示的数据个数
            'stampId':''
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
            if(res.data.data.length==0){
              wx.showToast({
                title:'内容未找到',
                icon:'loading',
                duration:2000
              });
              // return;
            }
            // console.log(res);
            _this.setData({
              'searchResultList':res.data.data
            });
          }
        });
        // 选择名家、未选择文字
      }else{
        // 跳转到名家详情页
        wx.navigateTo({
          url:'../author-intro/author-intro?id='+this.data.activeId
        })
      }
    }
    // 关闭名家列表
    this.closeAuthorListHandle();
  },
})
