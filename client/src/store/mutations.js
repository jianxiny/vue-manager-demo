import storage from './../libs/storage'

export default {
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo
    storage.setItem('userInfo', userInfo)
  },
  // 设置用户菜单权限列表
  setMenuList(state, menuList) {
    state.menuList = menuList
    storage.setItem('menuList', menuList)
  },
  // 设置用户按钮权限列表
  setBtnList(state, btnList) {
    state.btnList = btnList
    storage.setItem('btnList', btnList)
  },
  // 设置通知数量
  setNoticeCount(state, noticeCount) {
    state.noticeCount = noticeCount
    storage.setItem('noticeCount', noticeCount)
  }
}
