module.exports = function(sequelize, DataTypes) {
  let burger = sequelize.define(
    'burger',
    {
      burger_name: {
        type: DataTypes.STRING,
        allowNUll: false,
        validate: false,
        validate: {
          len: [1]
        }
      },

      devoured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      timestamps: false
    }
  );

  return burger;
};
