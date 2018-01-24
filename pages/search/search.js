//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    authorListStatus:true,//名家列表显示状态
    size:18,//名家列表页页码
    authorList:[],//名家列表
    searchResult:[],//搜索印章列表结果
    animationData:'',//名家列表盒子动画
    chars:'',//用户搜索关键字
    activeId:-1,//当前选择的名家id
    searched:false,//是否查询过
    allNum:0,//已搜索索引
    searchValue:null,//所搜框内容
    disabled:true
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
    // console.log(e.detail.value);
    this.setData({
      'chars':e.detail.value,
      'searchValue':e.detail.value
    });
  },
  //搜索印章
  searchStampHandle:function(){
    console.log('searchValue:'+this.data.searchValue);
    this.globalSearchHandle(this.data.allNum);
    // console.log(this.data.allNum);
  },
  // 搜索印章方法封装：
  globalSearchHandle:function(allNum){
    var allNum1 = (allNum-0)||0;
    var _this = this;


    console.log(this.data.chars);
    console.log(this.data.activeId);
    // 未选择名家、已输入搜索关键字
    if(this.data.activeId==-1&&this.data.chars.trim()!==''){
      console.log('未选择名家、已输入搜索关键字');
      wx.request({
        url:app.globalData.baseUrl+'api/stamp/stampsQuery',
        type:'post',
        data:{
          // 'logiciansId':this.data.activeId,//名家id
          'chars':this.data.chars,//搜索印章关键字
          'size':10,//每页显示的数据个数
          'allNum':allNum1
        },
        dataType:'json',
        success:function(res){
          // console.log(res);
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
            'searched':true
          });
        }
      });
      // 关闭名家列表
      this.closeAuthorListHandle();
      this.setData({
        'disabled':false
      });
    }

    // 未选择名家、未输入关键字
    if(this.data.activeId==-1&&this.data.chars.trim()==''){
      console.log('未选择名家、未输入关键字');
      wx.showToast({
        title: '请输入关键字',
        icon: 'success',
        duration: 2000
      })
      // 关闭名家列表
      this.closeAuthorListHandle();
      return;
    }

    // 选择名家、选择文字
    if(this.data.activeId!==-1&&this.data.chars.trim()!==''){
      console.log('选择名家、选择文字');
      console.log(this.data.activeId);
      wx.request({
        url:app.globalData.baseUrl+'api/stamp/stampsQuery',
        type:'post',
        data:{
          'logiciansId':this.data.activeId,//名家id
          // 'logiciansId':1,//名家id
          'chars':this.data.chars,//搜索印章关键字
          'allNum':0,//
          'size':10,//每页显示的数据个数
        },
        dataType:'json',
        success:function(res){
          // console.log(res);
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
          // console.log(res);
          _this.setData({
            'searchResult':res.data.data,
            'allNum':res.data.data.allNum,
            'searched':true
          });
        }
      });
      // 关闭名家列表
      this.closeAuthorListHandle();
      this.setData({
        'disabled':true
      });
    }

    // 选择名家、未选择文字
    if(this.data.activeId!==-1&&this.data.chars.trim()==''){
      console.log('选择名家、未选择文字');
      wx.navigateTo({
        url:'../author-intro/author-intro?logiciansId='+this.data.activeId
      })
      // 关闭名家列表
      this.closeAuthorListHandle();
      this.setData({
        'disabled':true
      });
    }
  }
})
