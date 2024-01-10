const Sequelize = require("sequelize");
let sequelize = new Sequelize("webTech", "root", "", {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
})



module.exports = { sequelize };