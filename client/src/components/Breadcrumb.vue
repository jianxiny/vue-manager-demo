<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in breadData" :key="item.path">
      <router-link :to="item.path" v-if="index == 0">{{
        item.meta.name
      }}</router-link>
      <span v-else>{{ item.meta.name }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script>
export default {
  name: 'Breadcrumb',
  computed: {
    breadData() {
      return this.$route.matched
    }
  }
}
</script>
