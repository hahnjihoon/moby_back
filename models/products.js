"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init(
    {
      major_class: DataTypes.STRING,
      middle_class: DataTypes.STRING,
      minor_class: DataTypes.STRING,
      image_url: DataTypes.STRING,
      page_url: DataTypes.STRING,

      product_name: DataTypes.STRING,
      brand: DataTypes.STRING,
      sales_com: DataTypes.STRING,
      price: DataTypes.INTEGER,
      made_in: DataTypes.STRING,
      spices: DataTypes.STRING,
      folding: DataTypes.STRING,
      material: DataTypes.STRING,
      weight: DataTypes.STRING,
      ceiling: DataTypes.STRING,
      wheel: DataTypes.STRING,
      size: DataTypes.STRING,
      busket_size: DataTypes.STRING,
      belt: DataTypes.STRING,
      lmt_age: DataTypes.STRING,
      lmt_wet: DataTypes.STRING,
      color: DataTypes.STRING,

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
      modelName: "Products",
      timestamps: false // createdAt 및 updatedAt을 자동으로 생성하지 않도록 설정
    }
  );

  // 업데이트 했을때는, 업데이트 날짜가 생성 되도록
  Products.beforeUpdate((instance, options) => {
    instance.updated_at = new Date();
  });

  return Products;
};
