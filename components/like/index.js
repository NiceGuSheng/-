// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLike:{
      type : Boolean,
      value : false
    },
    count:{
      type : Number
    },
    readOnly: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // isLike : false,
    // count : 99,
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(){
      if(this.properties.readOnly){
        return
      }
        let isLike = this.properties.isLike;
        let count = this.properties.count;
        count = isLike ? count -1 : count + 1
        this.setData({
          count : count,
          isLike: !isLike
        })
        //自定义事件的激活
        let behavior = this.properties.isLike?'like':'cancel'
        this.triggerEvent('like',{
          behavior:behavior
        },{})   
    }
  }
})
