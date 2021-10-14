const { DataTypes } = require("sequelize"); 
let sequelize = require("./sequelize")
// 设计用户的模型
const User = sequelize.define('User', {
    // 在这里定义模型属性
    account: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true
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
        type: DataTypes.STRING,
    },
    fansNum:{
        type: DataTypes.NUMBER,
        defaultValue: 0
    },
    visitNum:{
        type: DataTypes.NUMBER,
        defaultValue: 0
    },
    description:{
        type: DataTypes.STRING,
        defaultValue: "该用户暂时没有描述"
    }
  }, {
    timestamps: false
});
const Passage = sequelize.define('passage', {
        passageId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        UserAccount: {
            type: DataTypes.STRING,
            allowNull: false,
        }
  },{

});
async function syncAllModel(){
    User.hasMany(Passage);
    await User.sync();
    await Passage.sync();
}
async function register (registerInfo){
    const foundOne = await User.findAll({
        where: {
            account: registerInfo.account
        }
    });
    if(foundOne.length === 0){
        await User.create({
            account: registerInfo.account,
            nickname: "undefined",
            pass: registerInfo.pass,
            email: registerInfo.email,
            priority: 0,
            avatarId: 114512
        })
        return new Promise((resolve, reject) => 
            resolve("注册成功")
        )
    }else{
        return new Promise((resolve, reject) => 
            reject("用户名不能相同")
        )
    }
}
async function login(loginInfo){
    const foundOne = await User.findAll({
        where: {
            account: loginInfo.account
        }
    });
    if(foundOne.length){
        console.log(foundOne[0].pass+" "+loginInfo.pass)
        if(loginInfo.pass === foundOne[0].pass){
            return new Promise((resolve, reject) => 
                resolve()
            )
        }
    }
    else return new Promise((resolve, reject) => reject())
}
async function getUserInfo(account){
    const foundOne = await User.findAll({
        where: {
            account: account
        }
    });
    if(foundOne.length){
        return new Promise((resolve, reject) => 
                resolve(foundOne[0])
            )
    }else 
        return new Promise((resolve, reject) =>
                reject("未能找到"+account+"的用户")
            )
}
async function uploadPassage(passage){
    await Passage.create({
        passageId: passage.passageId,
        UserAccount: passage.account,
        content: passage.content,
        title: passage.title
    })
    return new Promise((resolve)=>resolve("文章创建完毕"))
}
async function getTotalPassageNum(){
    const result = await Passage.findAll({
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('passageId')), 'pnum']
        ]
    })
    return new Promise((resolve, reject) => resolve(result))
}

async function getPassage(offset){
    let result = await Passage.findAll({
        order: [['updatedAt', 'DESC']],
        limit: 5,
        offset: offset
    })
    result = result.map((i)=>{
        i.content = i.content.slice(0,50); // 这里是减除文章部分长度
        return i;
    })
return new Promise ((resolve, reject) => {
        resolve(result)
    })
}
async function getPassageById(passageId){
    const result = await Passage.findAll({
        where:{
            passageId: passageId
        }
    })
    if(result.length){
        return new Promise((resolve, reject)=>{
            resolve(result[0])
        })
    }else {
        return new Promise((resolve, reject)=>{
            reject("未找到对应的文章内容")
        })
    }
}
module.exports = {
    syncAllModel,
    register,
    login,
    getUserInfo,
    uploadPassage,
    getTotalPassageNum,
    getPassage,
    getPassageById
}