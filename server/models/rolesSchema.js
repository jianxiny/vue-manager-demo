const mongoose = require('mongoose')
const rolesSchema = mongoose.Schema({
    roleName: String,// 角色名称
    remark: String,// 备注
    
    permissionList: {
        checkedKeys: [],
        halfCheckedKeys: []
    },
    "createTime": {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("roles",rolesSchema,"roles")