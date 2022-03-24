export const gennerateRoutes = (list) => {
  var result = []
  list.forEach((item) => {
    if (item.children && item.btnList) {
      result.push({
        path: item.path,
        name: item.component,
        component: () => import(`../views/${item.component}.vue`),
        meta: {
          name: item.menuName
        }
      })
    } else if (item.children && !item.btnList) {
      result = result.concat(gennerateRoutes(item.children))
    }
  })
  return result
}
