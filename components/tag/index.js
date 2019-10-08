// components/tag/index.js
Component({

  // 开启插槽
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      this.triggerEvent('tapping',{
        text: this.properties.text
      })
    }
  }
})