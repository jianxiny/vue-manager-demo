import request from './../libs/request'

export default {
  login(params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params
    })
  },
  createOrUpdateUser(params) {
    return request({
      url: '/users/operate',
      method: 'post',
      data: params
    })
  },
  deleteUser(params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params
    })
  },
  noticeCount() {
    return request({
      url: '/leave/count',
      method: 'get'
    })
  },
  getMenuList(params) {
    return request({
      url: '/menu/list',
      method: 'get',
      data: params
    })
  },
  getUserList(params) {
    return request({
      url: '/users/list',
      method: 'get',
      data: params
    })
  },
  userDel(params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params
    })
  },
  getRoleList() {
    return request({
      url: '/roles/allList',
      method: 'get',
      data: {}
    })
  },
  getDeptList() {
    return request({
      url: '/dept/list',
      method: 'get',
      data: {}
    })
  },
  userSubmit(params) {
    return request({
      url: '/users/operate',
      method: 'post',
      data: params
    })
  },
  menuSubmit(params) {
    return request({
      url: '/menu/operate',
      method: 'post',
      data: params
    })
  },
  getPermissonMenuList() {
    return request({
      url: '/menu/getPermissonMenuList',
      method: 'get'
    })
  },
  getApproveCount() {
    return request({
      url: '/leave/count',
      method: 'get'
    })
  },
  getRolesNameList() {
    return request({
      url: '/roles/operate',
      method: 'get'
    })
  }
}
