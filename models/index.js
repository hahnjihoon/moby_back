//# 모델과 테이블 연동하기 #//

// sequelize 패키지를 호출해서 가져옴
const Sequelize = require("sequelize");

// config.json 을 호출해서 내용을 가져옴
const config = require("../config/config.json");

// 모비 데이터베이스 연결 정보
const { username, password, database, host } = config.mobyDb;

const sequelize = new Sequelize(database, username, password, {
  dialect: "mysql",
  host,
  timezone: "+09:00",
  dialectOptions: {
    timezone: "Asia/Tokyo"
  }
});

// 연결 DB를 저장할 객체 변수.
const db = {};

const Products = require("./products")(sequelize, Sequelize.DataTypes);
const Moby_users = require("./moby_users")(sequelize, Sequelize.DataTypes);

db.Products = Products;
db.Moby_users = Moby_users;

module.exports = db;
