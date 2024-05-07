const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Moby_users extends Model {
    static associate(models) {
      // define association here
    }
  }
  Moby_users.init(
    {
      user_id: DataTypes.STRING,
      user_pw: DataTypes.STRING,
      user_name: DataTypes.STRING,
      user_rnum: DataTypes.STRING,
      user_addr: DataTypes.STRING,
      user_phone: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_bank: DataTypes.STRING,
      user_account: DataTypes.STRING,
      user_accuntpw: DataTypes.STRING,
      user_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5
      },
      del_yn: {
        type: DataTypes.ENUM("Y", "N"),
        allowNull: false,
        defaultValue: "N"
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW")
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW")
      }
    },
    {
      sequelize,
      modelName: "Moby_users",
      timestamps: false // createdAt 및 updatedAt을 자동으로 생성하지 않도록 설정
    }
  );

  Moby_users.beforeUpdate((instance, options) => {
    instance.updated_at = new Date();
  });

  return Moby_users;
};
