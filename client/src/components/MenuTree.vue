<template>
  <template v-for="item in menuList" :key="item._id">
    <a-sub-menu
      :key="item.path"
      v-if="
        item.children &&
        item.children.length > 0 &&
        item.children[0].menuType == 1
      "
    >
      <template #title>
        <span>
          <span>{{ item.menuName }}</span>
        </span>
      </template>
      <menu-tree :menuList="item.children" />
    </a-sub-menu>

    <a-menu-item v-else :key="item.path" @titleClick="onItemClick">
      {{ item.menuName }}
    </a-menu-item>
  </template>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MenuTree',
  props: {
    menuList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    onItemClick(params) {
      console.log('params: ', params)
    }
  }
})
</script>
