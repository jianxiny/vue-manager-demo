<template>
  <div
    class="container mx-auto flex justify-center items-center shadow h-screen-sm w-screen-sm border-gray-500 mt-10"
  >
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import api from '../api'
import { gennerateRoutes } from '../libs'

interface FormState {
  username: string
  password: string
}

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const formState = reactive<FormState>({
      username: '',
      password: ''
    })

    const loadRoutes = async () => {
      try {
        const res: any = await api.getPermissonMenuList()
        console.log('menulist:', res)
        const routes = gennerateRoutes(res.menuList)
        routes.forEach((item) => {
          router.addRoute('Home', item)
        })
      } catch (err) {
        console.log('err in load routes:', err)
      }
    }
    const onFinish = ({ username, password }: FormState) => {
      console.log('Success:', username, password)
      api
        .login({
          userName: username,
          userPwd: password
        })
        .then(async (res: any) => {
          console.log('login res: ', res)
          store.commit('saveUserInfo', res)
          await loadRoutes()
          router.push('/welcome')
        })
    }

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
    return {
      formState,
      onFinish,
      onFinishFailed
    }
  }
})
</script>
