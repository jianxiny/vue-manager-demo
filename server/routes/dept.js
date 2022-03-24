const router = require("koa-router")();
const { success, fail } = require("../utils/utils");
const Dept = require("../models/deptSchema");
router.prefix("/dept");

router.get("/list", async (ctx) => {
  const { deptName } = ctx.request.query;
  const params = {};
  if (deptName) params.deptName = deptName;
  let rootList = (await Dept.find(params)) || [];
  const deptList = TreeDept(rootList, null);
  ctx.body = success(deptList, null);
});

function TreeDept(rootList, id) {
  var result = [];
  for (var i = 0; i < rootList.length; i++) {
    if (
      String(rootList[i]._doc.parentId[rootList[i]._doc.parentId.length - 1]) ==
      String(id)
    ) {
      result.push(rootList[i]._doc);
    }
  }
  result.map((item) => {
    item.children = TreeDept(rootList, item._id);
    if (item.children.length === 0) {
      delete item.children;
    }
  });
  return result;
}

router.post("/operate", async (ctx) => {
  const { _id, action, ...params } = ctx.request.body;
  let info;
  try {
    if (action == "create") {
      res = await Dept.create(params);
      info = "创建成功";
    } else if (action == "edit") {
      params.updateTime = new Date();
      res = await Dept.findByIdAndUpdate(_id, params);
      info = "编辑成功";
    } else {
      res = await Dept.findByIdAndRemove(_id);
      await Dept.deleteMany({ parentId: { $all: [_id] } });
      info = "删除成功";
    }
    ctx.body = success("", info);
  } catch (error) {
    ctx.body = fail(error.stack);
  }
});

module.exports = router;
