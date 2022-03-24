const mongoose = require('mongoose')
const deptSchema = mongoose.Schema({
    deptName: String,
    userId: String, //负责人
    userName: String,
    userEmail: String,
    parentId: [mongoose.Types.ObjectId], // 上级
    updateTime: {
        type: Date,
        default: Date.now()
    },
    createTime: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("depts",deptSchema,"depts")