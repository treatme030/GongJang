'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Post.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: DataTypes.STRING,
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    soldOut: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });

  Post.associate= (models) => {
    Post.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "cascade"
    }),
    Post.hasMany(models.Wish, {
      foreignKey: "post_id"
    }),
    Post.hasMany(models.Comment, {
      foreignKey: "post_id"
    })
  }
  return Post;
};