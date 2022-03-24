import { createStore } from 'vuex'
import mutations from './mutations'
import storage from './../libs/storage'

const state = {
  userInfo: '' || storage.getItem('userInfo') // 获取用户信息
}
const store = createStore({
  state,
  mutations
})

export default store
