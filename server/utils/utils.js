const jwt = require("jsonwebtoken");
const config = require("../config");
const CODE = {
  SUCCESS: 200,
  PARAM_ERROR: 10001, //参数不正确,
  USER_ACCOUNT_ERROR: 20001, //用户账号密码错误
  USER_LOGIN_ERROR: 20002, //用户未登录
  BUSINESS_ERROR: 30001, //业务请求失败
  AUTH_ERROR: 40001, //认证失败或TOKEN过期
};
module.exports = {
  /**
   * @param {number} pageNum
   * @param {number} pageSize
   */
  pager({ pageNum = 1, pageSize = 10 }) {
    pageNum *= 1;
    pageSize *= 1;
    const skipIndex = (pageNum - 1) * pageSize;
    return {
      page: {
        pageNum,
        pageSize,
      },
      skipIndex,
    };
  },
  success(data = "", msg = "", code = CODE.SUCCESS) {
    return {
      code,
      data,
      msg,
    };
  },
  fail(msg = "", code = CODE.BUSINESS_ERROR, data = "") {
    return {
      code,
      data,
      msg,
    };
  },
  CODE,
  decodeToken(token) {
    if (token) {
      return jwt.verify(token, config.tokenKey);
    }
    return "";
  },
  TreeMenu(rootList, id) {
    var result = [];
    for (var i = 0; i < rootList.length; i++) {
      // first level
      if (
        String(
          rootList[i]._doc.parentId[rootList[i]._doc.parentId.length - 1]
        ) == String(id)
      ) {
        result.push(rootList[i]._doc);
      }
    }
    //child as other level
    result.map((item) => {
      item.children = this.TreeMenu(rootList, item._id);
      if (item.children.length === 0) {
        delete item.children;
      } else if (item.children.length > 0 && item.children[0].menuType === 2) {
        // btn type, always the last level
        item.btnList = item.children;
      }
    });
    return result;
  },

  formateDate(date, format) {
    let fmt = format || "yyyy-MM-dd hh:mm:ss";
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, date.getFullYear());
    }
    const o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const val = o[k] + "";
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? val : ("00" + val).substr(val.length)
        );
      }
    }
    return fmt;
  },
};
