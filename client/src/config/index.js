/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  development: {
    baseApi: '/api'
  },
  production: {
    baseApi: '/futurefe.com/api'
  }
}
export default {
  env,
  namespace: 'manager',
  ...EnvConfig[env]
}
