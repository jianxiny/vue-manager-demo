<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed">
      <div class="logo" />
      <a-menu
        @click="onMenuClick"
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
      >
        <MenuTree :menuList="menuList" />
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <div class="content-header flex justify-between items-center py-5">
          <breadcrumb />
          <div class="top-userinfo flex justify-between items-center space-x-2">
            <a-badge
              :dot="noticeCount > 0 ? true : false"
              @click="$router.push('/audit/approve')"
            >
              <bell-outlined style="font-size: 1rem" />
            </a-badge>
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                {{ userInfo.userName }}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu @click="onDropMenu">
                  <a-menu-item key="email">
                    <span>邮箱:{{ userInfo.userEmail }}</span>
                  </a-menu-item>
                  <a-menu-item key="logout">
                    <a href="javascript:;">登出</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'

import MenuTree from '../components/MenuTree.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import { BellOutlined, DownOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    MenuTree,
    Breadcrumb,
    BellOutlined,
    DownOutlined
  },
  data() {
    console.log('in home datajs ujs')
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
      noticeCount: 0,
      menuList: [],
      userInfo: (this.$store as any).state.userInfo || {}
    }
  },
  mounted() {
    this.getMenuListRequest()
  },
  methods: {
    onDropMenu({ key }) {
      console.log('key: ', key)
      if (key === 'email') {
        return
      } else if (key === 'logout') {
        //退出登陆
        this.$store.commit('saveUserInfo', '')
        this.$store.commit('setMenuList', '')
        this.$store.commit('setBtnList', '')
        this.$router.replace('/login')
      }
    },
    onMenuClick({ key }: { key: string }) {
      this.$router.push(key)
    },
    //获取菜单列表数据
    async getMenuListRequest() {
      const res = await this.$api.getPermissonMenuList()
      this.menuList = res.menuList
      console.log('menulist', res.menuList)
      this.$store.commit('setMenuList', res.menuList)
      this.$store.commit('setBtnList', res.btnList)
    }
  }
})
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
