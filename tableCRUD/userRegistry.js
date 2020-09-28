// 引入sequelize对象
const baseInstance = require('../creatThenKeepLinkDataBase/index.js');
const Sequelize = baseInstance.defaultBaseInstance;
const Op = Sequelize.Op;
// 引入数据表模型
const userRegistry = (require('../tableStructure/userRegistry'))(Sequelize);
//自动创建表
userRegistry.sync({force: false});

class UserRegistryModel {

    static async createUser(data) {
        return await userRegistry.create({
            email: data.email,
            password: data.password,
            userName: data.userName
        });
    }

    static async userRegistryMsg(userName) {
        return await userRegistry.findOne({
            where: {
                userName
            }
        });
    }

}

module.exports = UserRegistryModel;