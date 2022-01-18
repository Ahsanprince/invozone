const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(`../config/config.json`)[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}
<<<<<<< HEAD
=======
// db.Post = require("./post")(sequelize, Sequelize.DataTypes);
// console.log(db, "@db");
// db.Post.associate(db);

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// permissions = require('./permissions')(sequelize, Sequelize);
// role = require('./role')(sequelize, Sequelize);

// permissions.belongsToMany(role, {
// 	through: 'Role_Has_Permissions',
// 	as: 'permissions',
// 	foreignKey: 'permId',
// });
// role.belongsToMany(permissions, {
// 	through: 'Role_Has_Permissions',
// 	as: 'role',
// 	foreignKey: 'roleId',
// });

// // module.exports = db;

>>>>>>> master
module.exports = sequelize;