<template>
  <!-- 新增用户弹窗 -->
  <a-modal
    v-model:visible="visible"
    title="创建新用户"
    ok-text="创建"
    cancel-text="取消"
    @cancel="onModalCancel"
    @ok="onOk"
  >
    <a-form
      ref="formRef"
      :model="formState"
      layout="vertical"
      name="form_in_modal"
    >
      <a-form-item
        label="用户名"
        name="userName"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input
          v-model:value="formState.userName"
          placeholder="请输入用户名称"
        ></a-input>
      </a-form-item>
      <a-form-item
        :rules="[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please input corrent email' }
        ]"
        label="邮箱"
        name="userEmail"
      >
        <a-input
          type="email"
          v-model:value="formState.userEmail"
          placeholder="请输入用户邮箱"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="手机号" name="mobile">
        <a-input
          v-model:value="formState.mobile"
          placeholder="请输入手机号码"
        ></a-input>
      </a-form-item>
      <a-form-item label="岗位" name="job">
        <a-input
          v-model:value="formState.job"
          placeholder="请输入岗位"
        ></a-input>
      </a-form-item>

      <a-form-item label="状态" name="state">
        <a-select
          v-model:value="formState.state"
          placeholder="请选择"
          :options="stateOps"
        >
        </a-select>
      </a-form-item>

      <a-form-item label="角色" name="role">
        <a-select
          v-model:value="formState.role"
          placeholder="请选择"
          :options="rolesNameList"
        >
        </a-select>
      </a-form-item>
      <a-form-item
        label="部门"
        name="dept"
        :rules="[{ required: true, message: 'Please select your department!' }]"
      >
        <a-cascader
          v-model:value="formState.dept"
          :options="deptList"
          placeholder="Please select"
        />
      </a-form-item>
    </a-form>
  </a-modal>
  <!-- dialog end  -->
  <div class="users-main">
    <!-- 头部查询功能区域 -->
    <div class="users-top">
      <!-- <a-form -->
      <!--   layout="inline" -->
      <!--   :model="selectData" -->
      <!--   @finish="onFinish" -->
      <!--   @finishFailed="onFailed" -->
      <!-- > -->
      <!--   <a-form-item label="用户ID" name="userId"> -->
      <!--     <a-input -->
      <!--       v-model="selectData.userId" -->
      <!--       type="Number" -->
      <!--       placeholder="请输入用户ID" -->
      <!--     ></a-input> -->
      <!--   </a-form-item> -->
      <!--   <a-form-item label="用户名" name="userName"> -->
      <!--     <a-input -->
      <!--       v-model="selectData.userName" -->
      <!--       placeholder="请输入用户名" -->
      <!--     ></a-input> -->
      <!--   </a-form-item> -->
      <!--   <a-form-item label="用户状态" name="state"> -->
      <!--     <a-select -->
      <!--       v-model:value="selectData.state" -->
      <!--       @change="onStateChange" -->
      <!--       placeholder="请选择" -->
      <!--       :options="stateOps" -->
      <!--     > -->
      <!--     </a-select> -->
      <!--   </a-form-item> -->
      <!--   <a-form-item> -->
      <!--     <a-button type="primary" @click="onSearchHandler">查询</a-button> -->
      <!--     <a-button @click="onResetHandler('selectForm')">重置</a-button> -->
      <!--   </a-form-item> -->
      <!-- </a-form> -->
    </div>

    <div class="users-bottom">
      <div class="users-bottom-top my-10">
        <a-button type="primary" @click="addUserHandler">新增用户</a-button>
      </div>
      <a-table
        :dataSource="userData"
        :columns="columnList"
        :pagination="pageData"
        @change="onTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button
              size="small"
              danger
              v-permission="'user-delete'"
              @click="onUserDelete(record)"
              >删除</a-button
            >
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref, getCurrentInstance } from 'vue'
import { message } from 'ant-design-vue'
export default {
  name: 'Users',
  setup() {
    const selectData = reactive({
      state: 1
    })
    let userData = ref([])
    const rolesNameList = ref([])
    const deptList = ref([])

    let pageData = reactive({
      pageNum: 1,
      pageSize: 3,
      total: 0
    })

    const stateOps = ref([
      {
        value: 0,
        label: '所有'
      },
      { value: 1, label: '在职' },
      { value: 2, label: '离职' },
      { value: 3, label: '试用' }
    ])

    const columnList = [
      {
        dataIndex: 'userId',
        title: '用户ID'
      },
      {
        dataIndex: 'userName',
        title: '用户名'
      },
      {
        dataIndex: 'userEmail',
        title: '用户邮箱'
      },
      {
        dataIndex: 'role',
        title: '用户角色',
        customRender({ text }) {
          return {
            0: '管理员',
            1: '普通用户'
          }[text]
        }
      },
      {
        dataIndex: 'state',
        title: '用户状态',
        customRender({ text }) {
          return {
            1: '在职',
            2: '离职',
            3: '试用期'
          }[text]
        }
      },
      {
        dataIndex: 'createTime',
        title: '注册时间',
        customRender({ text }) {
          return text.split('T')[0]
        }
      },
      {
        dataIndex: 'lastLoginTime',
        title: '最后登录时间',
        customRender({ text }) {
          return text.split('T')[0]
        }
      },
      {
        key: 'action',
        title: '操作'
      }
    ]

    // modal user form
    const formRef = ref()
    const visible = ref(false)
    const formState = reactive({})
    const userAction = ref('add') // action will be 'add' or 'edit'

    const onModalCancel = () => {
      formRef.value.resetFields()
      visible.value = false
    }
    const onOk = () => {
      formRef.value
        .validateFields()
        .then(async (values) => {
          const payload = {
            ...values,
            action: userAction.value,
            deptId: values.dept
          }
          console.log('user create or update payload: ', payload)
          await proxy.$api.createOrUpdateUser(payload)
          if (userAction.value === 'add') {
            message.info('add success')
          } else {
            message.info('update success')
          }
        })
        .catch((info) => {
          console.log('user form infos: ', info)
          message.error('please input the correct informations')
        })
    }

    //modal user form end

    onMounted(() => {
      getUserListRequest()
      getRolesRequest()
      getDeptListRequest()
    })

    const onTableChange = ({ current }) => {
      pageData.pageNum = current
      getUserListRequest()
    }

    const onUserEdit = () => {}

    const onUserDelete = async (params) => {
      console.log('edit params: ', params.userId)
      const ids = { userIds: [params.userId] }
      try {
        const res = await proxy.$api.deleteUser(ids)
        console.log('delete user res: ', res)
        if (res.nModified > 0) {
          message.info('delete success')
          getUserListRequest()
        }
      } catch (err) {
        message.error('delete failed')
      }
    }

    const { proxy } = getCurrentInstance()
    const getUserListRequest = async () => {
      const params = { ...selectData, ...pageData }
      try {
        const res = await proxy.$api.getUserList(params)
        console.log('data user', res)
        userData.value = res.list.map((item) => ({ ...item, key: item.userId }))
        pageData.total = res.page.total
      } catch (error) {
        console.log(error)
      }
    }

    const getRolesRequest = async () => {
      const res = await proxy.$api.getRolesNameList()
      console.log('roles', res)
      const ops = res.map((item) => ({
        value: item._id,
        label: item.roleName
      }))
      console.log('ops:', ops)
      rolesNameList.value = ops
    }

    const formatDeptOps = (deps) => {
      if (!deps || deps.length === 0) return undefined
      return deps.map((item) => ({
        label: item.deptName,
        value: item._id,
        children: formatDeptOps(item.children)
      }))
    }
    const getDeptListRequest = async () => {
      const res = await proxy.$api.getDeptList()
      deptList.value = formatDeptOps(res)
    }

    const onFinish = () => {}
    const onFailed = () => {}
    const onSearchHandler = () => {}
    const onResetHandler = () => {}
    const onStateChange = (params) => {
      console.log('state prop', params)
    }

    const addUserHandler = () => {
      visible.value = true
    }
    const handleDelete = () => {}
    return {
      //modal
      visible,
      onOk,
      formState,
      rolesNameList,
      deptList,
      onModalCancel,
      formRef,
      //
      onUserEdit,
      onUserDelete,
      onTableChange,
      pageData,
      userData,
      columnList,
      addUserHandler,
      handleDelete,
      onStateChange,
      stateOps,
      selectData,
      onFinish,
      onFailed,
      onSearchHandler,
      onResetHandler
    }
  }
}
</script>
<style scoped></style>
