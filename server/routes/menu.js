const router = require("koa-router")();
const { success, fail, decodeToken } = require("../utils/utils");
const utils = require("../utils/utils");
const Menu = require("../models/menusSchema");
const Roles = require("../models/rolesSchema");
router.prefix("/menu");

router.post("/list", async (ctx) => {
  const { menuName, menuState } = ctx.request.body;
  const params = {};
  if (menuName) params.menuName = menuName;
  if (menuState) params.menuState = menuState;
  let rootList = (await Menu.find(params)) || [];
  const permissionList = utils.TreeMenu(rootList, null);
  ctx.body = success(permissionList, null);
});

router.post("/operate", async (ctx) => {
  const { _id, action, ...params } = ctx.request.body;
  let res, info;
  try {
    if (action == "create") {
      res = await Menu.create(params);
      info = "创建成功";
    } else if (action == "edit") {
      params.updateTime = new Date();
      res = await Menu.findByIdAndUpdate(_id, params);
      info = "编辑成功";
    } else {
      res = await Menu.findByIdAndRemove(_id);
      await Menu.deleteMany({ parentId: { $all: [_id] } });
      info = "删除成功";
    }
    ctx.body = success("", info);
  } catch (error) {
    ctx.body = fail(error.stack);
  }
});

// 根据用户角色获取权限菜单列表

router.get("/getPermissonMenuList", async (ctx) => {
  const authorization = ctx.request.headers.authorization;
  const token = authorization.split(" ")[1];
  const ueserInfo = decodeToken(token);
  const menuList = await getMenuList(ueserInfo.role, ueserInfo.roleList);
  const btnList = getBtnPermissonList(menuList);
  ctx.body = success({ menuList, btnList });
});

// 菜单生成处理

async function getMenuList(role, roleList) {
  var rootList;
  if (role === 0) {
    // admin user
    rootList = (await Menu.find({})) || [];
  } else {
    var roleData = await Roles.find({ _id: { $in: roleList } });
    var resultPermissonList = [];
    roleData.forEach((item) => {
      resultPermissonList = resultPermissonList.concat([
        ...item.permissionList.checkedKeys,
        ...item.permissionList.halfCheckedKeys,
      ]);
    });
    resultPermissonList = [...new Set(resultPermissonList)];
    rootList = (await Menu.find({ _id: { $in: resultPermissonList } })) || [];
  }
  return utils.TreeMenu(rootList, null);
}

function getBtnPermissonList(list) {
  var result = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].btnList) {
      list[i].btnList.forEach((item) => {
        result.push(item.menuCode);
      });
    } else if (list[i].children && !list[i].btnList) {
      result = result.concat(getBtnPermissonList(list[i].children));
    }
  }
  return result;
}

module.exports = router;
