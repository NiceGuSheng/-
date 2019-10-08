// components/search/index.js

import {KeywordModel} from '../../models/keyword.js'
import { BookModel} from '../../models/book.js'
import { paginationBev } from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more:{
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searching: false,
    historyWords:[],
    hotWords: [],
    q: '',
    loading: false,
    loadingCenter: false
  },
  attached(){
    const historyWords = keywordModel.getHistory()
    const hotWords = keywordModel.getHot()
    this.setData({
      historyWords
  })
  hotWords.then(res=>{
    this.setData({
      hotWords: res.hot
    })
  })
  },
  /**
   * 组件的方法列表
   */
  methods: {

    loadMore() {
      // console.log(2323)
      if(!this.data.q){
        return
      }
      if (this.data.loading){
        return
      }
      // const length = this.data.dataArray.length
      
      if(this.hasMore()){
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.unLocked()
        },()=>{
          this.unLocked()
        })
      }

    },
    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },
    onDelete(event){
      this.initialize()
      this.setData({
        searching: false,
        q: ''
      })

    },
    onConfirm(event){
    
      this.setData({
        searching: true
      })
      this._showLoadingCenter()
      
      const q = event.detail.value || event.detail.text
      bookModel.search(0,q).then(res=>{
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q
        })
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },



  },


})
