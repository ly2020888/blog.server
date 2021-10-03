const { DataTypes } = require("sequelize"); 
let sequelize = require("./sequelize")
// 设计用户的模型
const User = sequelize.define('User', {
    // 在这里定义模型属性
    account: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    avatarId: {
        type: DataTypes.STRING
    }
  }, {
    timestamps: false
});
 async function syncAllModel(){
    await User.sync({ alter: true });
    console.log("用户模型表刚刚(重新)创建！");
    const admin = await User.create({ 
        account: "admin", 
        nickname: "liuyi" ,
        pass: "123",
        email: "123",
        priority: 0,
        avatarId: "1"
    });
    console.log("Jane's auto-generated ID:", admin.account);  
}
module.exports = {
    syncAllModel
}